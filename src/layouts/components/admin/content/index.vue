<template>
  <section class="absolute inset-0">
    <ElScrollbar
      class="absolute! inset-0"
      :view-style="{ minHeight: '100%', display: 'flex', flexDirection: 'column', backgroundColor: workspace.content.background }"
    >
      <ElHeader height="auto">
        <ContentHeader />
      </ElHeader>
      <ElMain class="mian-container flex-auto" :style="`--el-main-padding:0 ${workspace.content.padding}px;`">
        <RouterView />
      </ElMain>
      <ElFooter height="auto">
        <ContentFooter />
      </ElFooter>
    </ElScrollbar>
  </section>
</template>

<style lang="scss" scoped module>
.host{
  padding:0px;
}
</style>

<script setup lang="ts">
import ContentHeader from './content-header.vue'
import ContentFooter from './content-footer.vue'
import { appConfig } from '@/config/app.config'

const { workspace } = appConfig
</script>
