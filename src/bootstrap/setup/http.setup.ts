import {
  type AdapterResponse,
  type ResponseInterceptor,
  setup,
} from '@gopowerteam/request'
import { AxiosAdapter } from '@gopowerteam/request/adapters'
import type { Router } from 'vue-router'
import { TokenService } from '../http/token.service'
import { useStore } from '@/store'
// import { useLogger } from '@/shared/hooks'

class StatusInterceptors implements ResponseInterceptor {
  exec(respone: AdapterResponse) {
    return respone.status < 400
  }
}

class SuccessInterceptors implements ResponseInterceptor {
  exec(response: AdapterResponse) {
    return response.data
  }
}

class ErrorInterceptors implements ResponseInterceptor {
  exec(response: AdapterResponse) {
    return response.data
  }
}

class ExceptionInterceptors implements ResponseInterceptor {
  constructor(private readonly router: Router) {}

  exec(response: AdapterResponse) {
    // const logger = useLogger()
    const defaultError = '系统异常,请稍候重试.'
    const messageList: { [key: number]: string | undefined } = {
      400: '请求参数错误',
      405: '请求服务方法错误',
      500: '服务器内部错误',
      403: '没有权限，请重新登陆',
    }

    if (response) {
      const errorMessage
        = (response.data || {}).message
        || messageList[response.status]
        || defaultError

      // logger.error(errorMessage)

      if (response.data?.toast === true) {
        //
      }
      // globalThis.$message.error(errorMessage)
    }

    switch (response.status) {
      case 401:
        this.onResponse401()
        break
    }
  }

  onResponse444() {
    this.router.replace('/welcome')
  }

  onResponse401() {
    const store = useStore()
  }
}

export default function (router: Router) {
  // 配置服务端信息
  setup({
    gateway: '/api',
    adapter: new AxiosAdapter(),
    qs: {
      arrayFormat: 'repeat',
      skipNulls: true,
      allowDots: true,
      encodeValuesOnly: true,
      encode: true,
    },
    interceptors: {
      status: new StatusInterceptors(),
      success: new SuccessInterceptors(),
      error: new ErrorInterceptors(),
      exception: new ExceptionInterceptors(router),
    },
    plugins: [
      new TokenService(),
    ],
  })
}
