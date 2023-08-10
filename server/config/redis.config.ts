import { registerAs } from '@nestjs/config'

export const RedisConfig = registerAs('redis', () => ({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
  db: process.env.REDIS_DB,
  ttl: 60 * 60 * 24,
}))
