<script lang="ts" setup>
import fight1 from '../assets/fight-1.png'
import fight2 from '../assets/fight-2.png'
import fight3 from '../assets/fight-3.png'

let background = $ref(fight1)

const backgroundStyle = $computed(() => `url('${background}')`)

const endFrame = 1211

worldBridge.keyframes.once('keyframe-to-1211', () => {
  worldBridge.toggleVisibility(false)
})

worldBridge.onPlay(frame => {
  if (frame <= endFrame) {
    const magicNumber = frame % 6
    background = magicNumber < 2 ? fight1 : (magicNumber < 4 ? fight2 : fight3)
  } else {
    worldBridge.keyframes.emit('keyframe-to-1211')
  }
})
</script>

<template>
  <div class="fighting-frame">
    <img :src="fight1" class="offscreen-image">
    <img :src="fight2" class="offscreen-image">
    <img :src="fight3" class="offscreen-image">
  </div>
</template>

<style lang="scss" scoped>
.fighting-frame {
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
