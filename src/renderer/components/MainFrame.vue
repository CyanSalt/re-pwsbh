<script lang="ts" setup>
import bgm from '../assets/audio.mp3'

function handleStart() {
  worldBridge.syncTime(0)
}

function handleTimeUpdate(event: Event) {
  const target = event.target as HTMLAudioElement
  worldBridge.syncTime(target.currentTime)
}

const yellowColor = '#fed851'
const blueColor = '#62bff7'

let backgroundColor = $ref(yellowColor)
let text = $ref('')
let fontSize = $ref(100)
let textAlign = $ref('center')

const renderedText = $computed(() => text.replace(/\r\n/, '\n').replace(/\n$/, '\n '))
const fontSizeStyle = $computed(() => `${fontSize}px`)

worldBridge.onPlay(frame => {
  if (frame >= 10) {
    text = '外出た瞬間\r\n'
  }
  if (frame >= 48) {
    text = '終わったわ\r\n'
  }
  if (frame >= 68) {
    text = ''
  }
  if (frame >= 86) {
    text = '天気は良いのに\r\n'
  }
  if (frame >= 125) {
    text = '進めない\r\n'
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
    text = '強すぎて\r\n'
  }
  if (frame >= 201) {
    text = 'お亡くなり\r\n'
  }
  if (frame >= 221) {
    text = ''
  }
  if (frame >= 238) {
    text = '定期      \r\n'
  }
  if (frame >= 247) {
    text = '定期定期\r\n'
  }
  if (frame >= 257) {
    text = '定期定期\n的に'
  }
  if (frame >= 272) {
    text = 'オールバック\r\n'
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
    text = '強風オールバック\r\n'
  }
  if (frame >= 542) {
    backgroundColor = blueColor
  }
  if (frame >= 618) {
    text = ''
    fontSize = 100
  }
  if (frame >= 619) {
    text = '地下に\r\n'
    backgroundColor = yellowColor
  }
  if (frame >= 652) {
    text = '潜りたいな\r\n'
  }
  if (frame >= 701) {
    text = ''
  }
  if (frame >= 714) {
    text = 'って\r\n'
  }
  if (frame >= 726) {
    text = ''
  }
  if (frame >= 729) {
    text = '思いました\r\n'
  }
  if (frame >= 762) {
    text = ''
  }
  if (frame >= 772) {
    text = '風さえ\r\n'
  }
  if (frame >= 810) {
    text = 'なくなれば\r\n'
  }
  if (frame >= 843) {
    text = ''
    fontSize = 86
  }
  if (frame >= 876) {
    text = 'あったかいのに\r\n'
  }
  if (frame >= 909) {
    text = ''
    fontSize = 100
  }
  if (frame >= 924) {
    text = 'ずっと\r\n'
  }
  if (frame >= 958) {
    text = '座りたいな\r\n'
  }
  if (frame >= 997) {
    text = ''
  }
  if (frame >= 1018) {
    text = 'って\r\n'
  }
  if (frame >= 1029) {
    text = ''
  }
  if (frame >= 1034) {
    text = '思いました\r\n'
  }
  if (frame >= 1076) {
    text = 'いやいや\r\n'
  }
  if (frame >= 1109) {
    text = 'と\r\n'
  }
  if (frame >= 1114) {
    text = '外でたら\r\n'
  }
  if (frame >= 1142) {
    text = ''
  }
  if (frame >= 1152) {
    text = 'ハト         \r\n'
  }
  if (frame >= 1161) {
    text = '   ハト      \r\n'
  }
  if (frame >= 1170) {
    text = '      ハト   \r\n'
  }
  if (frame >= 1179) {
    text = '         ハト\r\n'
  }
  if (frame >= 1185) {
    text = ''
  }
  if (frame >= 1191) {
    text = '大乱闘\r\n'
  }
  if (frame >= 1212) {
    text = ''
  }
  if (frame >= 1228) {
    text = '外出た瞬間\r\n'
  }
  if (frame >= 1266) {
    text = '終わったわ\r\n'
  }
  if (frame >= 1288) {
    text = ''
  }
  if (frame >= 1304) {
    text = '天気は良いのに\r\n'
  }
  if (frame >= 1343) {
    text = '進めない\r\n'
  }
  if (frame >= 1364) {
    text = ''
    fontSize = 186
  }
  if (frame >= 1371) {
    text = '風'
  }
  if (frame >= 1386) {
    text = ''
    fontSize = 100
  }
  if (frame >= 1391) {
    text = '強すぎて\r\n'
  }
  if (frame >= 1420) {
    text = 'お亡くなり\r\n'
  }
  if (frame >= 1441) {
    text = ''
  }
  if (frame >= 1456) {
    text = '定期      \r\n'
  }
  if (frame >= 1466) {
    text = '定期定期\r\n'
  }
  if (frame >= 1476) {
    text = '定期定期\r\n的に'
  }
  if (frame >= 1491) {
    text = 'オールバック\r\n'
  }
  if (frame >= 1572) {
    text = ''
    fontSize = 72
  }
  if (frame >= 1685) {
    text = '強風オールバック\r\n'
  }
  if (frame >= 1810) {
    text = ''
    fontSize = 100
  }
  if (frame >= 1836) {
    text = '外\r\n'
  }
  if (frame >= 1843) {
    text = '外出\r\n'
  }
  if (frame >= 1847) {
    text = '外出た\r\n'
  }
  if (frame >= 1851) {
    text = '外出た瞬\r\n'
  }
  if (frame >= 1865) {
    text = '外出た瞬間\r\n'
  }
  if (frame >= 1874) {
    text = '終わったわ\r\n'
  }
  if (frame >= 1895) {
    text = ''
  }
  if (frame >= 1912) {
    text = '天気は良いのに\r\n'
  }
  if (frame >= 1951) {
    text = '進めない\r\n'
  }
  if (frame >= 1973) {
    text = ''
    fontSize = 186
  }
  if (frame >= 1979) {
    text = '風'
  }
  if (frame >= 1994) {
    text = ''
    fontSize = 100
  }
  if (frame >= 1998) {
    text = '強すぎて\r\n'
  }
  if (frame >= 2028) {
    text = 'お亡くなり\r\n'
  }
  if (frame >= 2048) {
    text = ''
  }
  if (frame >= 2065) {
    text = '定期      \r\n'
  }
  if (frame >= 2074) {
    text = '定期定期\r\n'
  }
  if (frame >= 2084) {
    text = '定期定期\r\n的に'
  }
  if (frame >= 2099) {
    text = 'オールバック\r\n'
  }
  if (frame >= 2131) {
    text = 'そっ\r\n'
  }
  if (frame >= 2135) {
    text = ''
  }
  if (frame >= 2141) {
    text = 'と\r\n'
  }
  if (frame >= 2148) {
    text = ''
  }
  if (frame >= 2151) {
    text = '出た瞬間\r\n'
  }
  if (frame >= 2172) {
    text = ''
  }
  if (frame >= 2180) {
    text = '終わったわ\r\n'
  }
  if (frame >= 2200) {
    text = ''
  }
  if (frame >= 2218) {
    text = '天気は良いのに\r\n'
  }
  if (frame >= 2255) {
    text = '進めない\r\n'
  }
  if (frame >= 2277) {
    text = ''
    fontSize = 186
  }
  if (frame >= 2285) {
    text = '風'
  }
  if (frame >= 2300) {
    text = ''
    fontSize = 100
  }
  if (frame >= 2304) {
    text = '強すぎて\r\n'
  }
  if (frame >= 2333) {
    text = 'お亡くなり\r\n'
  }
  if (frame >= 2356) {
    text = ''
  }
  if (frame >= 2371) {
    text = '定期      \r\n'
  }
  if (frame >= 2381) {
    text = '定期定期\r\n'
  }
  if (frame >= 2391) {
    text = '定期定期\r\n的に'
  }
  if (frame >= 2405) {
    text = 'オールバック\r\n'
  }
  if (frame >= 2438) {
    text = ''
  }
  if (frame >= 2445) {
    text = '髪の毛\r\n'
  }
  if (frame >= 2461) {
    text = '強風\r\n'
  }
  if (frame >= 2476) {
    text = 'オールバック\r\n'
  }
  if (frame >= 2502) {
    text = ''
  }
  if (frame >= 2523) {
    fontSize = 25
    textAlign = 'left'
    text = '強風オールバック\r\n但是窗口\r\n'
  }
  if (frame >= 2602) {
    text = '原: https://youtu.be/D6DVTLvOupE\r\n实现: https://www.bilibili.com/video/BV1Kz4y1p7sz/\r\n'
  }
  if (frame >= 2677) {
    text = '重制: CyanSalt\r\n显示: Electron\r\n'
  }
  if (frame >= 2753) {
    text = '源码:\r\nhttps://github.com/CyanSalt/re-pwsbh\r\n'
  }
  if (frame >= 2818) {
    fontSize = 100
    textAlign = 'center'
    text = '谢谢观看\r\n记得三连~'
  }
})
</script>

<template>
  <div class="main-frame">
    <audio :src="bgm" autoplay @play="handleStart" @timeupdate="handleTimeUpdate"></audio>
    <div class="background-text">{{ renderedText }}</div>
  </div>
</template>

<style lang="scss" scoped>
.main-frame {
  background-color: v-bind('backgroundColor');
}
.background-text {
  position: absolute;
  top: 50%;
  box-sizing: border-box;
  width: 100vw;
  padding: 6px;
  color: #ffffff;
  font-family: 'Text';
  font-style: bold;
  font-size: v-bind('fontSizeStyle');
  white-space: pre;
  text-align: v-bind('textAlign');
  transform: translateY(-50%);
}
</style>
