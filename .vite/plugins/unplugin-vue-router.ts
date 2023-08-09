import VueRouter from 'unplugin-vue-router/vite';

export default VueRouter({
  routesFolder: [
    {
      src: 'src/modules/client/views',
      path: '/',
    },
    {
      src: 'src/modules/admin/views',
      path: 'admin/',
    },
  ],
  exclude: ['**/components/*.vue'],
  extensions: ['.vue'],
  dts: 'src/types/typed-router.d.ts',
  routeBlockLang: 'yaml',
});
