<script setup>
import {ref} from "vue";

/**
 * Retrieves the current year.
 *
 * @returns {number} The current year.
 */
let currentYear = ref(new Date().getFullYear());
</script>

<template>
  <footer class="fixed-bottom">
    <p class="text-center pb-3">&copy; {{ currentYear }} MasihTak.</p>
  </footer>
</template>
