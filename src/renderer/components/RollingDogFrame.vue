<script lang="ts" setup>
import { watchEffect } from 'vue'
import cross from '../assets/cross.png'
import dogWalk1 from '../assets/dog-walk-1.png'
import dogWalk2 from '../assets/dog-walk-2.png'
import rollingDog from '../assets/rolling-dog.png'

let background = $ref(dogWalk1)
let turn = $ref(0)

const backgroundStyle = $computed(() => `url('${background}')`)
const transform = $computed(() => `rotate(${turn}turn)`)

let isRolling = false

function roll() {
  if (isRolling) {
    background = rollingDog
    turn = (turn + 0.25) % 1
  } else {
    turn = 0
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
let lastPosition = 1000
const sustainLength = 58

worldBridge.keyframes.once('keyframe-from-172', () => {
  worldBridge.toggleVisibility(false)
})

worldBridge.keyframes.once('keyframe-811', () => {
  new Notification('风力实在是太强了！', {
    body: '我整条狗都快被吹飞了！',
    icon: cross,
  })
})

worldBridge.keyframes.once('keyframe-from-811', () => {
  worldBridge.toggleVisibility(false)
})

worldBridge.keyframes.once('keyframe-990', () => {
  new Notification('风力实在是太强了！', {
    body: '我整条狗都快被吹飞了！',
    icon: cross,
  })
})

worldBridge.keyframes.once('keyframe-from-990', () => {
  worldBridge.toggleVisibility(false)
})

worldBridge.onPlay(frame => {
  // Also see src/main/window.ts
  if (frame >= 990) {
    worldBridge.keyframes.emit('keyframe-990')
    startFrame = 990
    lastPosition = 1450
  } else if (frame >= 811) {
    worldBridge.keyframes.emit('keyframe-811')
    startFrame = 811
    lastPosition = 1450
  } else if (frame >= 172) {
    startFrame = 172
    lastPosition = 1000
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
    isRolling = false
    if (startFrame === 172) {
      worldBridge.keyframes.emit('keyframe-from-172')
    } else if (startFrame === 811) {
      worldBridge.keyframes.emit('keyframe-from-811')
    } else if (startFrame === 990) {
      worldBridge.keyframes.emit('keyframe-from-990')
    }
  }
})
</script>

<template>
  <div class="rolling-dog-frame">
    <img :src="dogWalk1" class="offscreen-image">
    <img :src="dogWalk2" class="offscreen-image">
    <img :src="rollingDog" class="offscreen-image">
    <img :src="cross" class="offscreen-image">
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
