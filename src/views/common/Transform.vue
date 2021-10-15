<template>
  <div></div>
</template>

<script lang="ts">
import { initWxOnReady, wxGetLocation, wxShare } from '@/plugins/Wx'
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
      }
      if (props.target) {
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          console.log(wxUrl.value)
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          initWxOnReady(wxUrl.value!, () => {
            wxGetLocation(props.target)
            wxShare({
              shareUrl: '/orgmenu/auth?menuCode=sellerFansBind',
              shareTitle: '分享好友绑定粉丝',
              shareDesc: '分享好友绑定粉丝',
              shareImg:
                'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/building-icon.png'
            })
          })
          router.push(props.target)
        } else {
          initWxOnReady(location.href.split('#')[0], () => {
            wxGetLocation(props.target)
            wxShare({
              shareUrl: '/orgmenu/auth?menuCode=sellerFansBind',
              shareTitle: '分享好友绑定粉丝',
              shareDesc: '分享好友绑定粉丝',
              shareImg:
                'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/building-icon.png'
            })
          })
          router.push(props.target)
        }
      }
    })

    return {}
  },
  beforeRouteEnter(to, from, next) {
    sessionStorage.setItem('wxUrl', `${location.origin}${to.fullPath}`)
    next()
  }
})
</script>
