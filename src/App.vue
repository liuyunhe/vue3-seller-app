<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="includeRoutes">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from './store'

export default defineComponent({
  name: 'App',
  setup() {
    const includeRoutes = [
      'SellerLayout',
      'CustomerLayout',
      'SellerMemberInfo',
      'BindFansQrcode',
      'CustomerUserInfo'
    ]
    const store = useStore<GlobalDataProps>()
    const isLoading = computed(() => store.state.loading)
    const token = computed(() => store.state.token)
    sessionStorage.setItem('token', token.value)

    window.onload = () => {
      let isPageHide = false
      // 页面加载（是没有刷新页面的，跟页面刷新有着本质的不同）
      window.addEventListener('pageshow', function() {
        if (isPageHide) {
          window.location.reload()
          console.log('pageshow')
        }
      })
      window.addEventListener('pagehide', function() {
        isPageHide = true
      })
    }

    return {
      isLoading,
      includeRoutes
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
