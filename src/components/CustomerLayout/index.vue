<template>
  <div class="home">
    <div class="content">
      <router-view v-slot="{ Component }">
        <keep-alive :include="includeRoutes">
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
    <div class="bottom-bar">
      <van-tabbar route>
        <van-tabbar-item to="/customer/home">
          <span>首页</span>
          <template #icon="props">
            <img :src="props.active ? icon1.active : icon1.inactive" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item to="/customer/customerActs">
          <span>专属活动</span>
          <template #icon="props">
            <img :src="props.active ? icon2.active : icon2.inactive" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item to="/customer/customerMessage">
          <span>消息通知</span>
          <template #icon="props">
            <img :src="props.active ? icon3.active : icon3.inactive" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item to="/customer/customerInfo">
          <span>个人中心</span>
          <template #icon="props">
            <img :src="props.active ? icon4.active : icon4.inactive" />
          </template>
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
export default defineComponent({
  name: 'CustomerLayout',
  setup() {
    const state = reactive({
      includeRoutes: [
        'CustomerHome',
        'CustomerActs',
        'CustomerMessage',
        'CustomerInfo'
      ]
    })
    const icon1 = {
      active:
        'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/tb-5-1.png',
      inactive:
        'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/tb-5-0.png'
    }
    const icon2 = {
      active:
        'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/tb-6-1.png',
      inactive:
        'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/tb-6-0.png'
    }
    const icon3 = {
      active:
        'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/tb-3-1.png',
      inactive:
        'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/tb-3-0.png'
    }
    const icon4 = {
      active:
        'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/tb-4-1.png',
      inactive:
        'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/tb-4-0.png'
    }

    return {
      ...toRefs(state),
      icon1,
      icon2,
      icon3,
      icon4
    }
  }
})
</script>
<style lang="scss" scoped>
@import '@assets/style/mixin.scss';
.home {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f4f4f4;
  .content {
    flex: 1;
    overflow: auto;
    margin-bottom: 50px;
  }
}
</style>
