/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LoginInput } from '../models/LoginInput';
import type { TokenResponse } from '../models/TokenResponse';
import type { Administrator } from '../models/Administrator';
import { RequestService, RequestGenerateType, type RequestSendOptions, type RequestPlugin, type RequestGenerateOptions } from '@gopowerteam/request';
export class AuthService {
  // 请求实例
  private request = RequestService.getInstance();
  private service = ''

  private generateRequest(
    requestSendOptions: RequestSendOptions,
    requestPlugins: RequestPlugin[] = [],
    requestGenerateOptions?: RequestGenerateOptions
  ){
    switch(true){
      case requestGenerateOptions?.type === RequestGenerateType.URL:
        // 生成URL
        return this.request.toURL(
          requestSendOptions,
          requestPlugins
        );
      default: {
        // 请求数据
        const result =  this.request.send(
          requestSendOptions,
          requestPlugins
        );

        return result
      }
    }
  }

  /**
   * 管理员登陆
   */
  public login(
    requestBody: LoginInput,
    requestPlugins: RequestPlugin[],
    requestGenerateOptions: RequestGenerateOptions & { type: RequestGenerateType.URL }
  ): string
  public login(
    requestBody: LoginInput,
    requestPlugins?: RequestPlugin[],
    requestGenerateOptions?: RequestGenerateOptions
  ): Promise<TokenResponse>
  public login(
    requestBody: LoginInput,
    requestPlugins: RequestPlugin[] = [],
    requestGenerateOptions?: RequestGenerateOptions
  ): Promise<TokenResponse> | string {
    const requestSendOptions = {
      service: this.service,
      path: '/admin/auth/login',
      method: 'post',
      paramsBody: requestBody,
    }
  
    return this.generateRequest(
      requestSendOptions,
      requestPlugins,
      requestGenerateOptions
    )
  
  
  }
  
  /**
   * 刷新Token
   */
  public token(
    requestPlugins: RequestPlugin[],
    requestGenerateOptions: RequestGenerateOptions & { type: RequestGenerateType.URL }
  ): string
  public token(
    requestPlugins?: RequestPlugin[],
    requestGenerateOptions?: RequestGenerateOptions
  ): Promise<TokenResponse>
  public token(
    requestPlugins: RequestPlugin[] = [],
    requestGenerateOptions?: RequestGenerateOptions
  ): Promise<TokenResponse> | string {
    const requestSendOptions = {
      service: this.service,
      path: '/admin/auth/token',
      method: 'get',
    }
  
    return this.generateRequest(
      requestSendOptions,
      requestPlugins,
      requestGenerateOptions
    )
  
  
  }
  
  /**
   * 获取当前用户信息
   */
  public getCurrentUser(
    requestPlugins: RequestPlugin[],
    requestGenerateOptions: RequestGenerateOptions & { type: RequestGenerateType.URL }
  ): string
  public getCurrentUser(
    requestPlugins?: RequestPlugin[],
    requestGenerateOptions?: RequestGenerateOptions
  ): Promise<Administrator>
  public getCurrentUser(
    requestPlugins: RequestPlugin[] = [],
    requestGenerateOptions?: RequestGenerateOptions
  ): Promise<Administrator> | string {
    const requestSendOptions = {
      service: this.service,
      path: '/admin/auth/current',
      method: 'get',
    }
  
    return this.generateRequest(
      requestSendOptions,
      requestPlugins,
      requestGenerateOptions
    )
  
  
  }
  
}


namespace RequestQueryParams {
}
