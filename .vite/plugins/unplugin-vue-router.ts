import Pages from 'vite-plugin-pages'

export default Pages({
  dirs: [
    {
      dir: 'src/modules/client/views',
      baseRoute: '/',
    },
    {
      dir: 'src/modules/admin/views',
      baseRoute: 'admin/',
    },
  ],
  routeBlockLang: 'yaml',
});
