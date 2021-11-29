<template>
  <div class="customer-home-container">
    <div class="h15"></div>
    <router-link to="/customer/actDetail">
      <div class="building-icon"></div>
    </router-link>

    <p class="building-tips">— 更多活动 敬请期待 —</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CustomerActs',
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
@import '@/theme/common';
.customer-home-container {
  height: 100%;
  .h15 {
    height: 15px;
  }
  .building-icon {
    padding-top: 20px;
    margin: 0 auto 10px;
    .bg-img(
      345px,
      640px,
      'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/xfz-acts.png'
    );
  }
  p.building-tips {
    height: 33px;
    text-align: center;
    font-size: 14px;
    line-height: 13px;
    color: #b1b1b1;
  }
}
</style>
