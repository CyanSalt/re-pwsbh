<script lang="ts" setup>
import ahhhh from '../assets/ahhhh.png'

let background = $ref(ahhhh)

const backgroundStyle = $computed(() => `url('${background}')`)
</script>

<template>
  <div class="ahhhh-frame">
    <img :src="ahhhh" class="offscreen-image">
  </div>
</template>

<style lang="scss" scoped>
.ahhhh-frame {
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
