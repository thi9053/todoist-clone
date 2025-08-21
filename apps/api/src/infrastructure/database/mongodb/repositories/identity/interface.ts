import { Identity } from '@/domain/entities/identity.entity'

export interface IIdentityRepository {
  create(identity: Identity): Promise<Identity>
  findByProviderId(providerId: string): Promise<Identity | null>
  findByProviderEmail(providerEmail: string): Promise<Identity | null>
}
