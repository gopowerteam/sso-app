import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

export function swaggerBuilder(app: INestApplication) {
  const adapter = app.getHttpAdapter()
  const config = new DocumentBuilder()
    .setTitle('接口文档')
    .setDescription('API description')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .addTag('app', '系统')
    .build()

  const document = SwaggerModule.createDocument(
    app,
    config,
  )

  SwaggerModule.setup('/docs', app, document)

  // 设置OPENAPI接口地址
  adapter.get('/api-docs', (req, res) => {
    res.send(JSON.stringify(document))
  })
}
