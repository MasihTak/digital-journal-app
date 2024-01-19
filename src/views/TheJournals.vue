<script setup>
import {useRouter} from "vue-router";
import {useAuthStore} from "@/stores/auth";
import {useJournalStore} from "@/stores/journal";
import {storeToRefs} from "pinia";
import {onMounted} from "vue";
import JournalCard from "@/components/UI/JournalCard.vue";

const router = useRouter();
const {getUser} = useAuthStore();
const {fetchJournals, deleteJournal} = useJournalStore();
const {journals} = storeToRefs(useJournalStore());

const user_name = getUser().user_metadata.name;

/*----------- Methods -----------*/
/**
 * Creates a new journal
 */
function createJournal() {
  router.push("/journals/new");
}

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

/**
 * Fetches the journals
 */
onMounted(() => {
  fetchJournals();
})
</script>

<template>
  <div class="container">
    <section>
      <div class="d-flex align-items-center justify-content-between">
        <h1 class="my-4">{{ user_name }} Journal's</h1>

        <button class="btn btn-primary"
                @click="createJournal"
                type="button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
            <path fill="#FFF"
                  d="M17.5 18.5v2q0 .2.15.35T18 21q.2 0 .35-.15t.15-.35v-2h2q.2 0 .35-.15T21 18q0-.2-.15-.35t-.35-.15h-2v-2q0-.2-.15-.35T18 15q-.2 0-.35.15t-.15.35v2h-2q-.2 0-.35.15T15 18q0 .2.15.35t.35.15zM18 23q-2.075 0-3.537-1.463T13 18q0-2.075 1.463-3.537T18 13q2.075 0 3.538 1.463T23 18q0 2.075-1.463 3.538T18 23M8 9h8q.425 0 .713-.288T17 8q0-.425-.288-.712T16 7H8q-.425 0-.712.288T7 8q0 .425.288.713T8 9m3.675 12H5q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v6.7q-.725-.35-1.463-.525T18 11q-.275 0-.513.012t-.487.063q-.225-.05-.5-.062T16 11H8q-.425 0-.712.288T7 12q0 .425.288.713T8 13h5.125q-.45.425-.812.925T11.675 15H8q-.425 0-.712.288T7 16q0 .425.288.713T8 17h3.075q-.05.25-.062.488T11 18q0 .825.15 1.538T11.675 21" />
          </svg>
        </button>
      </div>

      <div class="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4">
        <template v-for="journal in journals" :key="journal.id">
          <div class="col">
            <JournalCard :title="journal.title"
                         :content="journal.content"
                         :url="`/journals/${journal.id}`"
                         :createdAt="new Date(journal.created_at)"
                         @delete-journal="onDeleteJournal(journal.id)"
                         @edit-journal="onEditJournal(journal.id)"
            />
          </div>
        </template>
      </div>
    </section>
  </div>
</template>

<style scoped>

</style>
