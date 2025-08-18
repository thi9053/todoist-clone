import { IntrospectRequestDTO } from '@/applications/dtos/auth/introspect/request.dto'
import { IntrospectResponseDTO } from '@/applications/dtos/auth/introspect/response.dto'
import { UserRepository } from '@/infrastructure/database/mongodb/repositories/user/user.repository'
import { injectable } from 'tsyringe'
import jwt from 'jsonwebtoken'
import { config } from '@/infrastructure/config'

@injectable()
export class IntrospectUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(request: IntrospectRequestDTO): Promise<IntrospectResponseDTO> {
    try {
      let decoded
      try {
        decoded = jwt.verify(request.token, config.jwtAccessTokenSecret) as { userId: string; iat: number; exp: number }
      } catch {
        try {
          decoded = jwt.verify(request.token, config.jwtRefreshTokenSecret) as {
            userId: string
            iat: number
            exp: number
          }
        } catch {
          return { isValid: false }
        }
      }

      const currentTime = Math.floor(Date.now() / 1000)
      if (decoded.exp && decoded.exp < currentTime) {
        return { isValid: false }
      }

      const user = await this.userRepository.findById(decoded.userId)
      if (!user) {
        return { isValid: false }
      }

      return { isValid: true }
    } catch (error) {
      return { isValid: false }
    }
  }
}
