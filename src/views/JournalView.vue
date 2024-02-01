<script setup>
import {computed} from 'vue';
import {useRoute} from "vue-router";
import {useRouter} from "vue-router";
import JournalCard from "@/components/UI/JournalCard.vue";
import {useJournalStore} from "@/stores/journal.js";
import {storeToRefs} from "pinia";

const route = useRoute();
const router = useRouter();
const {deleteJournal} = useJournalStore();
const {journals} = storeToRefs(useJournalStore());


const id = Number(route.params.id);

/*----------- Computed -----------*/
/**
 * Finds the journal with the given id
 */
const foundJournal = computed(() => {
  return journals.value.find(journal => journal.id === id);
});


/*----------- Methods -----------*/
/**
 * Edits a journal
 *
 * @param {string} id The id of the journal to edit
 */
function onEditJournal(id) {
  router.push(`/journals/${id}/edit`);
}

/**
 * Deletes a journal
 *
 * @param {string} id The id of the journal to delete
 */
function onDeleteJournal(id) {
  deleteJournal(id);
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
  <div class="container mt-5">
    <JournalCard :title="foundJournal.title"
                 :content="foundJournal.content"
                 :url="`/journals/${foundJournal.id}`"
                 :created-at="new Date(foundJournal.created_at)"
                 @delete-journal="onDeleteJournal(foundJournal.id)"
                 @edit-journal="onEditJournal(foundJournal.id)"
    />
  </div>
</template>
