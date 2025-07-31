import { Schema, model, Document } from 'mongoose'

export interface IFooDocument extends Document {
  _id: string
  name: string
}

const fooSchema = new Schema<IFooDocument>(
  {
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
    collection: 'foos'
  }
)

fooSchema.index({ name: 1 }, { unique: true })

export const FooModel = model<IFooDocument>('Foo', fooSchema)
