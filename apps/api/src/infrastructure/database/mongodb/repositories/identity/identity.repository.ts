import { Model } from 'mongoose'
import { IIdentityRepository } from './interface'
import { Identity } from '@/domain/entities/identity.entity'
import { injectable } from 'tsyringe'
import { identityDocumentToEntity } from '@/applications/mappers/identity'
import { IdentityModel } from '@/infrastructure/database/mongodb/schemas/identity.schema'

@injectable()
export class IdentityRepository implements IIdentityRepository {
  async create(identity: Identity): Promise<Identity> {
    const newIdentity = new IdentityModel(identity)
    await newIdentity.save()
    return identityDocumentToEntity(newIdentity)
  }

  async findByProviderId(providerId: string): Promise<Identity | null> {
    const identity = await IdentityModel.findOne({ provider_id: providerId })
    return identity ? identityDocumentToEntity(identity) : null
  }

  async findByProviderEmail(providerEmail: string): Promise<Identity | null> {
    const identity = await IdentityModel.findOne({ provider_email: providerEmail })
    return identity ? identityDocumentToEntity(identity) : null
  }
}
