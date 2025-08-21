import { injectable } from 'tsyringe'
import { UserRepository } from '@/infrastructure/database/mongodb/repositories/user/user.repository'
import { ProfileRepository } from '@/infrastructure/database/mongodb/repositories/profile/profile.repository'
import { CreateUserRequestDTO } from '@/applications/dtos/user/create/request.dto'
import { userEntityToResponseDto, userRequestDtoToEntity } from '@/applications/mappers/user'
import { CreateUserResponseDTO } from '@/applications/dtos/user/create/response.dto'
import bcrypt from 'bcryptjs'
import { BadRequestError } from '@/domain/error'
import { IdentityRepository } from '@/infrastructure/database/mongodb/repositories/identity/identity.repository'
import { AuthProvider } from '@/domain/types/auth'

@injectable()
export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly profileRepository: ProfileRepository,
    private readonly identityRepository: IdentityRepository
  ) {}

  async execute(user: CreateUserRequestDTO): Promise<CreateUserResponseDTO> {
    const existingUser = await this.userRepository.findByEmail(user.email)
    if (existingUser) {
      throw new BadRequestError('User already exists')
    }
    const newProfile = await this.profileRepository.create()
    const hashedPassword = await bcrypt.hash(user.password, 10)
    const newUser = await this.userRepository.create(
      userRequestDtoToEntity({ ...user, password: hashedPassword }, newProfile.id)
    )

    if (!newUser || !newUser.id) {
      throw new BadRequestError('Failed to create user')
    }

    await this.identityRepository.create({
      user_id: newUser.id,
      provider: AuthProvider.EMAIL
    })

    return userEntityToResponseDto(newUser)
  }
}
