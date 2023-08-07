import type { CSSOptions } from 'vite'

export function defineViteCSS(
  options: CSSOptions = {},
): Record<'css', CSSOptions> {
  return {
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
      ...options,
    },
  }
}
