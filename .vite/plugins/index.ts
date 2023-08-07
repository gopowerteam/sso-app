import type { PluginOption } from 'vite'
import unocss from './unocss'
import autoImport from './unplugin-auto-import'
import components from './unplugin-vue-components'
import routes from './vue-router'
import layouts from './vite-plugin-vue-layouts'

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
      routes,
      layouts,
      components,
      unocss,
      ...plugins,
    ],
  }
}
