import { Identity } from '@/domain/entities/identity.entity'
import { IIdentityDocument } from '@/infrastructure/database/mongodb/schemas/identity.schema'

export const identityDocumentToEntity = (identity: IIdentityDocument): Identity => {
  return {
    id: identity._id.toString(),
    user_id: identity.user_id.toString(),
    provider: identity.provider,
    provider_id: identity.provider_id,
    provider_email: identity.provider_email
  }
}
