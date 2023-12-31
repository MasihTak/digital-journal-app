<script setup>
import {ref} from "vue";
import { useAuthStore } from "@/stores/auth";
import BaseInput from "@/components/Form/BaseInput.vue";
import {storeToRefs} from "pinia";

const {error} = storeToRefs(useAuthStore());
const {signUp} = useAuthStore();

const name = ref("")
const family = ref("")
const email = ref("")
const password = ref("")

/**
 * Registers a new user
 *
 * @async
 * @function onSignUp
 * @returns {Promise<void>}
 */
const onSignUp = async () => {
  await signUp(email.value, password.value, name.value, family.value);
  if (error.value) {
    console.error(error.value);
  }
};
</script>

<template>
  <div class="container">
    <section class="pt-5">
      <h1 class="display-5">Sign Up</h1>
      <div class="row mt-5 pt-5">
        <div class="col-md-7 mx-auto">
          <form class="row g-3" @submit.prevent="onSignUp">
            <div class="col-md-6">
              <BaseInput label="Name" name="name" v-model="name" class="mt-2" required />
            </div>
            <div class="col-md-6">
              <BaseInput label="Family" name="family" v-model="family" class="mt-2" required />
            </div>
            <div class="col-12">
              <BaseInput label="Email" name="email" v-model="email" type="email" class="mt-2" required />
            </div>
            <div class="col-12">
              <BaseInput label="Password" name="password" v-model="password" type="password" class="mt-2" required />
            </div>
            <div class="col-12 text-center text-md-start">
              <button type="submit" class="btn btn-primary mt-4">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>
