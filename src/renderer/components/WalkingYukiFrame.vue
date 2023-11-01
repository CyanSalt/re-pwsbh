<script lang="ts" setup>
import { watchEffect } from 'vue'
import walk1 from '../assets/walk-1.png'
import walk2 from '../assets/walk-2.png'
import walk3 from '../assets/walk-3.png'
import walk4 from '../assets/walk-4.png'

let walkingState = $ref(0)

const background = $computed(() => {
  switch (walkingState % 4) {
    case 0: return walk1
    case 1: return walk2
    case 2: return walk3
    case 3:
    default: return walk4
  }
})

const backgroundStyle = $computed(() => `url('${background}')`)

watchEffect(onInvalidate => {
  const timer = setInterval(() => {
    walkingState = (walkingState + 1) % 4
  }, 430)
  onInvalidate(() => {
    clearInterval(timer)
  })
})

let startFrame = 619
let endFrame = 1151
let lastPosition = 300

worldBridge.keyframes.once('keyframe-to-1151', () => {
  worldBridge.toggleVisibility(false)
})

worldBridge.onPlay(frame => {
  // Also see src/main/window.ts
  if (frame >= 619) {
    startFrame = 619
    endFrame = 1151
    lastPosition = 300
  }
  if (frame <= endFrame) {
    const sustainLength = endFrame - startFrame
    const magicNumber = (frame - startFrame) / sustainLength
    worldBridge.moveTo({
      x: worldBridge.initialPosition.x - Math.round(magicNumber * lastPosition),
    })
  } else {
    if (endFrame === 1151) {
      worldBridge.keyframes.emit('keyframe-to-1151')
    }
  }
})
</script>

<template>
  <div class="jumping-yuki-frame">
    <img :src="walk1" class="offscreen-image">
    <img :src="walk2" class="offscreen-image">
    <img :src="walk3" class="offscreen-image">
    <img :src="walk4" class="offscreen-image">
  </div>
</template>

<style lang="scss" scoped>
.jumping-yuki-frame {
  background-image: v-bind('backgroundStyle');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
.offscreen-image {
  position: absolute;
  opacity: 0;
}
</style>
