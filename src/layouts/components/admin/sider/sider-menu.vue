<template>
  <ElScrollbar class="absolute! inset-0" :style="{ backgroundColor: workspace.sider.background }">
    <ElMenu
      class="sider-menu"
      :collapse="store.admin.layout.sider.collapsed"
      collapse-transition
      :default-active="route.path"
      menu-trigger="click"
      mode="vertical"
      router
      :unique-opened="$viewport.desktop"
    >
      <MenuItem v-for="menu in roots" :key="menu.key" :menu="menu" />
    </ElMenu>
  </ElScrollbar>
</template>

<style scoped lang="scss">
.sider-menu :deep(.el-menu-item.is-active){
  &:after {
    position: absolute;
    top: 0;
    right: 0;
    width: 4px;
    height: 100%;
    background-color: var(--el-color-primary);
    content: '';
  }
}

.sider-menu :deep(.el-sub-menu.is-active){
  .el-sub-menu__title{
    color: var(--el-color-primary);
  }
}

.sider-menu {
  border-right:none;
}

.sider-menu.v-leave-active :deep(.el-sub-menu.is-active){
  .el-menu-item{
    &::after{
      background-color: transparent;
    }
  }
}
</style>

<script setup lang="ts">
import MenuItem from '../menu-item.vue'
import submenus from '@/config/menu.config'
import { appConfig } from '@/config/app.config'

const { workspace } = appConfig
const store = useStore()
const route = useRoute()
const router = useRouter()
const roots = $ref<RouteMenu[]>([])

/**
 * 生成菜单
 */
function generateMenus() {
  const pages = router.getRoutes().filter(route => route.path.startsWith('/admin/') && route.name).filter(route => route.meta.menu).map((route, index) => ({
    ...route.meta.menu,
    path: route.path,
    index: route.meta.menu?.index || (index + 100),
  }) as RouteMenu)

  const menus = [...(submenus as unknown as RouteMenu[]).map((menu, index) => ({
    ...menu,
    index: menu?.index || (index + 100),
  })), ...pages]

  const sortIndex = (a: RouteMenu, b: RouteMenu) => a.index! - b.index!

  const generateTree = (menu: RouteMenu): RouteMenu | undefined => {
    const children = (menus.filter(m => m.parent === menu.key)
      .map(generateTree)
      .filter(Boolean) as RouteMenu[])
      .sort(sortIndex)

    if (children.length > 0) menu.children = children

    switch (true) {
      case !menu.parent && (children.length !== 0 || !!menu.path):{
        roots.push(menu)
        roots.sort(sortIndex)
        break
      }
      case !!menu.path: {
        return menu
      }
      case !menu.path && children.length !== 0:{
        return menu
      }
    }
  }

  menus
    .filter(menu => !menu.parent)
    .map(generateTree)
}

onMounted(() => {
  generateMenus()
})
</script>
