<script lang="ts" setup>
import bgm from '../assets/audio.mp3'

function handleStart() {
  worldBridge.syncTime(0)
}

function handleTimeUpdate(event: Event) {
  const target = event.target as HTMLAudioElement
  worldBridge.syncTime(target.currentTime)
}
</script>

<template>
  <div class="main-frame">
    <audio :src="bgm" autoplay @play="handleStart" @timeupdate="handleTimeUpdate"></audio>
  </div>
</template>
