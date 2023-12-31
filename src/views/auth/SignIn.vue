<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import {useAuthStore} from "@/stores/auth";
import BaseInput from "@/components/Form/BaseInput.vue";
import {storeToRefs} from "pinia";

const {error} = storeToRefs(useAuthStore());
const {signIn} = useAuthStore();
const router = useRouter();

const email = ref("");
const password = ref("");

/**
 * Logs in the user with the provided email and password and redirects to the notes page.
 *
 * @async
 * @function authenticateUser
 * @returns {Promise<void>} A promise that resolves when the login process is complete.
 */
const authenticateUser = async () => {
  await signIn(email.value, password.value);
  if (!error.value) {
    await router.push("/notes");
  }
};
</script>

<template>
  <div class="container">
    <section class="pt-5">
      <h1 class="display-5">Sign in</h1>
      <div class="row mt-5 pt-5">
        <div class="col-md-7 mx-auto">
          <form class="row g-3" @submit.prevent="authenticateUser">
            <div class="col-12">
              <BaseInput label="Email" name="email" v-model="email" class="mt-2" required />
            </div>
            <div class="col-12">
              <BaseInput label="Password" name="password" v-model="password" type="password" class="mt-2" required />
            </div>
            <div class="col-12 text-center text-md-start">
              <button type="submit" class="btn btn-primary mt-4">Sign in</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>
