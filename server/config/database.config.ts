import { registerAs } from '@nestjs/config'

/**
 * 应用配置
 */
export const DatabaseConfig = registerAs('database', () => ({
  type: process.env.DATABASE_TYPE as any,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_DATABASE,
}))
