<template>
  <van-overlay :show="show">
    <div class="wrapper">
      <div class="content">
        <slot></slot>
      </div>
      <div class="close" @click="handleClickClose"></div>
    </div>
  </van-overlay>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ActTipsPopup',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },

  setup(prop, ctx) {
    const handleClickClose = () => {
      ctx.emit('close')
    }
    return { handleClickClose }
  }
})
</script>

<style lang="less" scoped>
@import '@/theme/common';
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-direction: column;
  margin-top: -30px;
  .close {
    .btn-popup-close();
    margin-top: 20px;
  }
}
</style>
