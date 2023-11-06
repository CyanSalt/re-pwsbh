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
  })
})

worldBridge.keyframes.once('keyframe-from-811', () => {
  worldBridge.toggleVisibility(false)
})

worldBridge.keyframes.once('keyframe-990', () => {
  new Notification('风力实在是太强了！', {
    body: '我整条狗都快被吹飞了！',
  })
})

worldBridge.keyframes.once('keyframe-from-990', () => {
  worldBridge.toggleVisibility(false)
})

worldBridge.keyframes.once('keyframe-from-1391', () => {
  worldBridge.toggleVisibility(false)
})

worldBridge.keyframes.once('keyframe-from-1395', () => {
  worldBridge.toggleVisibility(false)
})

worldBridge.keyframes.once('keyframe-from-1989', () => {
  worldBridge.toggleVisibility(false)
})

worldBridge.keyframes.once('keyframe-from-1993', () => {
  worldBridge.toggleVisibility(false)
})

worldBridge.keyframes.once('keyframe-from-1997', () => {
  worldBridge.toggleVisibility(false)
})

worldBridge.keyframes.once('keyframe-from-2305', () => {
  worldBridge.toggleVisibility(false)
})

worldBridge.keyframes.once('keyframe-from-2309', () => {
  worldBridge.toggleVisibility(false)
})

worldBridge.keyframes.once('keyframe-from-2313', () => {
  worldBridge.toggleVisibility(false)
})

worldBridge.keyframes.once('keyframe-from-2317', () => {
  worldBridge.toggleVisibility(false)
})

worldBridge.keyframes.once('keyframe-2405', () => {
  new Notification('风力实在是太强了！', {
    body: '我整条狗都快被吹飞了！',
  })
})

worldBridge.keyframes.once('keyframe-from-2405', () => {
  worldBridge.toggleVisibility(false)
})

const keyframes = worldBridge.params as number[]

worldBridge.onPlay(frame => {
  // Also see src/main/window.ts
  if (frame >= 2405 && keyframes.includes(2405)) {
    worldBridge.keyframes.emit('keyframe-2405')
    startFrame = 2405
    lastPosition = 1400
  } else if (frame >= 2317 && keyframes.includes(2317)) {
    startFrame = 2317
    lastPosition = 1000
  } else if (frame >= 2313 && keyframes.includes(2313)) {
    startFrame = 2313
    lastPosition = 1000
  } else if (frame >= 2309 && keyframes.includes(2309)) {
    startFrame = 2309
    lastPosition = 1000
  } else if (frame >= 2305 && keyframes.includes(2305)) {
    startFrame = 2305
    lastPosition = 1000
  } else if (frame >= 1997 && keyframes.includes(1997)) {
    startFrame = 1997
    lastPosition = 1000
  } else if (frame >= 1993 && keyframes.includes(1993)) {
    startFrame = 1993
    lastPosition = 1000
  } else if (frame >= 1989 && keyframes.includes(1989)) {
    startFrame = 1989
    lastPosition = 1000
  } else if (frame >= 1395 && keyframes.includes(1395)) {
    startFrame = 1395
    lastPosition = 1000
  } else if (frame >= 1391 && keyframes.includes(1391)) {
    startFrame = 1391
    lastPosition = 1000
  } else if (frame >= 990 && keyframes.includes(990)) {
    worldBridge.keyframes.emit('keyframe-990')
    startFrame = 990
    lastPosition = 1450
  } else if (frame >= 811 && keyframes.includes(811)) {
    worldBridge.keyframes.emit('keyframe-811')
    startFrame = 811
    lastPosition = 1450
  } else if (frame >= 172 && keyframes.includes(172)) {
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
    } else if (startFrame === 1391) {
      worldBridge.keyframes.emit('keyframe-from-1391')
    } else if (startFrame === 1395) {
      worldBridge.keyframes.emit('keyframe-from-1395')
    } else if (startFrame === 1989) {
      worldBridge.keyframes.emit('keyframe-from-1989')
    } else if (startFrame === 1993) {
      worldBridge.keyframes.emit('keyframe-from-1993')
    } else if (startFrame === 1997) {
      worldBridge.keyframes.emit('keyframe-from-1997')
    } else if (startFrame === 2305) {
      worldBridge.keyframes.emit('keyframe-from-2305')
    } else if (startFrame === 2309) {
      worldBridge.keyframes.emit('keyframe-from-2309')
    } else if (startFrame === 2313) {
      worldBridge.keyframes.emit('keyframe-from-2313')
    } else if (startFrame === 2317) {
      worldBridge.keyframes.emit('keyframe-from-2317')
    } else if (startFrame === 2405) {
      worldBridge.keyframes.emit('keyframe-from-2405')
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
