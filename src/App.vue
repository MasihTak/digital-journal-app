<script setup>
import { RouterView } from 'vue-router'
import TheFooter from "@/components/TheFooter.vue";
</script>

<template>
  <RouterView />
  <TheFooter />
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
