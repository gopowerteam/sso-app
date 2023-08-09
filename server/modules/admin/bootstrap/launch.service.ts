import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { nanoid } from 'nanoid'
import { ModuleRef } from '@nestjs/core'
import { AdministratorService } from '../services/administrator.service'

@Injectable()
export class LaunchService implements OnModuleInit {
  private logger = new Logger(LaunchService.name)
  constructor(
    private moduleRef: ModuleRef,
  ) {}

  async createDefaultAdministrator() {
    const administratorService = this.moduleRef.get(AdministratorService)

    if (!await administratorService.isExist()) {
      const password = nanoid(12)
      administratorService.create('admin', password).then(() => {
        this.logger.log(`
            administrator is inited:
            username: admin
            password: ${password}
        `)
      })
    }
  }

  onModuleInit() {
    this.createDefaultAdministrator()
  }
}
