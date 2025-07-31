import { injectable } from 'tsyringe'
import { Foo } from '@/domain/entities/foo.entity'
import { FooRepository } from '@/infrastructure/database/mongodb/repositories/foo/foo.repository'

@injectable()
export class CreateFooUseCase {
  constructor(private readonly fooRepository: FooRepository) {}

  async execute(name: string): Promise<Foo> {
    const foo = await this.fooRepository.create(name)
    return foo
  }
}
