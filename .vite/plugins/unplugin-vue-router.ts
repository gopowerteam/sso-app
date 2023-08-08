import VueRouter from 'unplugin-vue-router/vite';

export default VueRouter({
  routesFolder: [
    'src/views',
    {
      src: 'src/admin/views',
      path: 'admin/',
    },
  ],
  exclude: ['**/components/*.vue'],
  extensions: ['.vue'],
  dts: 'src/typings/typed-router.d.ts',
  routeBlockLang: 'yaml',
});
