import { Schema, model, Document } from 'mongoose'

export interface IUserDocument extends Document {
  _id: string
  email: string
  password: string
  profile_id: Schema.Types.ObjectId
  refreshToken?: string
}

const userSchema = new Schema<IUserDocument>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email'],
      index: true
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters']
    },
    profile_id: {
      type: Schema.Types.ObjectId,
      required: [true, 'Profile ID is required']
    },
    refreshToken: {
      type: String
    }
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'users'
  }
)

userSchema.index({ email: 1 }, { unique: true })
userSchema.index({ username: 1 }, { unique: true })

export const UserModel = model<IUserDocument>('User', userSchema)
