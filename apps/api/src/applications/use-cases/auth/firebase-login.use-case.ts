import { injectable } from 'tsyringe'
import { IdentityRepository } from '@/infrastructure/database/mongodb/repositories/identity/identity.repository'
import { UserRepository } from '@/infrastructure/database/mongodb/repositories/user/user.repository'
import { BadRequestError, InternalServerError } from '@/domain/error'
import admin from 'firebase-admin'
import { FirebaseLoginRequestDTO } from '@/applications/dtos/auth/firebase-login/request'
import { FirebaseLoginResponseDTO } from '@/applications/dtos/auth/firebase-login/response'
import { generateAccessToken, generateRefreshToken } from '@/infrastructure/services/jsonwebtoken'
import { userEntityToResponseDto } from '@/applications/mappers/user'
import { AuthProvider } from '@/domain/types/auth'
import { ProfileRepository } from '@/infrastructure/database/mongodb/repositories/profile/profile.repository'
import { User } from '@/domain/entities/user.entity'

@injectable()
export class FirebaseLoginUseCase {
  constructor(
    private readonly identityRepository: IdentityRepository,
    private readonly userRepository: UserRepository,
    private readonly profileRepository: ProfileRepository
  ) {}

  async execute(request: FirebaseLoginRequestDTO): Promise<FirebaseLoginResponseDTO> {
    try {
      const decodedToken = await admin.auth().verifyIdToken(request.firebaseToken)

      const email = decodedToken.email
      const providerId = decodedToken.uid
      const provider = decodedToken.firebase.sign_in_provider

      if (!email) {
        throw new BadRequestError('Invalid email in Firebase token')
      }
      if (!providerId) {
        throw new BadRequestError('Invalid provider ID in Firebase token')
      }
      if (!provider) {
        throw new BadRequestError('Invalid provider in Firebase token')
      }

      const validFirebaseProviders = [AuthProvider.GOOGLE, AuthProvider.APPLE]
      if (!validFirebaseProviders.includes(provider as AuthProvider)) {
        throw new BadRequestError(`Unsupported Firebase provider: ${provider}`)
      }

      const identity = await this.identityRepository.findByProviderId(providerId)
      let user: User | null = null

      if (!identity) {
        const existingUser = await this.userRepository.findByEmail(email)
        if (existingUser) {
          throw new BadRequestError('User already exists with this email using a different authentication method')
        }

        const newProfile = await this.profileRepository.create()
        user = await this.userRepository.create({
          email,
          password: '',
          profile_id: newProfile.id
        })

        if (!user || !user.id) {
          throw new InternalServerError('Failed to create user')
        }

        await this.identityRepository.create({
          user_id: user.id,
          provider: provider as AuthProvider,
          provider_id: providerId,
          provider_email: email
        })
      } else {
        user = await this.userRepository.findById(identity.user_id)
        if (!user) {
          throw new BadRequestError('User account not found')
        }

        // Optional: Update email if it changed in Firebase
        if (user.email !== email) {
          user = await this.userRepository.update(user.id as string, { ...user, email })
          if (!user) {
            throw new InternalServerError('Failed to update user email')
          }
        }
      }

      const accessToken = generateAccessToken(user)
      const refreshToken = generateRefreshToken(user)

      const updatedUser = await this.userRepository.update(user.id as string, {
        ...user,
        refreshToken
      })

      if (!updatedUser) {
        throw new InternalServerError('Failed to update refresh token')
      }

      return {
        accessToken,
        refreshToken,
        user: userEntityToResponseDto(updatedUser)
      }
    } catch (error: any) {
      if (error?.code === 'auth/id-token-expired') {
        throw new BadRequestError('Firebase token has expired')
      }
      if (error?.code === 'auth/id-token-revoked') {
        throw new BadRequestError('Firebase token has been revoked')
      }
      if (error?.code === 'auth/invalid-id-token') {
        throw new BadRequestError('Invalid Firebase token')
      }

      if (error instanceof BadRequestError || error instanceof InternalServerError) {
        throw error
      }

      console.error('Firebase login error:', error)
      throw new InternalServerError('Authentication failed')
    }
  }
}
