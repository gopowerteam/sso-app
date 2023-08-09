import autoImport from 'unplugin-auto-import/vite';
import { VueRouterAutoImports } from 'unplugin-vue-router';

export default autoImport({
  imports: [
    'vue',
    'vue/macros',
    'pinia',
    '@vueuse/head',
    '@vueuse/core',
    VueRouterAutoImports,
    {
      '@/store':[
        'useStore'
      ]
    }
  ],
  dts: 'src/types/auto-imports.d.ts',
  dirs: [ ],
  vueTemplate: true,
  eslintrc: {
    enabled: true,
  },
});
