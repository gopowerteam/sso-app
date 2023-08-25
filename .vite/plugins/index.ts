import type { PluginOption } from 'vite'
import unocss from './unocss'
import autoImport from './unplugin-auto-import'
import components from './unplugin-vue-components'
import router from './unplugin-vue-router'
import layouts from './vite-plugin-vue-layouts'
import request from './request'

/**
 * DefineVitePlugins
 * @param plugins
 * @returns
 */
export function defineVitePlugins(
  plugins: PluginOption[] = [],
): Record<'plugins', PluginOption[]> {
  return {
    plugins: [
      autoImport,
      layouts,
      router,
      components,
      unocss,
      request,
      ...plugins,
    ],
  }
}
