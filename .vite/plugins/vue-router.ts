import VueRouter from 'unplugin-vue-router/vite'

export default VueRouter({
  routesFolder: 'src/views',
  exclude: ['**/components/*.vue'],
  extensions: ['.vue'],
  dts: 'src/typings/typed-router.d.ts',
  routeBlockLang: 'yaml',
})
