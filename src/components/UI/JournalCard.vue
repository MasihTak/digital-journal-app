<script setup>
import {formatTimeAgo} from '@vueuse/core';
import {VMarkdownView} from 'vue3-markdown'
import 'vue3-markdown/dist/style.css'

defineEmits(['deleteJournal', 'editJournal'])

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
  <router-link :to="url">
    <div class="card shadow-sm">
      <div class="card-body">
        <h5 class="card-title">{{ title }}</h5>
        <VMarkdownView class="mb-5"
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
