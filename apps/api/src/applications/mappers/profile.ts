import { IProfileDocument } from '@/infrastructure/database/mongodb/schemas/profile.schema'
import { Profile } from '@/domain/entities/profile.entity'

export const profileDocumentToEntity = (document: IProfileDocument): Profile => {
  return {
    id: document._id.toString(),
    name: document.name,
    imageUrl: document.imageUrl
  }
}
