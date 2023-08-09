<template>
  <NButton type="primary">
    1231235
  </NButton>
  <div>desktop:{{ $viewport.desktop }}</div>
  <div>mobile:{{ $viewport.mobile }}</div>
  <div v-if="$viewport.desktop">
    desktop
  </div>
  <div v-if="$viewport.mobile">
    mobile
  </div>
  <div class="a text-[30px] text-blue">
    123
  </div>
</template>

<style lang="scss" scoped>
.a{
  background-color: red;
}
</style>

<script setup lang="ts">
const a = ref(true)
</script>
