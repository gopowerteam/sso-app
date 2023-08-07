import { registerAs } from '@nestjs/config'

/**
 * 应用配置
 */
export const AppConfig = registerAs('app', () => ({
  name: process.env.APP_NAME,
  port: process.env.APP_PORT,
}))
