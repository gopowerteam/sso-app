/// <reference types="vite/client" />
/// <reference types="vite-plugin-vue-meta-layouts/client.d.ts" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
