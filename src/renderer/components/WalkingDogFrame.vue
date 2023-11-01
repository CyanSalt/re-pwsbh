<script lang="ts" setup>
import dogWalk1 from '../assets/dog-walk-1.png'
import dogWalk2 from '../assets/dog-walk-2.png'

let background = $ref(dogWalk1)

const backgroundStyle = $computed(() => `url('${background}')`)

worldBridge.onPlay(frame => {
  const magicNumber = frame % 6
  background = magicNumber < 3 ? dogWalk1 : dogWalk2
})
</script>

<template>
  <div class="walking-dog-frame">
    <img :src="dogWalk1" class="offscreen-image">
    <img :src="dogWalk2" class="offscreen-image">
  </div>
</template>

<style lang="scss" scoped>
.walking-dog-frame {
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
