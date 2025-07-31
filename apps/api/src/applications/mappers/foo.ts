import { IFooDocument } from '@/infrastructure/database/mongodb/schemas/foo.schema'
import { Foo } from '@/domain/entities/foo.entity'

export const fooDocumentToEntity = (document: IFooDocument): Foo => {
  return {
    id: document._id.toString(),
    name: document.name
  }
}
