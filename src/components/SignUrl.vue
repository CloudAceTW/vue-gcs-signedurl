<template>
<div>
  <v-container class="fill-height">
    <v-responsive
      class="align-centerfill-height mx-auto"
      max-width="900"
    >
      <div class="text-left">
        <h1>CloudAce SignUrl</h1>
      </div>
      <div class="py-4" />
      <v-btn
        v-on:click="readyToUpload()"
        :disabled="state.readyToUpload"
        color="indigo-darken-4"
      >
        Ready to Upload
      </v-btn>
      <div class="py-4" />
      <v-row>
        <v-col cols="12">
            <AlertMsg
              v-for="errorKey in state.showAlerts"
              :key="errorKey"
              title="Someting Wrong"
              text="Please try again"
              type="error"
              class="mb-4"
            />
        </v-col>
        <v-col cols="12">
          <div v-show="state.readyToUpload">
            <v-card
              class="py-4"
              color="grey-darken-3"
              rounded="lg"
              variant="elevated"
              :disabled="!state.readyToUpload"
            >
              <template #title>
                <h2 class="text-h5 font-weight-bold">Upload File</h2>
              </template>

              <template #text>
                <v-row v-show="!state.isUploading">
                  <v-col cols="12">
                    <v-file-input
                      v-model="state.file"
                      :clearable="true"
                      label="File input"
                      variant="outlined">
                    </v-file-input>
                  </v-col>
                  <v-col class="text-right">
                    <v-btn
                      color="indigo-darken-4"
                      :disabled="!state.file"
                      v-on:click="uploadToGcs()"
                    >
                      Submit
                    </v-btn>
                  </v-col>
                </v-row>
                <v-row v-show="state.isUploading">
                  <v-progress-linear
                    color="indigo-darken-4"
                    indeterminate
                  ></v-progress-linear>
                </v-row>
              </template>
            </v-card>
          </div>
        </v-col>
        <v-col cols="12">
          <div v-show="state.shortIDs.length > 0">
            <v-card
              class="py-4"
              color="grey-darken-3"
              rounded="lg"
              variant="elevated"
            >
              <template #text>
                <v-list lines="two">
                  <v-list-item
                    class="text-h3 font-weight-bold"
                    v-for="shortID in state.shortIDs"
                    :key="shortID"
                  >
                    <template #title>
                      <a :href="makeLink(shortID)" target="_blank">
                        {{ makeLink(shortID) }}
                      </a>
                    </template>
                  </v-list-item>
                </v-list>
              </template>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</div>
</template>

<script setup>
import { defineComponent, reactive } from 'vue'
import AlertMsg from '@/components/AlertMsg.vue'

  defineComponent({
    name: 'SignUrl',
    components: {
      AlertMsg,
    }
  })

  const state = reactive({
    postSignURL: "",
    uploadKey: "",
    readyToUpload: false,
    isUploading: false,
    shortIDs: [],
    file: null,
    showAlerts: [],
  })

  const readyToUpload = async () => {
    await getSignURL()
    state.readyToUpload = true
  }

  const getSignURL = async () => {
    fetch(import.meta.env.VITE_APP_API_HOST + 'api/v1/upload', {
      method: 'GET'
    })
    .then(function (response) {
      return response.json()
    })
    .then(function (object) {
      state.postSignURL = object.postSignURL
      state.uploadKey = object.key
    })
  }

  const uploadToGcs = async () => {
    let file = state.file
    state.isUploading = true
    try {
      await fetch(state.postSignURL, {
        method: "PUT",
        body: file,
      });
    } catch (error) {
      state.showAlerts.push(state.key)
      resetUpload()
      return
    }
    await postUploadDone()
  }

  const postUploadDone = async () => {
    let bodyObject = {
      key: state.uploadKey,
    }
    try {
      const response = await fetch(import.meta.env.VITE_APP_API_HOST + 'api/v1/upload/done', {
        method: "POST",
        body: JSON.stringify(bodyObject),
      });
      const object = await response.json()
      state.shortIDs.push(object.id)
      resetUpload()
    } catch (error) {
      state.showAlerts.push(state.key)
      resetUpload()
    }
  }

  const resetUpload = () => {
    state.readyToUpload = false
    state.isUploading = false
    state.file = null
  }

  const makeLink = (shortID) => {
    return import.meta.env.VITE_APP_HOST + shortID
  }
</script>
