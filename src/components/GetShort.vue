<template>
  <v-container class="fill-height">
    <v-responsive
      class="align-centerfill-height mx-auto"
      max-width="900"
    >

    <v-img
      v-show="state.signURL"
      :width="900"
      cover
      :src="state.signURL"
    >
      <template v-slot:placeholder>
        <div class="d-flex align-center justify-center fill-height">
          <v-progress-circular
            color="grey-lighten-4"
            indeterminate
          ></v-progress-circular>
        </div>
      </template>
    </v-img>
    </v-responsive>
  </v-container>
</template>

<script setup>
import { defineProps, reactive, onMounted } from 'vue'
const { shortId } = defineProps(['shortId']);

const state = reactive({
  signURL: "",
})

onMounted(async ()=> {
  const regex = /^[0-9a-zA-Z]{7}$/g;
  const found = shortId.match(regex);
  if (!found) {
    state.signURL = "/cloud-ace.png"
    return
  }
  try {
    const response = await fetch(import.meta.env.VITE_APP_API_HOST + 'api/v1/file/' + shortId, {
      method: "GET",
    });
    const object = await response.json()
    state.signURL = object.signURL
  } catch (error) {
    state.signURL ="/cloud-ace.png"
  }
})
</script>
