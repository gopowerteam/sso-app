<template>
  <div>admin1123555</div>
  <div>{{ aaa }}1</div>
</template>

<style scoped>

</style>

<script setup lang="ts">
const aaa =$ref("xxx")
</script>

<route lang="yaml">
name: admin:dashboard
meta:
  layout: admin
  requireAuth: true
  menu:
    key: dashboard
    title: dashboard
    index: 1
    icon: icon
</route>
