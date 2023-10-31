<script lang="ts" setup>
import BackgroundFrame from './BackgroundFrame.vue'
import JumpingYukiFrame from './JumpingYukiFrame.vue'
import MainFrame from './MainFrame.vue'

function getCurrentComponent() {
  switch (worldBridge.args[0]) {
    case 'main-frame':
      return MainFrame
    case 'background-frame':
      return BackgroundFrame
    case 'jumping-yuki-frame':
      return JumpingYukiFrame
  }
}

const currentComponent = getCurrentComponent()
</script>

<template>
  <component :is="currentComponent" class="app-frame"></component>
</template>

<style lang="scss" scoped>
:global(body) {
  margin: 0;
}
@font-face {
  font-family: 'Text';
  src: url('../assets/font.ttf') format('truetype');
}
.app-frame {
  width: 100vw;
  height: 100vh;
}
</style>
