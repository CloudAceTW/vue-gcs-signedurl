<template>
  <v-alert
    :text="text"
    :title="title"
    :type="type"
    :closable="true"
  ></v-alert>
</template>

<script setup>
import { defineProps } from 'vue'
const { text, title, type } = defineProps(['text', 'title', 'type']);
</script>
