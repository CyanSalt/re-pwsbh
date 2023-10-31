<script lang="ts" setup>
import bgm from '../assets/audio.mp3'

function handleTimeUpdate(event: Event) {
  const target = event.target as HTMLAudioElement
  worldBridge.syncTime(target.currentTime)
}
</script>

<template>
  <div class="main-frame">
    <audio :src="bgm" autoplay @timeupdate="handleTimeUpdate"></audio>
  </div>
</template>
