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

let isJumping = $ref(true)
let jumpingSpace = $ref(1)
let jumpingHeight = $ref(1)

function jump(magicNumber: number) {
  if (!isJumping) return
  magicNumber += 0.02 + 0.08 * (1 - jumpingSpace)
  worldBridge.moveTo({
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

let movingRightStartedAt = $ref(0)

function moveRight(timestamp: number) {
  const distance = Math.floor((timestamp - movingRightStartedAt) * worldBridge.fps / 70)
  worldBridge.moveTo({
    x: worldBridge.initialPosition.x + distance,
  })
  if (distance - worldBridge.initialPosition.x < 950) {
    requestAnimationFrame(moveRight)
  }
}

watchEffect(() => {
  if (movingRightStartedAt) {
    isJumping = false
    requestAnimationFrame(moveRight)
  }
})

worldBridge.onPlay(frame => {
  if (frame >= 1392) {
    jumpingSpace = 0.4
    worldBridge.setOpacity(1)
    jumpingHeight = 0
    if (!movingRightStartedAt) {
      movingRightStartedAt = performance.now()
    }
    return
  }
  if (frame >= 1371) {
    worldBridge.setOpacity(0)
    return
  }
  if (frame >= 1228) {
    state = YukiState.yellowNormal
    worldBridge.setOpacity(1)
    return
  }
  if (frame >= 619) {
    worldBridge.setOpacity(0)
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
    state = YukiState.yellowBlow
    worldBridge.setOpacity(1)
    return
  }
  if (frame >= 235) {
    movingRightStartedAt = 0
    worldBridge.setOpacity(0)
    jumpingSpace = 1
    jumpingHeight = 1
    worldBridge.moveTo(worldBridge.initialPosition)
    return
  }
  if (frame >= 172) {
    jumpingSpace = 0.4
    worldBridge.setOpacity(1)
    jumpingHeight = 0
    if (!movingRightStartedAt) {
      movingRightStartedAt = performance.now()
    }
    return
  }
  if (frame >= 153) {
    worldBridge.setOpacity(0)
    return
  }
})
</script>

<template>
  <div class="jumping-yuki-frame"></div>
</template>

<style lang="scss" scoped>
.jumping-yuki-frame {
  background-image: v-bind('backgroundStyle');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
