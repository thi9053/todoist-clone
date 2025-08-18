import { injectable } from 'tsyringe'
import { Context } from 'hono'
import { LoginRequestDTO } from '@/applications/dtos/auth/login/request.dto'
import { LoginResponseDTO } from '@/applications/dtos/auth/login/response.dto'
import { APIResponse } from '@/shared/responses/APIResponse'
import { LoginUseCase } from '@/applications/use-cases/auth/login.use-case'
import { IntrospectRequestDTO } from '@/applications/dtos/auth/introspect/request.dto'
import { IntrospectResponseDTO } from '@/applications/dtos/auth/introspect/response.dto'
import { IntrospectUseCase } from '@/applications/use-cases/auth/introspect.use-case'

@injectable()
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly introspectUseCase: IntrospectUseCase
  ) {}

  async login(c: Context, params: LoginRequestDTO) {
    const loginResponse: LoginResponseDTO = await this.loginUseCase.execute(params)
    return APIResponse.success(c, loginResponse, 'Login successful', 200)
  }

  async introspect(c: Context, params: IntrospectRequestDTO) {
    const introspectResponse: IntrospectResponseDTO = await this.introspectUseCase.execute(params)
    return APIResponse.success(c, introspectResponse, 'Introspect successful', 200)
  }
}
