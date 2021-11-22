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
      <van-tabbar v-if="bindShopFlag" route>
        <van-tabbar-item to="/customer/home" name="CustomerHome">
          <span>首页</span>
          <template #icon="props">
            <img :src="props.active ? icon1.active : icon1.inactive" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item to="/customer/customerActs" name="CustomerActs">
          <span>专属活动</span>
          <template #icon="props">
            <img :src="props.active ? icon2.active : icon2.inactive" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item to="/customer/customerMessage" name="CustomerMessage">
          <span>消息通知</span>
          <template #icon="props">
            <img :src="props.active ? icon3.active : icon3.inactive" />
            <div v-if="hasMsg" class="has-msg"></div>
          </template>
        </van-tabbar-item>
        <van-tabbar-item to="/customer/customerInfo" name="CustomerInfo">
          <span>个人中心</span>
          <template #icon="props">
            <img :src="props.active ? icon4.active : icon4.inactive" />
          </template>
        </van-tabbar-item>
      </van-tabbar>

      <van-tabbar
        v-model="CustomerHome"
        v-if="!bindShopFlag"
        :before-change="handleChangeTabbar"
      >
        <van-tabbar-item name="CustomerHome">
          <span>首页</span>
          <template #icon="props">
            <img :src="props.active ? icon1.active : icon1.inactive" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item name="CustomerActs">
          <span>专属活动</span>
          <template #icon="props">
            <img :src="props.active ? icon2.active : icon2.inactive" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item name="CustomerMessage">
          <span>消息通知</span>
          <template #icon="props">
            <img :src="props.active ? icon3.active : icon3.inactive" />
            <!-- <div v-if="hasMsg" class="has-msg"></div> -->
          </template>
        </van-tabbar-item>
        <van-tabbar-item name="CustomerInfo">
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
import { Dialog, Toast } from 'vant'
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  toRefs
} from 'vue'
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
        'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/tb-3-0.png',
      hmActive:
        'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/tb-3-1-1.png',
      hmInactive:
        'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/tb-3-1-0.png'
    }
    const icon4 = {
      active:
        'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/tb-4-1.png',
      inactive:
        'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/tb-4-0.png'
    }
    const bindShopFlag = computed(() => store.state.bindShopFlag)

    console.log(bindShopFlag.value)

    const handleChangeTabbar = (name: number | string) => {
      console.log(name)
      if (!bindShopFlag.value) {
        Dialog.confirm({
          title: '提示',
          message: '您还没有专属零售户哦！赶快去绑定吧！',
          closeOnClickOverlay: true,
          confirmButtonText: '知道了'
        })
          .then(() => {
            // on confirm
          })
          .catch(() => {
            // on cancel
          })
        return false
      }
    }
    const CustomerHome = ref('CustomerHome')

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
      handleChangeTabbar,
      bindShopFlag,
      CustomerHome,
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
