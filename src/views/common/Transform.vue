<template>
  <div></div>
</template>

<script lang="ts">
import axios from '@/http'
import { initWxOnReady, wxGetLocation, wxHideMenu } from '@/plugins/Wx'
import { GlobalDataProps } from '@/store'
import { computed, defineComponent, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Transform',
  props: {
    token: {
      type: String,
      required: true
    },
    target: {
      type: String,
      required: true
    },
    shopCode: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const store = useStore<GlobalDataProps>()
    const router = useRouter()
    const wxUrl = computed(() => store.state.wxUrl)
    onMounted(() => {
      if (sessionStorage.getItem('wxUrl')) {
        store.commit('setWxUrl', sessionStorage.getItem('wxUrl'))
      }
      if (props.shopCode) {
        store.commit('setShopCode', props.shopCode)
        sessionStorage.setItem('shopCode', props.shopCode)
      }
      if (props.token) {
        store.commit('setToken', props.token)
        sessionStorage.setItem('token', props.token)
        axios.defaults.headers.token = props.token
      }
      if (props.target) {
        const url: string = /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)
          ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            wxUrl.value!
          : location.href.split('#')[0]

        initWxOnReady(url, () => {
          wxGetLocation()
          wxHideMenu()
        })

        router.push(props.target)
      }
    })

    return {}
  },
  beforeRouteEnter(to, from, next) {
    sessionStorage.setItem(
      'wxUrl',
      `${location.origin}/HbsClient${to.fullPath}`
    )
    next()
  }
})
</script>
