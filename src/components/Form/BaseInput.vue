<script setup>
import {onMounted} from "vue";

const emit = defineEmits(["update:modelValue"]);

/*----------- Props -----------*/
const props = defineProps({
  label: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: false
  },
  placeholder: {
    type: String,
    required: false
  },
  maxlength: {
    type: String,
    required: false
  },
  modelValue: {
    type: String,
    default: ""
  },
  error: {
    type: String,
    default: ""
  }
});

/*----------- Data -----------*/
/**
 * @desc if the id attribute omitted use the same value as the name.
 */
let identity = props.id ? props.id : props.name;

/*----------- onMounted -----------*/
/**
 * @desc Emit an update to the modelValue prop when the component is mounted.
 */
onMounted(() => {
  emit("update:modelValue", props.modelValue);
});
</script>

<template>
  <label :for="identity"
         class="d-block"
  >{{ label }}</label>
  <input
    :id="identity"
    :name="name"
    :maxlength="maxlength"
    :placeholder="placeholder"
    class="form-control"
    v-bind="$attrs"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  >
  <p v-if="error"
     class="invalid-feedback"
  >
    {{ error }}
  </p>
</template>
