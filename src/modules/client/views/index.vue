<template>
  <div class="absolute inset-0 flex login-page">
    <div v-if="$viewport.desktop" class="flex-1" />
    <div class="flex-1 flex-center">
      <div class="login-card desktop:w-[400px] mobile:w-[80%] space-y-10">
        <div class="space-y-2">
          <img class="h-15 w-15" src="/logo.jpg">
          <div class="title text-2xl font-bold">
            现在立即登陆
          </div>
          <div class="text-sm flex items-center space-x-1">
            <span>没有帐号?</span>
            <ElLink style="--el-link-font-size: 0.875rem;" type="primary">
              注册一个
            </ElLink>
          </div>
        </div>

        <div class="login-form">
          123
        </div>
      </div>
    </div>
  </div>
  <div class="background">
    <div v-for="_ in 4" :key="_" class="wave" />
  </div>
</template>

<style lang="scss" scoped>
@use "sass:math";

.login-card{
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;

}
.login-form :deep(.el-input-group__prepend){
  background-color: var(--bg-color);
  color:var(--text-color-primary);
  min-width: 3em;
  font-size: 0.8rem;
  font-weight: bolder;
}

.background{
    position: absolute;
    inset: 0;
    z-index: -1;
    align-items: center;
    min-height: 100vh;
    background-color: fff;
    overflow: hidden;

    .wave {
        content: "";
        position: absolute;
        left: 50%;
        min-width: 300vw;
        min-height: 300vw;
        background: linear-gradient(60deg, rgba(84,58,183,1) 0%, rgba(0,172,193,1) 100%);
        animation: rotate 15s cubic-bezier(.55,.5,.45,.5) infinite;

        @for $i from 1 to 5{
          &:nth-child(#{$i}) {
            bottom: calc(15vh + #{$i * 5}px);
            opacity: calc(0.9 - #{$i * 0.1});
            animation-delay: #{-2 * $i}s;
            border-radius: #{calc(45 - $i * 0.5) + '%'};
          }
        }
    }
}

@keyframes rotate {
    0% {
        transform: translate3d(-50%, 0,0) rotateZ(0deg);
    }
    50% {
        transform: translate3d(-50%, -2%,0) rotateZ(180deg);
    }
    100% {
        transform: translate3d(-50%, 0%,0) rotateZ(360deg);
    }
}
</style>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import { useRequest } from 'virtual:request'

const store = useStore()
const formRef = $ref<FormInstance>()
const authService = useRequest(({ AdminService }) => AdminService.AuthService)

onBeforeMount(() => {
  const store = useStore()
  if (store.admin.user.isLogin)
    location.replace('/admin/')
})
</script>

<route lang="yaml">
name: client:index
</route>
