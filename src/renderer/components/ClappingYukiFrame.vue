<script lang="ts" setup>
import yukiClap1 from '../assets/yuki-clap-1.png'
import yukiClap2 from '../assets/yuki-clap-2.png'

let background = $ref(yukiClap1)

const backgroundStyle = $computed(() => `url('${background}')`)

let startFrame = 69
const sustainLength = 18

worldBridge.keyframes.once('keyframe-magic-69', () => {
  worldBridge.toggleVisibility(false)
})

worldBridge.keyframes.once('keyframe-magic-220', () => {
  worldBridge.toggleVisibility(false)
})

worldBridge.onPlay(frame => {
  const magicNumber = frame % 4
  background = magicNumber < 2 ? yukiClap1 : yukiClap2

  // Also see src/main/window.ts
  if (frame >= 220) {
    startFrame = 220
  } else if (frame >= 69) {
    startFrame = 69
  }

  const magicNumber2 = (frame - startFrame) / sustainLength
  if (magicNumber2 <= 0.949999988079071) {
    const magicNumber3 = Math.abs(0 - Math.pow(-Math.E * magicNumber2 * Math.log(magicNumber2), 0.4))
    worldBridge.moveTo({
      x: worldBridge.initialPosition.x - worldBridge.initialSize.width,
      y: worldBridge.initialPosition.y - magicNumber3 * worldBridge.initialSize.height,
    })
  } else {
    if (startFrame === 69) {
      worldBridge.keyframes.emit('keyframe-magic-69')
    } else if (startFrame === 220) {
      worldBridge.keyframes.emit('keyframe-magic-220')
    }
  }
})
</script>

<template>
  <div class="clapping-yuki-frame">
    <img :src="yukiClap1" class="offscreen-image">
    <img :src="yukiClap2" class="offscreen-image">
  </div>
</template>

<style lang="scss" scoped>
.clapping-yuki-frame {
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
