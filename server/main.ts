import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { swaggerBuilder } from './swagger'

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
  )

  swaggerBuilder(app)

  app.setGlobalPrefix('api')

  await app.listen(3000)
}
bootstrap()
