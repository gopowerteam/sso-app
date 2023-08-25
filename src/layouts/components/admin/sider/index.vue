<template>
  <section class="absolute inset-0 flex flex-col select-none">
    <SideMenu class="flex-auto relative" />
    <SideActions />
  </section>
</template>

<style lang="scss" scoped>
:deep(.el-scrollbar__bar.is-horizontal){
  display: none;
}
</style>

<script setup lang="ts">
import SideMenu from './sider-menu.vue'
import SideActions from './sider-actions.vue'
</script>
