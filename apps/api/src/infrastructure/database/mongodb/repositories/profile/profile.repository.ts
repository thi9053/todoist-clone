import { injectable } from 'tsyringe'
import { IProfileRepository } from './interface'
import { Profile } from '@/domain/entities/profile.entity'
import { ProfileModel } from '../../schemas/profile.schema'
import { profileDocumentToEntity } from '@/applications/mappers/profile'

@injectable()
export class ProfileRepository implements IProfileRepository {
  async create(): Promise<Profile> {
    const newProfile = new ProfileModel()
    await newProfile.save()
    return profileDocumentToEntity(newProfile)
  }
}
