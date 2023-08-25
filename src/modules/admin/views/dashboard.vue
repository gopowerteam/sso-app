<template>
  <div>admin</div>
</template>

<style scoped>

</style>

<script setup lang="ts">

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
