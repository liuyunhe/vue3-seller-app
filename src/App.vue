<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { useStore } from 'vuex'
import { initWxOnReady, wxShare } from './plugins/Wx'
import { GlobalDataProps } from './store'

export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore<GlobalDataProps>()
    const isLoading = computed(() => store.state.loading)
    const token = computed(() => store.state.token)
    sessionStorage.setItem('token', token.value)
    onMounted(() => {
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        initWxOnReady(() => {
          wxShare({
            shareUrl: '/orgmenu/auth?menuCode=sellerFansBind',
            shareTitle: '分享好友绑定粉丝',
            shareDesc: '分享好友绑定粉丝',
            shareImg:
              'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/building-icon.png'
          })
        })
      }
    })
    return {
      isLoading
    }
  }
})
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
}
</style>
