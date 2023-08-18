import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    breadcrumb?: boolean,
    menu?: MenuConfig
    requireAuth?: boolean
    requireRoles?: string[]
  }
}
