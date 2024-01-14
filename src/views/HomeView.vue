<script setup>
import {RouterLink} from 'vue-router'
</script>

<template>
  <div class="d-flex flex-column align-items-center justify-content-center h-100">
    <img src="@/assets/img/logo.svg" alt="logo" class="img-fluid mb-3 logo" />
    <h1 class="text-center">Digital Journal <br />App</h1>
    <RouterLink to="/sign-up" class="btn btn-primary btn-lg mt-5">Get started</RouterLink>
  </div>
</template>

<style scoped lang="scss">
img {
  width  : 175px;
  height : 175px;
  }
</style>
