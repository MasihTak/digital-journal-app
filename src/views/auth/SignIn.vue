<script setup>
import {useRouter} from "vue-router";
import {useAuthStore} from "@/stores/auth";
import {storeToRefs} from "pinia";
import {useForm, useField} from 'vee-validate';
import {string} from 'yup';
import {toast} from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import BaseInput from "@/components/Form/BaseInput.vue";

const {error} = storeToRefs(useAuthStore());
const {signIn} = useAuthStore();
const router = useRouter();

/*----------- Validation -----------*/
const validationSchema = ({
  password: string().test(
      'password',
      'Password must have at least 8 characters, one uppercase letter, one number and one special character',
      (value) => {
        // Use a regular expression to check the password criteria
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,40}$/;
        return regex.test(value);
      }),
  email: string().matches(/.+@.+\..{2,}/, "This must be a valid email").min(5).max(40),
})

const {handleSubmit, errors} = useForm({validationSchema});

const {value: email, handleChange: handleEmailChange} = useField('email');
const {value: password, handleChange: handlePasswordChange} = useField('password');


/**
 * Logs in the user with the provided email and password and redirects to the notes page.
 *
 * @async
 * @function authenticateUser
 * @returns {Promise<void>} A promise that resolves when the login process is complete.
 */
const authenticateUser = handleSubmit(async (values) => {
  await signIn(values.email, values.password);
  if (error.value) {
    toast("Something went wrong! <br /> Please try again later.", {
      "theme": "colored",
      "type": "error",
      "position": "top-center",
      "dangerouslyHTMLString": true
    })
    console.error(error.value);
  } else {
    await router.push("/journals");
  }
})
</script>

<template>
  <div class="container">
    <section class="pt-5">
      <h1 class="display-5">Sign in</h1>
      <div class="row mt-5 pt-5">
        <div class="col-md-7 mx-auto">
          <form class="row g-3" @submit.prevent="authenticateUser">
            <div class="col-12">
              <BaseInput label="Email Address"
                         name="email"
                         type="email"
                         maxlength="40"
                         :model-value="email"
                         @input="handleEmailChange"
                         :error="errors.email"
                         class="mt-2"
                         :class="errors.email ? 'is-invalid' : ''"
                         required
              />
            </div>
            <div class="col-12">
              <BaseInput label="Password"
                         name="password"
                         type="password"
                         :model-value="password"
                         @input="handlePasswordChange"
                         :error="errors.password"
                         class="mt-2"
                         :class="errors.password ? 'is-invalid' : ''"
                         required />
            </div>
            <div class="col-12 text-center text-md-start">
              <button type="submit" class="btn btn-primary mt-4">Sign in</button>
            </div>
          </form>

          <p class="mt-3">Need an account?
            <router-link to="/sign-up">Sign Up</router-link>
          </p>

        </div>
      </div>
    </section>
  </div>
</template>
