<template>
  <div></div>
</template>

<script lang="ts">
import { GlobalDataProps } from '@/store'
import { defineComponent } from 'vue'
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
    console.log(props.token, props.target)
    const store = useStore<GlobalDataProps>()
    const router = useRouter()
    if (props.token) {
      store.commit('setToken', props.token)
      sessionStorage.setItem('token', props.token)
    }
    if (props.target) {
      console.log(props.target)
      router.push(props.target)
    }
    return {}
  }
})
</script>
