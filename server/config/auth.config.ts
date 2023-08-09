import { registerAs } from '@nestjs/config'

/**
 * 应用配置
 */
export const AuthConfig = registerAs('auth', () => ({
  saltRounds: process.env.AUTH_SALT_ROUNDS,
  accessTokenSecret: process.env.AUTH_ACCESS_TOKEN_SECRET,
  accessTokenExpiresIn: process.env.AUTH_ACCESS_TOKEN_EXPIRES_IN,
  refreshTokenSecret: process.env.AUTH_REFRESH_TOKEN_SECRET,
  refreshTokenExpiresIn: process.env.AUTH_REFRESH_TOKEN_EXPIRES_IN,
}))
