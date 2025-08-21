import { AuthProvider } from '@/domain/types/auth'

export interface CreateUserRequestDTO {
  email: string
  password: string
}
