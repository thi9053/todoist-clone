import { User } from '@/domain/entities/user.entity'
import { CreateUserResponseDTO } from '../../user/create/response.dto'

export interface LoginResponseDTO {
  accessToken: string
  refreshToken: string
  user: CreateUserResponseDTO
}
