<script lang="ts" setup>
import AhhhhFrame from './AhhhhFrame.vue'
import BackgroundFrame from './BackgroundFrame.vue'
import BlackBirdFrame from './BlackBirdFrame.vue'
import ClappingYukiFrame from './ClappingYukiFrame.vue'
import ErrorFrame from './ErrorFrame.vue'
import FightingFrame from './FightingFrame.vue'
import JumpingYukiFrame from './JumpingYukiFrame.vue'
import MainFrame from './MainFrame.vue'
import PeekingPigeonFrame from './PeekingPigeonFrame.vue'
import RollingDogFrame from './RollingDogFrame.vue'
import StaticPigeonFrame from './StaticPigeonFrame.vue'
import StaticYukiFrame from './StaticYukiFrame.vue'
import WalkingDogFrame from './WalkingDogFrame.vue'
import WalkingYukiFrame from './WalkingYukiFrame.vue'
import WhiteBirdFrame from './WhiteBirdFrame.vue'

function getCurrentComponent() {
  switch (worldBridge.name) {
    case 'main-frame':
      return MainFrame
    case 'background-frame':
      return BackgroundFrame
    case 'jumping-yuki-frame':
      return JumpingYukiFrame
    case 'walking-dog-frame':
      return WalkingDogFrame
    case 'rolling-dog-frame':
      return RollingDogFrame
    case 'clapping-yuki-frame':
      return ClappingYukiFrame
    case 'peeking-pigeon-frame':
      return PeekingPigeonFrame
    case 'static-yuki-frame':
      return StaticYukiFrame
    case 'black-bird-frame':
      return BlackBirdFrame
    case 'white-bird-frame':
      return WhiteBirdFrame
    case 'walking-yuki-frame':
      return WalkingYukiFrame
    case 'static-pigeon-frame':
      return StaticPigeonFrame
    case 'fighting-frame':
      return FightingFrame
    case 'ahhhh-frame':
      return AhhhhFrame
    case 'error-frame':
      return ErrorFrame
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
  font-display: block;
}
.app-frame {
  width: 100vw;
  height: 100vh;
}
</style>
