import components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
export default components({
  dts: 'src/types/components.d.ts',
  dirs: ['src/shared/components'],
  resolvers: [NaiveUiResolver()],
  include: [/\.vue$/, /\.vue\?vue/],
});
