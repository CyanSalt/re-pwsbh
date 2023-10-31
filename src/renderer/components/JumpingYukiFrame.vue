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

let jumpSpace = $ref(1)

watchEffect(onInvalidate => {
  const timer = setInterval(() => {
    isUp = !isUp
  }, 431 * jumpSpace)
  onInvalidate(() => {
    clearInterval(timer)
  })
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
