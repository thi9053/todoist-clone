import { IUserDocument } from '@/infrastructure/database/mongodb/schemas/user.schema'
import { User } from '@/domain/entities/user.entity'
import { CreateUserRequestDTO } from '../dtos/user/create/request.dto'
import { CreateUserResponseDTO } from '../dtos/user/create/response.dto'

export const userDocumentToEntity = (document: IUserDocument): User => {
  return {
    id: document._id.toString(),
    email: document.email,
    password: document.password,
    profile_id: document.profile_id.toString()
  }
}

export const userRequestDtoToEntity = (dto: CreateUserRequestDTO, profile_id: string): User => {
  return {
    email: dto.email,
    password: dto.password,
    profile_id
  }
}

export const userEntityToResponseDto = (entity: User): CreateUserResponseDTO => {
  return {
    id: entity.id || '',
    email: entity.email
  }
}
