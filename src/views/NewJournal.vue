<script setup>
import {ref} from 'vue';
import {VMarkdownEditor} from 'vue3-markdown';
import 'vue3-markdown/dist/style.css';
import BaseInput from "@/components/Form/BaseInput.vue";


const content = ref('')
const title = ref('')
</script>

<template>
  <div class="container h-50">
    <h2>New Journal</h2>
    <BaseInput name="title" label="title" v-model="title" />
    <VMarkdownEditor
        v-model="content"
        locale="en"
    />
    <button type="button"
            class="btn btn-success"
    >Save
    </button>
  </div>
</template>

<style scoped>

</style>
