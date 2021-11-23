<template>
  <div class="seller-home-container">
    <div class="building-icon">
      <img
        src="https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/building-icon.png"
        alt=""
      />
    </div>
    <p class="building-tips">系统正在建设中</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SellerActs',
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
.seller-home-container {
  height: 100%;
  .building-icon {
    width: 175px;
    height: 156px;
    padding-top: 168px;
    margin: 0 auto 35px;
    img {
      display: block;
      width: 175px;
      height: 156px;
    }
  }
  p.building-tips {
    text-align: center;
    font-size: 16px;
    line-height: 13px;
    color: #0271fd;
  }
}
</style>
