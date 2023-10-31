<script lang="ts" setup>
import bgm from '../assets/audio.mp3'

let startedAt = 0
let timeOffset = 0

function sync(timestamp: number) {
  worldBridge.syncTime((timestamp - startedAt) / 1000 + timeOffset)
  requestAnimationFrame(sync)
}

function handleStart() {
  startedAt = performance.now()
  requestAnimationFrame(sync)
}

function handleTimeUpdate(event: Event) {
  const target = event.target as HTMLAudioElement
  // worldBridge.syncTime(target.currentTime)
  timeOffset = (performance.now() - startedAt) / 1000 - target.currentTime
}
</script>

<template>
  <div class="main-frame">
    <audio :src="bgm" autoplay @play="handleStart" @timeupdate="handleTimeUpdate"></audio>
  </div>
</template>
