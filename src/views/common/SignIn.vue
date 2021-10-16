<template>
  <div class="sign-in-containner" v-show="showPage">
    <div class="icon">
      <img
        src="https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/sign-in-icon.png"
        alt=""
      />
    </div>
    <p class="title">欢迎进入“私域企业生态平台”</p>
    <p class="tips">
      系统简介系统简介系统简介系统系统 简介简介简介简介简介简介系统 ……
    </p>
    <div class="bar">
      <van-button
        square
        type="primary"
        style="width:8rem"
        @click="onClickBtn(router, '/seller/register')"
        >我是零售户</van-button
      >
      <van-button
        square
        plain
        type="primary"
        style="width:8rem"
        @click="onClickBtn(router, '/customer/home')"
        >我是消费者</van-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { handleClickJumpBtn } from '@/hooks/useJumpBtn'
import { http } from '@/http'
import { Dialog, Toast } from 'vant'
import { Router, useRouter } from 'vue-router'

export default defineComponent({
  name: 'SignIn',
  setup() {
    const router = useRouter()
    const showPage = ref(false)
    const onClickBtn = (router: Router, path: string) => {
      if (path === '/seller/register') {
        Dialog.confirm({
          title: '提示',
          message:
            '尊敬的店主，您还未注册成为平台的入驻零售户，请您联系当地的钻石/荷花销售人员，索要注册链接。',
          closeOnClickOverlay: true,
          confirmButtonText: '知道了'
        })
          .then(() => {
            // on confirm
          })
          .catch(() => {
            // on cancel
          })
      } else {
        handleClickJumpBtn(router, path)
      }
    }
    onMounted(() => {
      http
        .get('/hbSeller/main/role', {})
        .then((res) => {
          if (res.code === '200') {
            const role = res.data.role // 1.零售户 2.店铺粉丝 3. 啥也不是
            if (role == 1) {
              const register = (res.data.register as boolean) || false // 当role为1时候，有这个字段，如果是true代表注册绑定手机已完成
              if (register) {
                router.push('/seller/sellerFans')
              } else {
                // router.push('/seller/register')
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
      router,
      showPage,
      onClickBtn
    }
  }
})
</script>

<style lang="less" scoped>
.sign-in-containner {
  height: 100vh;
  padding-top: 61px;
  box-sizing: border-box;
  background-color: #f6f6f6;
  .icon {
    width: 97px;
    height: 97px;
    margin: 0 auto 26px;
    img {
      width: 97px;
      height: 97px;
    }
  }
  p.title {
    height: 23px;
    font-size: 16px;
    line-height: 23px;
    color: #303133;
    text-align: center;
  }
  p.tips {
    width: 201px;
    font-size: 12px;
    line-height: 18px;
    color: #b1b1b1;
    margin: 0 auto 92px;
  }
  .bar {
    display: flex;
    justify-content: space-around;
    margin: 0 28px;
    .van-button {
      width: 150px;
      height: 44px;
    }
  }
}
</style>
