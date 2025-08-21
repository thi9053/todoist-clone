import { User } from '@/domain/entities/user.entity'
import { config } from '@/infrastructure/config'
import { sign, verify } from 'jsonwebtoken'

export const generateAccessToken = (user: User): string => {
  return sign({ userId: user.id }, config.jwtAccessTokenSecret, { expiresIn: '1h' })
}

export const generateRefreshToken = (user: User): string => {
  return sign({ userId: user.id }, config.jwtRefreshTokenSecret, { expiresIn: '7d' })
}
