import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ClientModule } from './modules/client/client.module'
import { AdminModule } from './modules/admin/admin.module'

function clientSwaggerBuilder(app: INestApplication) {
  const adapter = app.getHttpAdapter()
  const config = new DocumentBuilder()
    .setTitle('Client接口文档')
    .setDescription('Client API description')
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
    {
      include: [ClientModule],
    },
  )

  SwaggerModule.setup('/client/docs', app, document)

  // 设置OPENAPI接口地址
  adapter.get('/client/api-docs', (req, res) => {
    res.send(JSON.stringify(document))
  })
}

function adminSwaggerBuilder(app: INestApplication) {
  const adapter = app.getHttpAdapter()
  const config = new DocumentBuilder()
    .setTitle('Admin接口文档')
    .setDescription('Admin API description')
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
    {
      include: [AdminModule],
    },
  )

  SwaggerModule.setup('/admin/docs', app, document)

  // 设置OPENAPI接口地址
  adapter.get('/admin/api-docs', (req, res) => {
    res.send(JSON.stringify(document))
  })
}

export function swaggerBuilder(app: INestApplication) {
  clientSwaggerBuilder(app)
  adminSwaggerBuilder(app)
}
