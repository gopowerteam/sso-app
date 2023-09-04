import { Injectable } from '@nestjs/common'
import { App } from 'server/entities/app.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { AppCreateInput } from '../dtos/app.dto'

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(App)
    private appRepository: Repository<App>,
  ) {}

  create(input: AppCreateInput) {
    const app = this.appRepository.create(input)

    return this.appRepository.save(app)
  }
}
