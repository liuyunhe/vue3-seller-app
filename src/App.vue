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
