import { SetMetadata } from '@nestjs/common'
import { IS_PUBLIC_KEY } from 'server/global/consants'

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true)
