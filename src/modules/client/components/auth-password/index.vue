<template>
  <div>
    <ElForm ref="formRef" :model="formModel" :rules="formRules">
      <ElFormItem prop="username">
        <ElInput v-model="formModel.username" placeholder="请输入用户名" size="large">
          <template #prepend>
            用户名
          </template>
        </ElInput>
      </ElFormItem>
      <ElFormItem prop="password">
        <ElInput
          v-model="formModel.password"
          placeholder="请输入密码"
          size="large"
          type="password"
        >
          <template #prepend>
            密码
          </template>
        </ElInput>
      </ElFormItem>
      <ElFormItem>
        <ElButton
          class="w-full"
          size="large"
          type="primary"
          @click="onSubmit"
        >
          登录
        </ElButton>
      </ElFormItem>
    </ElForm>
  </div>
</template>

<style scoped>

</style>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'

const formRef = $ref<FormInstance>()
const formModel = $ref({
  username: '',
  password: '',
})

const formRules: FormRules = {
  username: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur',
    },
    {
      min: 4,
      max: 12,
      message: '用户名格式错误',
      trigger: 'blur',
    }],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur',
    },
    {
      min: 6,
      max: 12,
      message: '密码格式错误',
      trigger: 'blur',
    }],
}

async function onSubmit() {
  const valid = await formRef?.validate()

  if (valid) {
    // authService.login({
    //   username: formModel.username,
    //   password: formModel.password,
    // }).then(({ access_token, refresh_token, expires_in }) => {
    //   store.admin.user.updateToken({
    //     accessToken: access_token,
    //     refreshToken: refresh_token,
    //     expiresIn: expires_in,
    //   })

    //   location.replace('/admin/')
    // })
  }
}
</script>
