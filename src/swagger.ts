import { NestFastifyApplication } from '@nestjs/platform-fastify'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

export function swaggerBuilder(app: NestFastifyApplication) {
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

  SwaggerModule.setup('docs', app, document, {
    customCssUrl: '/swagger-ui.css',
  })

  // 设置OPENAPI接口地址
  adapter.get('/admin/api-docs', (req, res) => {
    res.send(JSON.stringify(document))
  })
}
