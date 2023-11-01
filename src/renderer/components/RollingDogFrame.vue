<script lang="ts" setup>
import { watchEffect } from 'vue'
import dogWalk1 from '../assets/dog-walk-1.png'
import dogWalk2 from '../assets/dog-walk-2.png'
import rollingDog from '../assets/rolling-dog.png'

let background = $ref(dogWalk1)
let turn = $ref(0)

const backgroundStyle = $computed(() => `url('${background}')`)
const transform = $computed(() => `rotate(${turn}turn)`)

let isRolling = false

function roll() {
  if (!isRolling) return
  background = rollingDog
  turn += 0.25
  while (turn >= 1) {
    turn -= 1
  }
}

watchEffect(onInvalidate => {
  const timer = setInterval(() => {
    roll()
  }, 100 + 8)
  onInvalidate(() => {
    clearInterval(timer)
  })
})

let startFrame = 172
let lastPosition = $ref(1000)
const sustainLength = 58

const willShowMessage = $computed(() => lastPosition > 1000)

worldBridge.keyframes.once('keyframe-from-172', () => {
  worldBridge.toggleVisibility(false)
})

worldBridge.onPlay(frame => {
  // Also see src/main/window.ts
  if (frame >= 172) {
    startFrame = 172
  }

  if (frame < startFrame + sustainLength - 30) {
    const magicNumber = frame % 6
    background = magicNumber < 3 ? dogWalk1 : dogWalk2
  } else {
    isRolling = true
  }
  if (frame <= startFrame + sustainLength) {
    const magicNumber = (frame - startFrame) / sustainLength
    worldBridge.moveTo({
      x: worldBridge.initialPosition.x + Math.round(magicNumber * lastPosition),
    })
  } else {
    if (startFrame === 172) {
      worldBridge.keyframes.emit('keyframe-from-172')
    }
  }
})
</script>

<template>
  <div class="rolling-dog-frame">
    <img :src="dogWalk1" class="offscreen-image">
    <img :src="dogWalk2" class="offscreen-image">
    <img :src="rollingDog" class="offscreen-image">
  </div>
</template>

<style lang="scss" scoped>
.rolling-dog-frame {
  position: relative;
  background-color: rgb(254 216 81);
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: v-bind('backgroundStyle');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    transform: v-bind('transform');
  }
}
.offscreen-image {
  position: absolute;
  opacity: 0;
}
</style>
