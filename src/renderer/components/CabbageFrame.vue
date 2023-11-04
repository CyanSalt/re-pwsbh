<script lang="ts" setup>
import { watch } from 'vue'
import cabbageCut from '../assets/cabbage-cut.png'
import cabbageFull from '../assets/cabbage-full.png'

let background = $ref(cabbageFull)

const backgroundStyle = $computed(() => `url('${background}')`)

let isClicked = $ref(false)

function cut() {
  background = cabbageCut
  isClicked = true
}

worldBridge.keyframes.once('keyframe-to-end', () => {
  worldBridge.toggleVisibility(false)
})

const sleep = (timeout: number) => new Promise(resolve => setTimeout(resolve, timeout))

watch($$(isClicked), async value => {
  if (value) {
    let opacity = 1
    while (opacity >= 0.05) {
      opacity -= 0.02
      worldBridge.setOpacity(opacity)
      await sleep(10)
    }
    worldBridge.keyframes.emit('keyframe-to-end')
  }
})

const startFrame = worldBridge.params as number
const endFrame = 1685

worldBridge.onPlay(frame => {
  if (frame <= endFrame) {
    if (frame > startFrame + 5) {
      cut()
    }
  } else {
    worldBridge.keyframes.emit('keyframe-to-end')
  }
})
</script>

<template>
  <div class="cabbage-frame" @click="cut">
    <img :src="cabbageFull" class="offscreen-image">
    <img :src="cabbageCut" class="offscreen-image">
  </div>
</template>

<style lang="scss" scoped>
.cabbage-frame {
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
