<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style lang="scss">
@import '@/assets/scss/utilities/_variables.scss';

body {
  font-size: $base__font-size;
  }

body, #app {
  height: 100vh;
  }
</style>
