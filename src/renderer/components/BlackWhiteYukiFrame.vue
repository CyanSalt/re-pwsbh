<script lang="ts" setup>
import blackWhiteYuki from '../assets/black-white-yuki.png'

let background = blackWhiteYuki

const backgroundStyle = $computed(() => `url('${background}')`)
</script>

<template>
  <div class="black-white-yuki-frame">
    <img :src="blackWhiteYuki" class="offscreen-image">
  </div>
</template>

<style lang="scss" scoped>
.black-white-yuki-frame {
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
