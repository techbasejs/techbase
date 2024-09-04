<template>
  <header></header>

  <main>
    <div>
      <h2>Video Player</h2>
      <div v-if="videoInfo">
        <p>Title: {{ videoInfo.title }}</p>
        <p>Duration: {{ videoInfo.duration }}</p>
        <p>Resolution: {{ videoInfo.resolution }}</p>
      </div>
      <button
        @click="
          {
            playVideo;
          }
        "
      >
        Play
      </button>
    </div>
  </main>
</template>

<script setup lang="ts">
import { initializePlayer, playVideo, getVideoInfo } from "@simm-player/core";
import { onMounted, ref } from "vue";

const videoInfo = ref(getVideoInfo());

onMounted(() => {
  initializePlayer();
});
</script>
<style scoped></style>
