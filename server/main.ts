import { NestFactory } from '@nestjs/core'
import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AppModule } from './app.module'
import { swaggerBuilder } from './swagger'
import { LoggerService } from './core/logger/logger.service'

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
  )

  swaggerBuilder(app)

  app.setGlobalPrefix('api')
  app.useLogger(app.get(LoggerService))

  const config = app.get(ConfigService)
  const port = await config.get('app.port')

  await app.listen(port).then(() => {
    Logger.log(`launch at ${port}`)
  })
}

bootstrap()
