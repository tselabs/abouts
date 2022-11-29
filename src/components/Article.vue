<template>
  <div class="markdown-body">
    <div class="m-0 pt-2 mb-4 text-size-1.25rem relative text-white">
      <h1>{{ title }}</h1>
    </div>
    <slot />
  </div>
</template>

<style>
@import 'github-markdown-css/github-markdown-dark.css';
</style>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>
