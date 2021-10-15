<template>
  <div></div>
</template>

<script lang="ts">
import axios from '@/http'
import { initWxOnReady, wxHideMenu } from '@/plugins/Wx'
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
      if (props.token) {
        store.commit('setToken', props.token)
        sessionStorage.setItem('token', props.token)
        axios.defaults.headers.token = props.token
      }
      if (props.target) {
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          console.log(wxUrl.value)
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          initWxOnReady(wxUrl.value!, () => {
            wxHideMenu()
          })
        } else {
          initWxOnReady(location.href.split('#')[0], () => {
            wxHideMenu()
          })
        }
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
