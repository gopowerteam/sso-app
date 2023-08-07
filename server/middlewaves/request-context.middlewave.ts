import { AsyncLocalStorage } from 'node:async_hooks'
import { Injectable } from '@nestjs/common'
import { Response } from 'express'
import { JwtService } from '@nestjs/jwt'
import { AppOrigin } from 'server/global/enums'

export function RequestContextMiddleware(
  req: Request,
  res: Response,
  next: () => void,
) {
  RequestContext.cls.run(RequestContext.create(req, res), next)
}

@Injectable()
export class RequestContext {
  private req: any
  private res: Response

  static cls = new AsyncLocalStorage<RequestContext>()

  static get currentContext() {
    return this.cls.getStore()
  }

  private get payload() {
    const jwtService = new JwtService()
    const request = RequestContext.currentContext.req as any
    const jwt = request.headers.authorization

    return jwtService.decode(jwt.replace('Bearer ', '')) as {
      id: string
      username: string
      origin: AppOrigin
    }
  }

  public get origin() {
    return this.payload?.origin
  }

  public get user() {
    return this.payload?.id
  }

  public get host() {
    return this.req.headers.host
  }

  public static create(req: any, res: Response) {
    const context = new RequestContext()
    context.req = req
    context.res = res
    return context
  }
}
