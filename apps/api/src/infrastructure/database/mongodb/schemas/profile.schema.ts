import { Schema, model, Document } from 'mongoose'
import { IUserDocument } from './user.schema'

export interface IProfileDocument extends Document {
  _id: string
  name: string
  imageUrl: string
}

const profileSchema = new Schema<IProfileDocument>(
  {
    name: {
      type: String,
      trim: true,
      maxlength: [255, 'Name must be less than 255 characters'],
      index: true
    },
    imageUrl: {
      type: String,
      trim: true,
      maxlength: [255, 'Image URL must be less than 255 characters'],
      index: true
    }
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'profiles'
  }
)

export const ProfileModel = model<IProfileDocument>('Profile', profileSchema)
