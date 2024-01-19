<script setup>
import {ref, computed} from 'vue';
import {useRoute} from "vue-router";
import {storeToRefs} from "pinia";
import {useJournalStore} from "@/stores/journal";
import BaseInput from "@/components/Form/BaseInput.vue";
import {VMarkdownEditor} from "vue3-markdown";
import 'vue3-markdown/dist/style.css';

const route = useRoute();
const {updateJournal} = useJournalStore();
const {journals} = storeToRefs(useJournalStore());

const id = Number(route.params.id);

/*----------- Computed -----------*/
/**
 * Finds the journal with the given id
 */
const foundJournal = computed(() => {
  return journals.value.find(journal => journal.id === id);
});

/*----------- Data -----------*/
const title = ref(foundJournal.value.title);
const content = ref(foundJournal.value.content);

/*----------- Methods -----------*/
/**
 * Updates the journal
 */
function onUpdateJournal() {
  updateJournal(id, title.value, content.value);
}

</script>

<template>
  <div class="container h-50">
    <h2 class="mt-3 mb-5">Edit Journal</h2>
    <BaseInput class="mb-4" name="title" label="Title" v-model="title" />

    <span>Content</span>
    <VMarkdownEditor
        v-model="content"
        locale="en"
    />
    <button type="button"
            class="btn btn-success mt-3 px-4"
            @click.prevent="onUpdateJournal"
    >Update
    </button>
  </div>
</template>
