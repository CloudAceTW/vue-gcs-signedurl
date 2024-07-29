<template>
  <GetShort
    :shortId="$route.params.shortId"
  />
</template>

<script setup>
import { defineComponent } from 'vue'
import GetShort from '@/components/GetShort.vue'

defineComponent({
  name: 'ShortIndex',
  components: {
    GetShort,
  }
})
</script>
