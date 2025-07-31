import { IFooRepository } from './interface'
import { Foo } from '@/domain/entities/foo.entity'
import { FooModel } from '@/infrastructure/database/mongodb/schemas/foo.schema'
import { fooDocumentToEntity } from '@/applications/mappers/foo'
import { injectable } from 'tsyringe'

@injectable()
export class FooRepository implements IFooRepository {
  async create(name: string): Promise<Foo> {
    const newFoo = new FooModel({ name })
    await newFoo.save()
    return fooDocumentToEntity(newFoo)
  }

  async getAll(): Promise<Foo[]> {
    const foos = await FooModel.find()
    return foos.map((foo) => fooDocumentToEntity(foo))
  }
}
