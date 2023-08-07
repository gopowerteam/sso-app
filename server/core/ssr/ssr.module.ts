import { join, resolve } from 'node:path'
import { Module, OnModuleInit } from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'
import * as express from 'express'
import { createSsrServer } from 'vite-ssr/dev'

@Module({})
export class SSRModule implements OnModuleInit {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  async onModuleInit() {
    const httpAdapter = this.httpAdapterHost.httpAdapter
    // Express Instance
    const app = httpAdapter.getInstance() as express.Express

    async function renderDevMode(app: express.Express) {
      const vite = await createSsrServer({
        server: { middlewareMode: true },
        appType: 'custom',
        define: {
          __initialState__: { a: 2 },
        },
      })

      app.use(vite.middlewares)
    }

    async function renderProdMode(app: express.Express) {
      const dist = resolve(process.cwd(), 'dist', 'ssr')
      const clientPath = resolve(dist, 'client')
      const serverPath = resolve(dist, 'server')
      // The manifest is required for preloading assets
      const manifest = await import(join(clientPath, 'ssr-manifest.json'))

      const { default: render } = await import(serverPath)

      app.use(
        express.static(clientPath, {
          index: false,
        }),
      )

      app.use(async (req, res) => {
        // 安装SSR中间件
        const { html, status, statusText, headers } = await render(req.url, {
          manifest,
          preload: true,
          // Anything passed here will be available in the main hook
          req,
          res,
          initialState: {
            a: 4,
          }, // <- This would also be available
        })

        res.type('html')
        res.writeHead(status || 200, statusText || headers, headers)
        res.end(html)
      })
    }

    if (process.env.NODE_ENV === 'production')
      await renderProdMode(app)
    else
      await renderDevMode(app)
  }
}
