import components from 'unplugin-vue-components/vite';
import { ElementPlusResolver} from 'unplugin-vue-components/resolvers';

export default components({
  dts: 'src/types/components.d.ts',
  dirs: ['src/shared/components'],
  resolvers: [
    ElementPlusResolver({importStyle:false}),
  ],
  include: [/\.vue$/, /\.vue\?vue/],
});
