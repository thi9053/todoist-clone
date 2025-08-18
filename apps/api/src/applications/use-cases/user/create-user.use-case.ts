import { injectable } from 'tsyringe'
import { UserRepository } from '@/infrastructure/database/mongodb/repositories/user/user.repository'
import { ProfileRepository } from '@/infrastructure/database/mongodb/repositories/profile/profile.repository'
import { CreateUserRequestDTO } from '@/applications/dtos/user/create/request.dto'
import { userEntityToResponseDto, userRequestDtoToEntity } from '@/applications/mappers/user'
import { CreateUserResponseDTO } from '@/applications/dtos/user/create/response.dto'
import bcrypt from 'bcryptjs'

@injectable()
export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly profileRepository: ProfileRepository
  ) {}

  async execute(user: CreateUserRequestDTO): Promise<CreateUserResponseDTO> {
    const newProfile = await this.profileRepository.create()
    const hashedPassword = await bcrypt.hash(user.password, 10)
    const newUser = await this.userRepository.create(
      userRequestDtoToEntity({ ...user, password: hashedPassword }, newProfile.id)
    )
    return userEntityToResponseDto(newUser)
  }
}
