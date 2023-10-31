<script lang="ts" setup>
import BackgroundFrame from './BackgroundFrame.vue'
import MainFrame from './MainFrame.vue'

function getCurrentComponent() {
  switch (worldBridge.args[0]) {
    case 'main-frame':
      return MainFrame
    case 'background-frame':
      return BackgroundFrame
  }
}

const currentComponent = getCurrentComponent()
</script>

<template>
  <component :is="currentComponent"></component>
</template>

<style lang="scss" scoped>
:global(body) {
  margin: 0;
}
@font-face {
  font-family: 'Text';
  src: url('../assets/font.ttf') format('truetype');
}
</style>
