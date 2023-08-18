<template>
  <main
    class="admin-layout a1 a2 a3"
    :class="{ desktop: $viewport.desktop, mobile: $viewport.mobile }"
  >
    <div style="grid-area: header" class="relative">header</div>
    <div style="grid-area: sider" class="relative">sider</div>
    <div style="grid-area: content" class="relative">
      <RouterView></RouterView>
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
  background-color: red;
  position: absolute;
  inset: 0;
}
</style>

<script lang="ts" setup>
import { appConfig } from '@/config/app.config';

const store = useStore();
const workspace = ref(appConfig.workspace);

const siderWidth = computed(() =>
  store.admin.layout.sider.collapsed
    ? appConfig.workspace.sider.collapsedWidth
    : appConfig.workspace.sider.width,
);
</script>
