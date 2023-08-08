import { registerAs } from '@nestjs/config'

/**
 * 应用配置
 */
export const JWTConfig = registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET,
}))
