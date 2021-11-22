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
        <van-tabbar-item to="/seller/sellerActs">
          <span>专属活动</span>
          <template #icon="props">
            <img :src="props.active ? icon1.active : icon1.inactive" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item to="/seller/sellerFans">
          <span>我的粉丝</span>
          <template #icon="props">
            <img :src="props.active ? icon2.active : icon2.inactive" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item to="/seller/sellerMessage">
          <span>消息通知</span>
          <template #icon="props">
            <img :src="props.active ? icon3.active : icon3.inactive" />
            <div v-if="hasMsg" class="has-msg"></div>
          </template>
        </van-tabbar-item>
        <van-tabbar-item to="/seller/sellerInfo">
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
import { http } from '@/http'
import store from '@/store'
import { Toast } from 'vant'
import { computed, defineComponent, onMounted, reactive, toRefs } from 'vue'
export default defineComponent({
  name: 'SellerLayout',
  setup() {
    const state = reactive({
      includeRoutes: ['SellerActs', 'SellerFans', 'SellerMessage', 'SellerInfo']
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
    const hasMsg = computed(() => store.state.hasMsg)
    onMounted(() => {
      if (hasMsg.value === null) {
        http
          .get('/hbSeller/main/role', {})
          .then((res) => {
            if (res.code === '200') {
              if (res.data.hasMsg) {
                store.commit('setHasMsg', true)
              } else {
                store.commit('setHasMsg', false)
              }
            } else {
              Toast.fail(res.msg)
            }
          })
          .catch((err) => {
            console.log(err)
          })
      }
    })

    return {
      ...toRefs(state),
      icon1,
      icon2,
      icon3,
      icon4,
      hasMsg
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
.has-msg {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: red;
  position: absolute;
  top: -2px;
  right: -3px;
}
</style>
