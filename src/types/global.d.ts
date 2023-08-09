import type {MessageApiInjection} from 'naive-ui'

export {}

declare global {
  var __initialState__: any;
  var $message: MessageApiInjection
}
