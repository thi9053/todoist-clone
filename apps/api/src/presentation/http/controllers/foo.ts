import { CreateFooUseCase } from '@/applications/use-cases/foo/create-foo.use-case'
import { FooRequestDTO } from '@/applications/dtos/foo/foo-request.dto'
import { injectable } from 'tsyringe'
import { APIResponse } from '@/shared/responses/APIResponse'
import { Context } from 'hono'

@injectable()
export class FooController {
  constructor(private readonly createFooUseCase: CreateFooUseCase) {}

  async createFoo(c: Context, params: FooRequestDTO) {
    const foo = await this.createFooUseCase.execute(params.name)
    return APIResponse.created(c, foo, 'Foo created successfully')
  }
}
