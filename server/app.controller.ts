import { Controller, Get } from '@nestjs/common'

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'hello'
  }

  @Get('a')
  getHello1(): string {
    return 'a'
  }
}
