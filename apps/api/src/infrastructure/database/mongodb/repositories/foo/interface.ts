import { Foo } from '@/domain/entities/foo.entity'

export interface IFooRepository {
  create(name: string): Promise<Foo>
  getAll(): Promise<Foo[]>
}
