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
  <div class="container-fluid w-100 py-3 bg-secondary-subtle">
    <router-link to="/journals">
      <svg xmlns="http://www.w3.org/2000/svg"
           width="32"
           height="32"
           viewBox="0 0 24 24"
      >
        <path fill="currentColor"
              d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6l6 6z"
        />
      </svg>
    </router-link>
  </div>
  <div class="container h-50">
    <h2 class="mt-3 mb-5">
      New Journal
    </h2>
    <BaseInput class="mb-4"
               name="title"
               label="Title"
               v-model="title"
    />

    <span>Content</span>
    <VMarkdownEditor
      v-model="content"
      locale="en"
    />
    <button type="button"
            class="btn btn-success mt-3 px-4"
            @click="saveJournal"
    >
      Save
    </button>
  </div>
</template>

<style scoped>

</style>
