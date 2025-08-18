import { CreateUserUseCase } from '@/applications/use-cases/user/create-user.use-case'
import { APIResponse } from '@/shared/responses/APIResponse'
import { injectable } from 'tsyringe'
import { Context } from 'hono'
import { CreateUserRequestDTO } from '@/applications/dtos/user/create/request.dto'
import { CreateUserResponseDTO } from '@/applications/dtos/user/create/response.dto'

@injectable()
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  async createUser(c: Context, params: CreateUserRequestDTO) {
    const user = await this.createUserUseCase.execute(params)
    return APIResponse.created(c, user, 'User created successfully', 201)
  }
}
