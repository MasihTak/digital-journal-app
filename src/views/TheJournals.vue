<script setup>
import {useRouter} from "vue-router";

const router = useRouter();

function createJournal() {
  router.push("/journals/new");
}
</script>

<template>
  <div class="container">
    <section>
      <h1>My Journals:</h1>
      <button class="btn btn-primary"
              @click="createJournal"
              type="button"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
          <path fill="#FFF"
                d="M17.5 18.5v2q0 .2.15.35T18 21q.2 0 .35-.15t.15-.35v-2h2q.2 0 .35-.15T21 18q0-.2-.15-.35t-.35-.15h-2v-2q0-.2-.15-.35T18 15q-.2 0-.35.15t-.15.35v2h-2q-.2 0-.35.15T15 18q0 .2.15.35t.35.15zM18 23q-2.075 0-3.537-1.463T13 18q0-2.075 1.463-3.537T18 13q2.075 0 3.538 1.463T23 18q0 2.075-1.463 3.538T18 23M8 9h8q.425 0 .713-.288T17 8q0-.425-.288-.712T16 7H8q-.425 0-.712.288T7 8q0 .425.288.713T8 9m3.675 12H5q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v6.7q-.725-.35-1.463-.525T18 11q-.275 0-.513.012t-.487.063q-.225-.05-.5-.062T16 11H8q-.425 0-.712.288T7 12q0 .425.288.713T8 13h5.125q-.45.425-.812.925T11.675 15H8q-.425 0-.712.288T7 16q0 .425.288.713T8 17h3.075q-.05.25-.062.488T11 18q0 .825.15 1.538T11.675 21" />
        </svg>
      </button>
    </section>
  </div>
</template>

<style scoped>

</style>