import { Body, Controller, Post } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger'
import { App } from 'server/entities/app.entity'
import { AppCreateInput } from '../dtos/app.dto'
import { AppService } from '../services/app.service'

@ApiTags('app')
@ApiSecurity('access-token')
@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  @ApiOperation({ operationId: 'create', summary: '创建应用' })
  @ApiOkResponse({ type: App })
  create(@Body() input: AppCreateInput) {
    return this.appService.create(input)
  }
}
