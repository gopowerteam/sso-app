import autoImport from 'unplugin-auto-import/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { VueRouterAutoImports } from 'unplugin-vue-router';

export default autoImport({
  imports: [
    'vue',
    'vue/macros',
    '@vueuse/head',
    '@vueuse/core',
    VueRouterAutoImports,
  ],
  dts: 'src/types/auto-imports.d.ts',
  dirs: [],
  vueTemplate: true,
  eslintrc: {
    enabled: true,
  },
});
