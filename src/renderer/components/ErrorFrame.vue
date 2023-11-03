<script lang="ts" setup>
import error from '../assets/error.png'

let background = error

const backgroundStyle = $computed(() => `url('${background}')`)
</script>

<template>
  <div class="error-frame">
    <img :src="error" class="offscreen-image">
  </div>
</template>

<style lang="scss" scoped>
.error-frame {
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
