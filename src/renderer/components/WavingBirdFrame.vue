<script lang="ts" setup>
import blackBirdWave1 from '../assets/black-bird-wave-1.png'
import blackBirdWave2 from '../assets/black-bird-wave-2.png'
import whiteBirdWave1 from '../assets/white-bird-wave-1.png'
import whiteBirdWave2 from '../assets/white-bird-wave-2.png'

const birdWave1 = worldBridge.params === 'white' ? whiteBirdWave1 : blackBirdWave1
const birdWave2 = worldBridge.params === 'white' ? whiteBirdWave2 : blackBirdWave2

let background = $ref(birdWave1)
let turn = $ref(0)

const backgroundStyle = $computed(() => `url('${background}')`)
const transform = $computed(() => `rotateY(${turn}turn)`)

let endFrame = 1806

worldBridge.keyframes.once('keyframe-to-1806', () => {
  worldBridge.toggleVisibility(false)
})

worldBridge.keyframes.once('keyframe-to-2122', () => {
  worldBridge.toggleVisibility(false)
})

worldBridge.keyframes.once('keyframe-to-2485', () => {
  worldBridge.toggleVisibility(false)
})

worldBridge.onPlay(frame => {
  // Also see src/main/window.ts
  if (frame >= 2439) {
    endFrame = 2485
  } else if (frame >= 2099) {
    endFrame = 2122
  } else if (frame >= 1685) {
    endFrame = 1806
  }
  if (frame <= endFrame) {
    const magicNumber = frame % 40
    if (magicNumber < 10) {
      background = birdWave1
      turn = 0
    } else if (magicNumber >= 10 && magicNumber < 20) {
      background = birdWave2
      turn = 0
    } else if (magicNumber >= 20 && magicNumber < 30) {
      background = birdWave1
      turn = 0.5
    } else if (magicNumber >= 30 && magicNumber < 40) {
      background = birdWave2
      turn = 0.5
    }
  } else {
    if (endFrame === 1806) {
      worldBridge.keyframes.emit('keyframe-to-1806')
    } else if (endFrame === 2122) {
      worldBridge.keyframes.emit('keyframe-to-2122')
    } else if (endFrame === 2485) {
      worldBridge.keyframes.emit('keyframe-to-2485')
    }
  }
})
</script>

<template>
  <div class="waving-bird-frame">
    <img :src="blackBirdWave1" class="offscreen-image">
    <img :src="blackBirdWave2" class="offscreen-image">
    <img :src="whiteBirdWave1" class="offscreen-image">
    <img :src="whiteBirdWave2" class="offscreen-image">
  </div>
</template>

<style lang="scss" scoped>
.waving-bird-frame {
  background-image: v-bind('backgroundStyle');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  transform: v-bind('transform');
}
.offscreen-image {
  position: absolute;
  opacity: 0;
}
</style>
