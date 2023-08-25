<template>
  <template v-if="menu.path">
    <ElMenuItem :index="menu.path">
      <div class="space-x-2 flex-center">
        <svg-icon
          v-if="menu.icon"
          :name="menu.icon"
          :size="24"
        />
        <span class="menu-title" :class="{ collapsed }">
          {{ menu.title }}
        </span>
      </div>
    </ElMenuItem>
  </template>

  <template v-else>
    <ElSubMenu :index="menu.key">
      <template #title>
        <div class="space-x-2 flex-center w-full">
          <svg-icon v-if="menu.icon" :name="menu.icon" :size="20" />
          <span class="submenu-title" :class="{ collapsed }">
            {{ menu.title }}
          </span>
        </div>
      </template>
      <MenuItem
        v-for="child in menu.children"
        :key="child.key"
        :menu="child"
      />
    </ElSubMenu>
  </template>
</template>

<style lang="scss" scoped>
@keyframes disappeaer {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    visibility: hidden;
  }
}

.menu-title,.submenu-title{
  opacity: 1;

  &.collapsed{
    animation-name: disappeaer;
    animation-duration: 0.15s;
    animation-fill-mode: forwards;
  }
}
</style>

<script setup lang="ts">
import MenuItem from './menu-item.vue'

defineProps<{
  menu: RouteMenu
}>()

const store = useStore()
const collapsed = computed(() => store.admin.layout.sider.collapsed)
</script>
