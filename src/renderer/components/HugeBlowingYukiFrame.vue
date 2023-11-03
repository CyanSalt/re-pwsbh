<script lang="ts" setup>
import hugeBlow1 from '../assets/huge-blow-1.png'
import hugeBlow2 from '../assets/huge-blow-2.png'

let background = $ref(hugeBlow1)

const backgroundStyle = $computed(() => `url('${background}')`)

const endFrame = 1831

worldBridge.keyframes.once('keyframe-to-1831', () => {
  worldBridge.toggleVisibility(false)
})

worldBridge.onPlay(frame => {
  if (frame >= 1820) {
    background = hugeBlow2
  }
  if (frame < endFrame) {
    const magicNumber = Math.floor((Math.random() - 0.5) * 80)
    const magicNumber2 = Math.floor((Math.random() - 0.5) * 80)
    worldBridge.moveTo({
      x: worldBridge.initialPosition.x + magicNumber,
      y: worldBridge.initialPosition.y + magicNumber2,
    })
  } else {
    worldBridge.keyframes.emit('keyframe-to-1831')
  }
})
</script>

<template>
  <div class="huge-blowing-yuki-frame">
    <img :src="hugeBlow1" class="offscreen-image">
    <img :src="hugeBlow2" class="offscreen-image">
  </div>
</template>

<style lang="scss" scoped>
.huge-blowing-yuki-frame {
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
