<script lang="ts" setup>
import jumpDown from '../assets/jump-down.png'
import jumpUp from '../assets/jump-up.png'

let background = $ref(jumpUp)

const backgroundStyle = $computed(() => `url('${background}')`)

let endFrame = 269

worldBridge.keyframes.once('keyframe-to-269', () => {
  worldBridge.toggleVisibility(false)
})

worldBridge.keyframes.once('keyframe-to-1486', () => {
  worldBridge.toggleVisibility(false)
})

worldBridge.keyframes.once('keyframe-to-2141', () => {
  worldBridge.toggleVisibility(false)
})

worldBridge.keyframes.once('keyframe-to-2400', () => {
  worldBridge.toggleVisibility(false)
})

worldBridge.onPlay(frame => {
  // Also see src/main/window.ts
  if (frame >= 2368) {
    endFrame = 2400
  } else if (frame >= 2061) {
    endFrame = 2141
  } else if (frame >= 1452) {
    endFrame = 1486
  } else if (frame >= 234) {
    endFrame = 269
  }
  if (frame <= endFrame) {
    background = Math.floor(frame / 8) % 2 === 1 ? jumpUp : jumpDown
  } else {
    if (endFrame === 269) {
      worldBridge.keyframes.emit('keyframe-to-269')
    } else if (endFrame === 1486) {
      worldBridge.keyframes.emit('keyframe-to-1486')
    } else if (endFrame === 2141) {
      worldBridge.keyframes.emit('keyframe-to-2141')
    } else if (endFrame === 2400) {
      worldBridge.keyframes.emit('keyframe-to-2400')
    }
  }
})
</script>

<template>
  <div class="static-yuki-frame">
    <img :src="jumpDown" class="offscreen-image">
    <img :src="jumpUp" class="offscreen-image">
  </div>
</template>

<style lang="scss" scoped>
.static-yuki-frame {
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
