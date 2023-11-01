<script lang="ts" setup>
import greyPigeon from '../assets/grey-pigeon.png'
import whitePigeon from '../assets/white-pigeon.png'

const background = worldBridge.params === 'white' ? whitePigeon : greyPigeon

const backgroundStyle = $computed(() => `url('${background}')`)

worldBridge.keyframes.once('keyframe-1184', () => {
  worldBridge.toggleVisibility(false)
})

worldBridge.onPlay(frame => {
  if (frame >= 1184) {
    worldBridge.keyframes.emit('keyframe-1184')
  }
})
</script>

<template>
  <div class="static-pigeon-frame">
    <img :src="greyPigeon" class="offscreen-image">
    <img :src="whitePigeon" class="offscreen-image">
  </div>
</template>

<style lang="scss" scoped>
.static-pigeon-frame {
  background-image: v-bind('backgroundStyle');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: rgb(254 216 81);
}
.offscreen-image {
  position: absolute;
  opacity: 0;
}
</style>
