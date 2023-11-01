<script lang="ts" setup>
import { watchEffect } from 'vue'
import blackBird1 from '../assets/black-bird-1.png'
import blackBird2 from '../assets/black-bird-2.png'

const yellowColor = '#fed851'
const blueColor = '#62bff7'

let backgroundColor = $ref(yellowColor)
let background = $ref(blackBird1)

const backgroundStyle = $computed(() => `url('${background}')`)

let hittingStartedAt = 0
let hittingOffset = 0
let hittingInterval = 0
let hittingIndex = 0

const hittingFrame = [7, 11, 20, 28, 34, 45, 50, 59, 67, 73]

const sleep = (timeout: number) => new Promise(resolve => setTimeout(resolve, timeout))

async function hit(timestamp: number) {
  if (hittingIndex < 10) {
    const frames = Math.round((timestamp - hittingStartedAt) / hittingInterval)
    if (frames >= hittingFrame[hittingIndex] + hittingOffset) {
      background = blackBird2
      hittingIndex += 1
      await sleep(50)
      background = blackBird1
    }
  }
  requestAnimationFrame(hit)
}

watchEffect(() => {
  requestAnimationFrame(hit)
})

worldBridge.keyframes.once('keyframe-319', () => {
  hittingIndex = 0
  hittingStartedAt = performance.now()
})

worldBridge.keyframes.once('keyframe-390', () => {
  hittingIndex = 0
  hittingStartedAt = performance.now()
})

worldBridge.keyframes.once('keyframe-467', () => {
  hittingIndex = 0
  hittingStartedAt = performance.now()
})

worldBridge.keyframes.once('keyframe-542', () => {
  hittingIndex = 0
  hittingStartedAt = performance.now()
})

worldBridge.keyframes.once('keyframe-619', () => {
  worldBridge.toggleVisibility(false)
})

worldBridge.onPlay((frame, interval) => {
  if (frame >= 619) {
    worldBridge.keyframes.emit('keyframe-619')
  } else if (frame >= 542) {
    worldBridge.keyframes.emit('keyframe-542')
    backgroundColor = blueColor
    hittingOffset = 0
    hittingInterval = interval
  } else if (frame >= 467) {
    worldBridge.keyframes.emit('keyframe-467')
    backgroundColor = yellowColor
    hittingOffset = 0
    hittingInterval = interval
  } else if (frame >= 390) {
    worldBridge.keyframes.emit('keyframe-390')
    backgroundColor = blueColor
    hittingOffset = 0
    hittingInterval = interval
  } else if (frame >= 319) {
    worldBridge.keyframes.emit('keyframe-319')
    backgroundColor = yellowColor
    hittingOffset = -4
    hittingInterval = interval
  }
})
</script>

<template>
  <div class="black-bird-frame">
    <img :src="blackBird1" class="offscreen-image">
    <img :src="blackBird2" class="offscreen-image">
  </div>
</template>

<style lang="scss" scoped>
.black-bird-frame {
  background-image: v-bind('backgroundStyle');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: v-bind('backgroundColor');
}
.offscreen-image {
  position: absolute;
  opacity: 0;
}
</style>
