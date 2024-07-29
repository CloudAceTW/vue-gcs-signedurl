<template>
  <SignUrl />
</template>

<script setup>
import { defineComponent } from 'vue'
import SignUrl from '@/components/SignUrl.vue'

defineComponent({
  name: 'SignUrlIndex',
  components: {
    SignUrl,
  }
})
</script>
