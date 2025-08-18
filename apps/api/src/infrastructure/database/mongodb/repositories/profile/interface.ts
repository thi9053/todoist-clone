import { User } from '@/domain/entities/user.entity'
import { Profile } from '@/domain/entities/profile.entity'

export interface IProfileRepository {
  create(): Promise<Profile>
}
