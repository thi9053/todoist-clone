import { Schema, model, Document } from 'mongoose'

export interface IUserDocument extends Document {
  _id: string
  email: string
  name: string
  createdAt: Date
  updatedAt: Date
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
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [50, 'Name must be less than 50 characters']
    }
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'users'
  }
)

userSchema.index({ email: 1 }, { unique: true })
userSchema.index({ createdAt: -1 })

export const UserModel = model<IUserDocument>('User', userSchema)
