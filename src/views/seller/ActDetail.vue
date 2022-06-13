<template>
  <div class="seller-act-detail-container">
    <div class="act-bg" :class="act"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'SellerActDetail',
  props: {
    actCode: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const act = ref<string>(props.actCode)
    return { act }
  }
})
</script>

<style lang="less" scoped>
@import '@/theme/common';
.seller-act-detail-container {
  height: 100vh;
  background-color: #3566cf;
  .act-bg {
    .bg-img(
      375px,
      667px,
      'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/act/fansScan-bg.png'
    );
    background-image: none;
    &.fansScan {
      background-image: url('https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/act/fansScan-bg.png');
    }
    &.fansNew {
      background-image: url('https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/act/fansNew-bg.png');
    }
  }
}
</style>
