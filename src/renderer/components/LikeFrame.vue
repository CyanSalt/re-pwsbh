<script lang="ts" setup>
import iconCoined from '../assets/icon-coined.png'
import iconCollected from '../assets/icon-collected.png'
import iconLiked from '../assets/icon-liked.png'
</script>

<template>
  <div class="like-frame">
    <img :src="iconLiked" class="like-icon">
    <img :src="iconCoined" class="like-icon">
    <img :src="iconCollected" class="like-icon">
  </div>
</template>

<style lang="scss" scoped>
.like-frame {
  display: flex;
  gap: 70px;
  justify-content: center;
  align-items: center;
}
.like-icon {
  width: 152px;
  height: 169px;
  object-fit: contain;
  object-position: center;
}
</style>
