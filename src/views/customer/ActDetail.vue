<template>
  <div class="fans-act-detail-container"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CustomerActDetail',
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
@import '@/theme/common';
.fans-act-detail-container {
  .bg-img(
    375px,
    875px,
    'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/seller-bg-act-detail.jpg'
  );
}
</style>
