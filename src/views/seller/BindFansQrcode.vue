<template>
  <div class="bind-fans-container">
    <div class="qrcode-content">
      <canvas id="canvas" />
      <img id="image" src="" alt="" />
      <div class="tips">扫码绑定成为粉丝，绑定成功后可参与店铺活动</div>
    </div>
  </div>
</template>

<script lang="ts">
import { http } from '@/http'
import { Toast } from 'vant'
import { defineComponent, onMounted, ref } from 'vue'
import QRCode, { QRCodeToDataURLOptions } from 'qrcode'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store'

export default defineComponent({
  name: 'BindFansQrcode',
  setup() {
    const qrcode = ref('')
    const store = useStore<GlobalDataProps>()

    const useqrcode = (url: string) => {
      const opts: QRCodeToDataURLOptions = {
        errorCorrectionLevel: 'H',
        type: 'image/jpeg',
        rendererOpts: { quality: 1 },
        margin: 3,
        width: 258
      }
      const canvas = document.getElementById('canvas') as HTMLCanvasElement
      QRCode.toDataURL(canvas, url, opts, (err, url) => {
        if (err) throw err
        const img = document.getElementById('image') as HTMLImageElement
        img.src = url
      })
    }

    const getQrcode = () => {
      http
        .post('/hbSeller/sellerFans/shopBindCode', {}, false)
        .then((res) => {
          if (res.code === '200') {
            const shopCode = res.data.shopCode
            store.commit('setShopCode', shopCode)
            sessionStorage.setItem('shopCode', shopCode)
            useqrcode(
              `http://${sessionStorage.getItem(
                'prefix'
              )}/orgmenu/auth?menuCode=sellerFansBind&shopCode=${shopCode}`
            )
          } else {
            Toast.fail(res.msg)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }

    onMounted(() => {
      getQrcode()
    })
    return {
      qrcode
    }
  }
})
</script>

<style lang="less" scoped>
.bind-fans-container {
  width: 100%;
  height: 100vh;
  background-color: #f4f4f4;
  .qrcode-content {
    position: relative;
    top: 84px;
    width: 345px;
    height: 371px;
    background-color: #fff;
    box-shadow: 0px 8px 15px rgba(158, 158, 158, 0.09);
    opacity: 1;
    border-radius: 10px;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 37px 20px;
    background-image: url('https://qoss.qrmkt.cn/hbseller_client/qrcode-head-icon.png');
    background-size: 100%;
    background-position: 0 0;
    background-repeat: no-repeat;
    #canvas {
      display: none;
      width: 258px;
      height: 258px;
      margin: 0 auto 14px;
    }
    img {
      width: 258px;
      height: 258px;
      display: block;
      margin: 0 auto 14px;
    }
    .tips {
      text-align: center;
      font-size: 14px;
      line-height: 35px;
      color: #666666;
    }
  }
}
</style>
