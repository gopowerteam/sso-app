import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { nanoid } from 'nanoid'
import { ModuleRef } from '@nestjs/core'
import chalk from 'chalk'
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
      const username = 'admin'
      const password = nanoid(12)
      administratorService.create(username, password).then(() => {
        Logger.log(chalk.bold.green('Adminstrator Create Success'))
        Logger.log(`${chalk.green('username:')} ${chalk.blue.bold(username)}`)
        Logger.log(`${chalk.green('password:')} ${chalk.blue.bold(password)}`)
      })
    }
  }

  onModuleInit() {
    this.createDefaultAdministrator()
  }
}
