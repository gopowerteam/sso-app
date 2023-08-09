import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { Logger } from '@nestjs/common'
import chalk from 'chalk'
import { AppModule } from './app.module'
import { swaggerBuilder } from './swagger'
import { LoggerService } from './core/logger/logger.service'

async function printInfo(port: number) {
  const width = 60
  const VLINE = chalk.white('|')
  const HLINE = chalk.white('-'.repeat(width))
  const alignWidth = str => str.padEnd(width, ' ')
  // eslint-disable-next-line no-console
  console.clear()
  Logger.debug(` ${HLINE} `)
  Logger.debug(`${VLINE}${chalk.bold.green(alignWidth('Server Launched'))}${VLINE}`)
  Logger.debug(`${VLINE}${alignWidth('')}${VLINE} `)
  Logger.debug(`${VLINE}${alignWidth(`[       Server Port]: ${port}`)}${VLINE}`)
  Logger.debug(`${VLINE}${alignWidth(`[ Admin Swagger URL]: http://localhost:${port}/admin/docs`)}${VLINE}`)
  Logger.debug(`${VLINE}${alignWidth(`[Client Swagger URL]: http://localhost:${port}/client/docs`)}${VLINE}`)
  Logger.debug(` ${HLINE} `)
  Logger.debug(`${VLINE}${chalk.bold.green(alignWidth('Web Launched  🚀'))}${VLINE}`)
  Logger.debug(`${VLINE}${alignWidth('')}${VLINE} `)
  Logger.debug(`${VLINE}${alignWidth(`[ Admin Web URL]: http://localhost:${port}`)}${VLINE}`)
  Logger.debug(`${VLINE}${alignWidth(`[Client Web URL]: http://localhost:${port}/admin`)}${VLINE}`)
  Logger.debug(` ${HLINE} `)
}

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
  )

  swaggerBuilder(app)

  app.setGlobalPrefix('api')
  app.useLogger(app.get(LoggerService))

  const config = app.get(ConfigService)
  const port = await config.get('app.port')

  await app.listen(port).then(() => printInfo(port))
}

bootstrap()
