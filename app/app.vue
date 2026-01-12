<!-- 문제는 app.vue가 실행될때까지도 base (layers)의 UApp Uheader 등이 덜 load되었다는 점이다. -->

<template>

  <NuxtLayout >
    <NuxtPage />
  </NuxtLayout>

  <!-- <mTest /> -->
</template>

<script setup lang="ts">
</script>