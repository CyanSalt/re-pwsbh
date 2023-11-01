<script lang="ts" setup>
import whiteBird1 from '../assets/white-bird-1.png'
import whiteBird2 from '../assets/white-bird-2.png'

const yellowColor = '#fed851'
const blueColor = '#62bff7'

let backgroundColor = $ref(yellowColor)
let background = $ref(whiteBird1)

const backgroundStyle = $computed(() => `url('${background}')`)

const sleep = (timeout: number) => new Promise(resolve => setTimeout(resolve, timeout))

async function hit() {
  background = whiteBird2
  await sleep(70)
  background = whiteBird1
}

worldBridge.keyframes.once('keyframe-390', () => {
  hit()
})

worldBridge.keyframes.once('keyframe-467', () => {
  hit()
})

worldBridge.keyframes.once('keyframe-542', () => {
  hit()
})

worldBridge.keyframes.once('keyframe-619', () => {
  worldBridge.toggleVisibility(false)
})

worldBridge.onPlay(frame => {
  if (frame >= 619) {
    worldBridge.keyframes.emit('keyframe-619')
  } else if (frame >= 542) {
    worldBridge.keyframes.emit('keyframe-542')
    backgroundColor = blueColor
  } else if (frame >= 467) {
    worldBridge.keyframes.emit('keyframe-467')
    backgroundColor = yellowColor
  } else if (frame >= 390) {
    worldBridge.keyframes.emit('keyframe-390')
    backgroundColor = blueColor
  }
})
</script>

<template>
  <div class="white-bird-frame">
    <img :src="whiteBird1" class="offscreen-image">
    <img :src="whiteBird2" class="offscreen-image">
  </div>
</template>

<style lang="scss" scoped>
.white-bird-frame {
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
