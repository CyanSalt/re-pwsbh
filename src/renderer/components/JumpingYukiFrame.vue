<script lang="ts" setup>
import { watchEffect } from 'vue'
import jumpDownBlowBlue from '../assets/jump-down-blow-blue.png'
import jumpDownBlow from '../assets/jump-down-blow.png'
import jumpDown from '../assets/jump-down.png'
import jumpUpBlowBlue from '../assets/jump-up-blow-blue.png'
import jumpUpBlow from '../assets/jump-up-blow.png'
import jumpUp from '../assets/jump-up.png'

enum YukiState {
  yellowNormal = 1,
  yellowBlow = 2,
  blueBlow = 3,
}

let state = $ref(YukiState.yellowNormal)
let isUp = $ref(false)

const background = $computed(() => {
  switch (state) {
    case YukiState.yellowNormal:
      return isUp ? jumpUp : jumpDown
    case YukiState.yellowBlow:
      return isUp ? jumpUpBlow : jumpDownBlow
    case YukiState.blueBlow:
      return isUp ? jumpUpBlowBlue : jumpDownBlowBlue
  }
})

const backgroundStyle = $computed(() => `url('${background}')`)

let movingRightStartedAt = $ref(0)
let movingRightInterval = 0

function moveRight(timestamp: number) {
  const distance = Math.floor((timestamp - movingRightStartedAt) / movingRightInterval / 70 * 1000)
  worldBridge.moveTo({
    x: worldBridge.initialPosition.x + distance,
  })
  if (distance - worldBridge.initialPosition.x < 950) {
    requestAnimationFrame(moveRight)
  } else {
    movingRightStartedAt = 0
  }
}

watchEffect(() => {
  if (movingRightStartedAt) {
    requestAnimationFrame(moveRight)
  }
})

let jumpingSpace = $ref(1)
let jumpingHeight = 1

function jump(magicNumber: number) {
  if (movingRightStartedAt) return
  magicNumber += 0.02 + 0.08 * (1 - jumpingSpace)
  worldBridge.moveTo({
    x: worldBridge.initialPosition.x,
    y: worldBridge.initialPosition.y + (jumpingHeight * 200 * magicNumber) * Math.log(magicNumber * 2.5),
  })
  if (magicNumber < 0.4) {
    requestAnimationFrame(() => {
      jump(magicNumber)
    })
  }
}

watchEffect(onInvalidate => {
  const timer = setInterval(() => {
    isUp = !isUp
    jump(0)
  }, 431 * jumpingSpace)
  onInvalidate(() => {
    clearInterval(timer)
  })
})

worldBridge.keyframes.once('keyframe-153', () => {
  worldBridge.toggleVisibility(false)
})

worldBridge.keyframes.once('keyframe-172', () => {
  worldBridge.toggleVisibility(true)
  movingRightStartedAt = performance.now()
})

worldBridge.keyframes.once('keyframe-235', () => {
  worldBridge.toggleVisibility(false)
  worldBridge.moveTo(worldBridge.initialPosition)
})

worldBridge.keyframes.once('keyframe-315', () => {
  worldBridge.toggleVisibility(true)
})

worldBridge.keyframes.once('keyframe-619', () => {
  worldBridge.toggleVisibility(false)
})

worldBridge.keyframes.once('keyframe-1228', () => {
  worldBridge.toggleVisibility(true)
})

worldBridge.keyframes.once('keyframe-1371', () => {
  worldBridge.toggleVisibility(false)
})

worldBridge.keyframes.once('keyframe-1392', () => {
  worldBridge.toggleVisibility(true)
  movingRightStartedAt = performance.now()
})

worldBridge.keyframes.once('keyframe-1454', () => {
  worldBridge.toggleVisibility(false)
  worldBridge.moveTo(worldBridge.initialPosition)
})

worldBridge.keyframes.once('keyframe-1685', () => {
  worldBridge.toggleVisibility(true)
})

worldBridge.keyframes.once('keyframe-1811', () => {
  worldBridge.toggleVisibility(false)
})

worldBridge.keyframes.once('keyframe-1874', () => {
  worldBridge.toggleVisibility(true)
})

worldBridge.keyframes.once('keyframe-1979', () => {
  worldBridge.toggleVisibility(false)
})

worldBridge.keyframes.once('keyframe-1998', () => {
  worldBridge.toggleVisibility(true)
  movingRightStartedAt = performance.now()
})

worldBridge.keyframes.once('keyframe-2062', () => {
  worldBridge.toggleVisibility(false)
  worldBridge.moveTo(worldBridge.initialPosition)
})

worldBridge.keyframes.once('keyframe-2151', () => {
  worldBridge.toggleVisibility(true)
})

