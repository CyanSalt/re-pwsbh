<script lang="ts" setup>
import error from '../assets/error.png'

const color = worldBridge.params
</script>

<template>
  <div class="error-frame">
    <p class="error-info">
      <img :src="error" class="error-icon">
      <span class="error-message">
        <p>应用程序中发生了未经处理的异常。如果单击“继续”，应用程序将忽略此错误并尝试继续。如果单击“退出”，应用程序将立即关闭。</p>
        <p>程序无法运行,因为附近有鸽子在大乱斗。</p>
      </span>
    </p>
    <p class="error-action">
      <button>详细信息</button>
      <span class="primary-action">
        <button>继续</button>
        <button>退出</button>
      </span>
    </p>
  </div>
</template>

<style lang="scss" scoped>
.error-frame {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 12px;
  color: v-bind('color');
  font-size: 14px;
  line-height: 16px;
}
.error-icon {
  width: 48px;
  height: 48px;
}
.error-info {
  display: flex;
  gap: 6px;
  margin: 0;
}
.error-message {
  & > p {
    margin: 6px;
  }
  & > p:first-child {
    margin-block-start: 0;
  }
  & > p:last-child {
    margin-block-end: 0;
  }
}
.error-action {
  display: flex;
  justify-content: space-between;
  margin: 0;
}
.primary-action {
  display: flex;
  gap: 6px;
}
</style>
