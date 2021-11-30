<template>
  <div class="seller-act-detail-container"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SellerActDetail',
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
@import '@/theme/common';
.seller-act-detail-container {
  .bg-img(
    375px,
    875px,
    'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/fans-bg-act-detail.jpg'
  );
}
</style>
