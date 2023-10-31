<script lang="ts" setup>
const yellowColor = '#fed851'
const blueColor = '#62bff7'

let backgroundColor = $ref(yellowColor)
let text = $ref('')
let fontSize = $ref(100)

const fontSizeStyle = $computed(() => `${fontSize}px`)

worldBridge.onPlay(frame => {
  if (frame >= 10) {
    text = '外出た瞬間\n '
  }
  if (frame >= 48) {
    text = '終わったわ\n '
  }
  if (frame >= 68) {
    text = ''
  }
  if (frame >= 86) {
    text = '天気は良いのに\n '
  }
  if (frame >= 125) {
    text = '進めない\n '
  }
  if (frame >= 146) {
    text = ''
    fontSize = 186
  }
  if (frame >= 152) {
    text = '風'
  }
  if (frame >= 167) {
    text = ''
    fontSize = 100
  }
  if (frame >= 172) {
    text = '強すぎて\n '
  }
  if (frame >= 201) {
    text = 'お亡くなり\n '
  }
  if (frame >= 221) {
    text = ''
  }
  if (frame >= 238) {
    text = '定期      \n '
  }
  if (frame >= 247) {
    text = '定期定期\n '
  }
  if (frame >= 257) {
    text = '定期定期\n的に'
  }
  if (frame >= 272) {
    text = 'オールバック\n '
  }
  if (frame >= 309) {
    text = ''
  }
  if (frame >= 390) {
    backgroundColor = blueColor
  }
  if (frame >= 460) {
    fontSize = 72
  }
  if (frame >= 467) {
    backgroundColor = yellowColor
    text = '強風オールバック\n '
  }
  if (frame >= 542) {
    backgroundColor = blueColor
  }
  if (frame >= 618) {
    text = ''
    fontSize = 100
  }
  if (frame >= 619) {
    text = '地下に\n '
    backgroundColor = yellowColor
  }
  if (frame >= 652) {
    text = '潜りたいな\n '
  }
  if (frame >= 701) {
    text = ''
  }
  if (frame >= 714) {
    text = 'って\n '
  }
})
</script>

<template>
  <div class="background-frame">
    <div class="background-text">{{ text }}</div>
  </div>
</template>

<style lang="scss" scoped>
.background-frame {
  width: 100vw;
  height: 100vh;
  background-color: v-bind('backgroundColor');
}
.background-text {
  position: absolute;
  top: 50%;
  width: 100vw;
  color: #ffffff;
  font-family: 'Text';
  font-style: bold;
  font-size: v-bind('fontSizeStyle');
  white-space: pre;
  text-align: center;
  transform: translateY(-50%);
}
</style>
