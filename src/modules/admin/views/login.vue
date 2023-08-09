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
        </div>

        <div class="login-form">
          <NForm
            ref="formRef"
            label-placement="left"
            label-width="auto"
            :model="loginModel"
            :rules="loginRules"
            size="small"
          >
            <NFormItem prop="username">
              <NInput v-model="loginModel.username" placeholder="请输入用户名" size="large">
                <template #prefix>
                  用户名
                </template>
              </NInput>
            </NFormItem>
            <NFormItem prop="password">
              <NInput
                v-model="loginModel.password"
                placeholder="请输入密码"
                show-password-on="mousedown"
                size="large"
                type="password"
              >
                <template #prefix>
                  密码
                </template>
              </NInput>
            </NFormItem>
            <NFormItem>
              <NButton
                block
                size="large"
                type="primary"
                @click="onSubmit"
              >
                登录
              </NButton>
            </NFormItem>
          </NForm>
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
.login-form :deep(.n-input-wrapper){
  padding-left: 0;
  .n-input__prefix {
    color:var(--text-color-primary);
    min-width: 5em;
    font-size: 0.8rem;
    font-weight: bolder;
    justify-content: flex-end;
  }
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
import { type FormInst, type FormItemRule, useMessage } from 'naive-ui'
import { useRequest } from 'virtual:request'

const message = useMessage()
const authService = useRequest(({ AdminService }) => AdminService.AuthService)
const formRef = $ref<FormInst>()
const store = useStore()
const loginModel = $ref({
  username: '',
  password: '',
})

const loginRules: Record<string, FormItemRule[]> = {
  username: [
    {
      required: true,
      message: '请输入用户名',
    },
    {
      min: 4,
      max: 12,
      message: '用户名格式错误',
    }],
  password: [
    {
      required: true,
      message: '请输入密码',
    },
    {
      min: 6,
      max: 12,
      message: '密码格式错误',
    }],
}

function onSubmit() {
  formRef?.validate((error) => {
    if (error)
      return

    authService.login({
      username: loginModel.username,
      password: loginModel.password,
    }).then(({ access_token, refresh_token, expires_in }) => {
      store.admin.user.updateToken({
        accessToken: access_token,
        refreshToken: refresh_token,
        expiresIn: expires_in,
      })
      store.admin.user.updateUser({
        roles: ['ADMIN'],
      })
      location.replace('/admin')
    })
  })
}
</script>