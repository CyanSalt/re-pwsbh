<script lang="ts" setup>
import cuttingYuki from '../assets/cutting-yuki.png'

let background = $ref(cuttingYuki)

const backgroundStyle = $computed(() => `url('${background}')`)
</script>

<template>
  <div class="cutting-yuki-frame">
    <img :src="cuttingYuki" class="offscreen-image">
  </div>
</template>

<style lang="scss" scoped>
.cutting-yuki-frame {
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
