import { Schema, model, Document } from 'mongoose'
import { AuthProvider } from '@/domain/types/auth'

export interface IIdentityDocument extends Document {
  _id: string
  user_id: Schema.Types.ObjectId
  provider: AuthProvider
  provider_id?: string
  provider_email?: string
}

const identitySchema = new Schema<IIdentityDocument>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      required: [true, 'User ID is required']
    },
    provider: {
      type: String,
      enum: Object.values(AuthProvider),
      required: [true, 'Provider type is required']
    },
    provider_id: {
      type: String
    },
    provider_email: {
      type: String
    }
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'identities'
  }
)

export const IdentityModel = model<IIdentityDocument>('Identity', identitySchema)
