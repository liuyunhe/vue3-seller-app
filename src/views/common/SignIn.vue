<template>
  <div class="sign-in-containner" v-show="showPage">
    <div>
      <van-button
        square
        type="primary"
        style="width:8rem"
        @click="onClickBtn('/seller/register')"
        >我是零售户</van-button
      >
      <van-button
        square
        type="primary"
        style="width:8rem"
        @click="onClickBtn('/customer/home')"
        >我是消费者</van-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { handleClickJumpBtn } from '@/hooks/useJumpBtn'
import { http } from '@/http'
import { Toast } from 'vant'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'SignIn',
  setup() {
    const router = useRouter()
    const showPage = ref(false)
    const onClickBtn = handleClickJumpBtn
    onMounted(() => {
      http
        .get('/hbSeller/main/role', {})
        .then((res) => {
          if (res.code === '200') {
            const role = res.data.role // 1.零售户 2.店铺粉丝 3. 啥也不是
            if (role == 1) {
              const register = (res.data.register as boolean) || false // 当role为1时候，有这个字段，如果是true代表注册绑定手机已完成
              if (register) {
                router.push('/sellerFans')
              } else {
                router.push('/seller/register')
              }
            } else if (role == 2) {
              router.push('/customer/home')
            } else {
              showPage.value = true
            }
          } else {
            Toast.fail(res.msg)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    })
    return {
      showPage,
      onClickBtn
    }
  }
})
</script>

<style lang="less" scoped>
.ign-in-containner {
  height: 100vh;
}
</style>
