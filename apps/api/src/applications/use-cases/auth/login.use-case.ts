import { injectable } from 'tsyringe'
import { UserRepository } from '@/infrastructure/database/mongodb/repositories/user/user.repository'
import { User } from '@/domain/entities/user.entity'
import { LoginRequestDTO } from '@/applications/dtos/auth/login/request.dto'
import { LoginResponseDTO } from '@/applications/dtos/auth/login/response.dto'
import { InternalServerError, UnauthorizedError } from '@/domain/error'
import bcrypt from 'bcryptjs'
import { generateAccessToken, generateRefreshToken } from '@/infrastructure/services/jsonwebtoken'
import { userEntityToResponseDto } from '@/applications/mappers/user'

@injectable()
export class LoginUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(request: LoginRequestDTO): Promise<LoginResponseDTO> {
    const user = await this.userRepository.findByEmail(request.email)
    if (!user) {
      throw new UnauthorizedError('Email does not exist')
    }

    const isPasswordValid = await bcrypt.compare(request.password, user.password)
    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid password')
    }

    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)

    const updatedUser = await this.userRepository.update(user.id as string, { ...user, refreshToken })
    if (!updatedUser) {
      throw new InternalServerError('Failed to update refresh token')
    }

    return { accessToken, refreshToken, user: userEntityToResponseDto(updatedUser) }
  }
}
