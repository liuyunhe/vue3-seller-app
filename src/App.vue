<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from './store'

export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore<GlobalDataProps>()
    const isLoading = computed(() => store.state.loading)
    const token = computed(() => store.state.token)
    sessionStorage.setItem('token', token.value)
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
