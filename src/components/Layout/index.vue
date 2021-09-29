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
      <van-tabbar v-model="active">
        <van-tabbar-item name="/home">
          <span>专属活动</span>
          <template #icon="props">
            <img :src="props.active ? icon1.active : icon1.inactive" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item name="/shop" icon="smile-o">
          <span>我的粉丝</span>
          <template #icon="props">
            <img :src="props.active ? icon2.active : icon2.inactive" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item name="/vuex" icon="smile-o">
          <span>消息通知</span>
          <template #icon="props">
            <img :src="props.active ? icon3.active : icon3.inactive" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item name="/about" icon="smile-o">
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
import { defineComponent, reactive, toRefs, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'Layout',
  setup() {
    const router = useRouter()
    const state = reactive({
      active: '/home',
      includeRoutes: ['ABOUT']
    })

    const icon1 = {
      active:
        'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/tb-1-1.png',
      inactive:
        'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/tb-1-0.png'
    }
    const icon2 = {
      active:
        'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/tb-2-1.png',
      inactive:
        'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/tb-2-0.png'
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

    watch(
      () => state.active,
      (val) => {
        router.push(val)
      }
    )

    onMounted(() => {
      state.active = router.currentRoute.value.path
    })
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
  .bottom-bar {
    height: 100px;
  }
  .content {
    flex: 1;
    overflow: auto;
  }
}
</style>
