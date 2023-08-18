import autoImport from 'unplugin-auto-import/vite';

export default autoImport({
  imports: [
    'vue',
    'vue-router',
    'vue/macros',
    'pinia',
    '@vueuse/head',
    '@vueuse/core',
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