worldBridge.keyframes.once('keyframe-2284', () => {
  worldBridge.toggleVisibility(false)
})

worldBridge.keyframes.once('keyframe-2304', () => {
  worldBridge.toggleVisibility(true)
  movingRightStartedAt = performance.now()
})

worldBridge.keyframes.once('keyframe-2369', () => {
  worldBridge.toggleVisibility(false)
  worldBridge.moveTo(worldBridge.initialPosition)
})

worldBridge.keyframes.once('keyframe-2523', () => {
  worldBridge.toggleVisibility(true)
})

worldBridge.keyframes.once('keyframe-2817', () => {
  worldBridge.toggleVisibility(false)
})

worldBridge.onPlay((frame, interval) => {
  if (frame >= 2817) {
    worldBridge.keyframes.emit('keyframe-2817')
    return
  }
  if (frame >= 2523) {
    worldBridge.keyframes.emit('keyframe-2523')
    state = YukiState.yellowBlow
    return
  }
  if (frame >= 2369) {
    worldBridge.keyframes.emit('keyframe-2369')
    jumpingSpace = 1
    jumpingHeight = 1
    return
  }
  if (frame >= 2304) {
    worldBridge.keyframes.emit('keyframe-2304')
    movingRightInterval = interval
    jumpingSpace = 0.4
    jumpingHeight = 0
    return
  }
  if (frame >= 2284) {
    worldBridge.keyframes.emit('keyframe-2284')
    return
  }
  if (frame >= 2151) {
    worldBridge.keyframes.emit('keyframe-2151')
    return
  }
  if (frame >= 2062) {
    worldBridge.keyframes.emit('keyframe-2062')
    jumpingSpace = 1
    jumpingHeight = 1
    return
  }
  if (frame >= 1998) {
    worldBridge.keyframes.emit('keyframe-1998')
    movingRightInterval = interval
    jumpingSpace = 0.4
    jumpingHeight = 0
    return
  }
  if (frame >= 1979) {
    worldBridge.keyframes.emit('keyframe-1979')
    return
  }
  if (frame >= 1874) {
    worldBridge.keyframes.emit('keyframe-1874')
    state = YukiState.yellowNormal
    return
  }
  if (frame >= 1811) {
    worldBridge.keyframes.emit('keyframe-1811')
    return
  }
  if (frame >= 1685) {
    worldBridge.keyframes.emit('keyframe-1685')
    state = YukiState.yellowBlow
    return
  }
  if (frame >= 1454) {
    worldBridge.keyframes.emit('keyframe-1454')
    jumpingSpace = 1
    jumpingHeight = 1
    return
  }
  if (frame >= 1392) {
    worldBridge.keyframes.emit('keyframe-1392')
    movingRightInterval = interval
    jumpingSpace = 0.4
    jumpingHeight = 0
    return
  }
  if (frame >= 1371) {
    worldBridge.keyframes.emit('keyframe-1371')
    return
  }
  if (frame >= 1228) {
    worldBridge.keyframes.emit('keyframe-1228')
    state = YukiState.yellowNormal
    return
  }
  if (frame >= 619) {
    worldBridge.keyframes.emit('keyframe-619')
    state = YukiState.yellowNormal
    return
  }
  if (frame >= 542) {
    state = YukiState.blueBlow
    return
  }
  if (frame >= 467) {
    state = YukiState.yellowBlow
    return
  }
  if (frame >= 390) {
    state = YukiState.blueBlow
    return
  }
  if (frame >= 315) {
    worldBridge.keyframes.emit('keyframe-315')
    state = YukiState.yellowBlow
    return
  }
  if (frame >= 235) {
    worldBridge.keyframes.emit('keyframe-235')
    jumpingSpace = 1
    jumpingHeight = 1
    return
  }
  if (frame >= 172) {
    worldBridge.keyframes.emit('keyframe-172')
    movingRightInterval = interval
    jumpingSpace = 0.4
    jumpingHeight = 0
    return
  }
  if (frame >= 153) {
    worldBridge.keyframes.emit('keyframe-153')
    return
  }
})
</script>

<template>
  <div class="jumping-yuki-frame">
    <img :src="jumpDownBlowBlue" class="offscreen-image">
    <img :src="jumpDownBlow" class="offscreen-image">
    <img :src="jumpDown" class="offscreen-image">
    <img :src="jumpUpBlowBlue" class="offscreen-image">
    <img :src="jumpUpBlow" class="offscreen-image">
    <img :src="jumpUp" class="offscreen-image">
  </div>
</template>

<style lang="scss" scoped>
.jumping-yuki-frame {
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
