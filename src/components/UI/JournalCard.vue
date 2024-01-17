<script setup>
import {formatTimeAgo} from '@vueuse/core';
import {VMarkdownView} from 'vue3-markdown'
import 'vue3-markdown/dist/style.css'

/*----------- Emits -----------*/
defineEmits(['deleteJournal', 'editJournal'])

/*----------- Props -----------*/
defineProps({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  }
})
</script>

<template>
  <router-link class="text-decoration-none" :to="url">
    <div class="card shadow-sm border-light-subtle h-100">
      <div class="card-body">
        <h5 class="card-title">{{ title }}</h5>
        <VMarkdownView class="mb-5 d-block text-truncate"
                       :content="content"
        ></VMarkdownView>
        <button type="button"
                class="btn btn-primary me-2"
                @click.prevent="$emit('editJournal')"
        >Edit
        </button>
        <button type="button"
                class="btn btn-danger"
                @click.prevent="$emit('deleteJournal')"
        >Delete
        </button>
      </div>
      <div class="card-footer text-body-secondary">
        {{ formatTimeAgo(createdAt) }}
      </div>
    </div>
  </router-link>
</template>
