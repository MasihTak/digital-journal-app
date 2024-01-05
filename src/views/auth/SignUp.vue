<script setup>
import {useAuthStore} from "@/stores/auth";
import {storeToRefs} from "pinia";
import {useForm, useField} from 'vee-validate';
import {string} from 'yup';
import {toast} from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import BaseInput from "@/components/Form/BaseInput.vue";

const {error} = storeToRefs(useAuthStore());
const {signUp} = useAuthStore();

/*----------- Validation -----------*/
const validationSchema = ({
  name: string().required().matches(/^[a-zA-Z\s]+$/, 'Only letters and spaces are allowed').min(3).max(20),
  family: string().required().matches(/^[a-zA-Z\s]+$/, 'Only letters and spaces are allowed').min(3).max(30),
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

const {value: name, handleChange: handleNameChange} = useField('name');
const {value: family, handleChange: handleFamilyChange} = useField('family');
const {value: password, handleChange: handlePasswordChange} = useField('password');
const {value: email, handleChange: handleEmailChange} = useField('email');

/*----------- Methods -----------*/
/**
 * Registers a new user
 *
 * @async
 * @function onSignUp
 * @returns {Promise<void>}
 */
const onSignUp = handleSubmit(async (values, {resetForm}) => {
  await signUp(values.email, values.password, values.name, values.family);
  if (error.value) {
    console.error(error.value);
    toast(error.value, {
      "theme": "colored",
      "type": "error",
      position: 'top-center',
    })
  } else {
    toast('You have successfully signed up! Please verify your email address.', {
      "theme": "colored",
      "type": "success",
      position: 'top-center',
    })
    resetForm();
  }
});
</script>

<template>
  <div class="container">
    <section class="pt-5">
      <h1 class="display-5">Sign Up</h1>
      <div class="row mt-5 pt-5">
        <div class="col-md-7 mx-auto">
          <form class="row g-3" @submit.prevent="onSignUp">
            <div class="col-md-6">
              <BaseInput label="Name"
                         name="name"
                         maxlength="20"
                         :model-value="name"
                         @input="handleNameChange"
                         :error="errors.name"
                         class="mt-2"
                         :class="errors.name ? 'is-invalid' : ''"
                         required />
            </div>
            <div class="col-md-6">
              <BaseInput label="Family"
                         name="family"
                         maxlength="30"
                         :model-value="family"
                         @input="handleFamilyChange"
                         :error="errors.family"
                         class="mt-2"
                         :class="errors.family ? 'is-invalid' : ''"
                         required />
            </div>
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
                         required />
            </div>
            <div class="col-12">
              <BaseInput label="Password"
                         name="password"
                         type="password"
                         :model-value="password"
                         @input="handlePasswordChange"
                         :error="errors.password"
                         maxlength="40"
                         class="mt-2"
                         :class="errors.password ? 'is-invalid' : ''"
                         required />
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
