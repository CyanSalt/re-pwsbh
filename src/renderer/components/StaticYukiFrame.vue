<script lang="ts" setup>
import jumpDown from '../assets/jump-down.png'
import jumpUp from '../assets/jump-up.png'

let background = $ref(jumpUp)

const backgroundStyle = $computed(() => `url('${background}')`)

let endFrame = 269

worldBridge.keyframes.once('keyframe-to-269', () => {
  worldBridge.toggleVisibility(false)
})

worldBridge.onPlay(frame => {
  if (frame <= endFrame) {
    background = (frame / 8) % 2 === 1 ? jumpUp : jumpDown
  } else {
    worldBridge.keyframes.emit('keyframe-to-269')
  }
})
</script>

<template>
  <div class="static-yuki-frame">
    <img :src="jumpDown" class="offscreen-image">
    <img :src="jumpUp" class="offscreen-image">
  </div>
</template>

<style lang="scss" scoped>
.static-yuki-frame {
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
