import { User } from '@/domain/entities/user.entity'

export interface IUserRepository {
  create(user: User): Promise<User>
  findById?(id: string): Promise<User | null>
  findByEmail?(email: string): Promise<User | null>
  update?(id: string, user: User): Promise<User | null>
  delete?(id: string): Promise<boolean>
}
