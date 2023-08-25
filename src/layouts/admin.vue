<template>
  <main
    class="admin-layout"
    :class="{ desktop: $viewport.desktop, mobile: $viewport.mobile }"
  >
    <div class="relative" style="grid-area: header">
      <Header />
    </div>
    <div class="relative" style="grid-area: sider">
      <Sider />
    </div>
    <div class="relative" style="grid-area: content;background-color: red;">
      <Content />
    </div>
  </main>
</template>

<style scoped>
.admin-layout {
  display: grid;
  grid-template-columns: v-bind(`${siderWidth}px`) auto;
  grid-template-rows: v-bind(`${workspace.header.height}px`) auto;
  grid-template-areas:
    'header header'
    'sider content';
  position: absolute;
  inset: 0;
  transition-property: grid-template-columns;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
</style>

<script lang="ts" setup>
import Header from './components/admin/header/index.vue'
import Sider from './components/admin/sider/index.vue'
import Content from './components/admin/content/index.vue'
import { appConfig } from '@/config/app.config'

const store = useStore()
const workspace = ref(appConfig.workspace)

const siderWidth = computed(() =>
  store.admin.layout.sider.collapsed
    ? appConfig.workspace.sider.collapsedWidth
    : appConfig.workspace.sider.width,
)
</script>
