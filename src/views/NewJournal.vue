<script setup>
import {ref} from 'vue';
import {useJournalStore} from "@/stores/journal";
import {VMarkdownEditor} from 'vue3-markdown';
import 'vue3-markdown/dist/style.css';
import BaseInput from "@/components/Form/BaseInput.vue";

const {createJournal} = useJournalStore();

const content = ref('')
const title = ref('')

function saveJournal() {
  createJournal(title.value, content.value)
}
</script>

<template>
  <div class="container h-50">
    <h2 class="mt-3 mb-5">New Journal</h2>
    <BaseInput class="mb-4" name="title" label="Title" v-model="title" />

    <span>Content</span>
    <VMarkdownEditor
        v-model="content"
        locale="en"
    />
    <button type="button"
            class="btn btn-success mt-3 px-4"
            @click="saveJournal"
    >Save
    </button>
  </div>
</template>

<style scoped>

</style>
