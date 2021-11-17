<template>
  <div class="invite-fans-container">
    <div class="bg">
      <div class="invite-btn">分享好友绑定粉丝</div>
      <router-link to="/seller/bindFansQrcode">
        <div class="qrcode-bar">
          <i class="qrcode-icon"></i>
          <div class="text">粉丝绑定码</div>
          <i class="back"></i>
        </div>
      </router-link>
      <div class="note">
        <div class="title">
          <i class="icon"></i>
          <div class="text">邀约规则</div>
        </div>
        <p>
          1、点击分享按钮，将页面分享给您的微信好友，好友完成绑定操作，即可成为您的店铺粉丝；
        </p>
        <p>
          2、绑定成为粉您的丝后，其可以参与私域平台内的相关活动，也可以了解您的店铺动态；
        </p>
        <p>
          3、您的粉丝在平台参与相关扫码活动以及其他线上活动，有机会给您带来一定量的奖励，如荷石璧等（具体奖励规则详见后续的活动规则）；
        </p>
        <p>
          4、一旦绑定您的店铺，暂时无法解绑，请知悉。
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { http } from '@/http'
import { initWxOnReady, wxHideMenu, wxShare } from '@/plugins/Wx'
import { GlobalDataProps } from '@/store'
import { Toast } from 'vant'
import { computed, defineComponent, onMounted } from 'vue'
import { useStore } from 'vuex'

const isiOS = /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent) //ios终端

export default defineComponent({
  name: 'InviteFans',
  setup() {
    const store = useStore<GlobalDataProps>()
    const wxUrl = computed(() => store.state.wxUrl)
    const getQrcode = () => {
      http
        .post('/hbSeller/sellerFans/shopBindCode', {}, false)
        .then((res) => {
          if (res.code === '200') {
            const shopCode = res.data.shopCode
            store.commit('setShopCode', shopCode)
            sessionStorage.setItem('shopCode', shopCode)
            const url: string = isiOS
              ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                wxUrl.value!
              : location.href.split('#')[0]

            initWxOnReady(url, () => {
              wxShare({
                shareUrl: `http://${sessionStorage.getItem(
                  'prefix'
                )}/orgmenu/auth?menuCode=sellerFansBind&shopCode=${shopCode}&bindChannel=2`,
                shareTitle: '消费者绑定链接',
                shareDesc: '绑定成为零售户粉丝，享受粉丝专属权益',
                shareImg:
                  'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/icon-share.png'
              })
            })
          } else {
            Toast.fail(res.msg)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }

    onMounted(() => {
      // 分享时重新制定wxUrl
      if (!sessionStorage.getItem('ShareInviteFans')) {
        sessionStorage.setItem('ShareInviteFans', '1')
        window.location.reload()
        return
      }
      getQrcode()
    })

    return {}
  },
  beforeRouteLeave(to, from, next) {
    wxHideMenu()
    next()
  }
})
</script>

<style lang="less" scoped>
@import '../../theme/common.less';
.invite-fans-container {
  height: 100vh;
  background-color: #527dfd;
  .bg {
    .bg-img(
      375px,
      603px,
      'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/invite-fans-bg.png'
    );
    background-position-y: -64px;
    background-size: cover;
    padding-top: 292px;
    box-sizing: border-box;
    .invite-btn {
      width: 182px;
      height: 44px;
      background: linear-gradient(180deg, #fff8d6 0%, #fead2c 100%);
      box-shadow: 0px 6px 4px rgba(2, 113, 253, 0.42);
      border-radius: 4px;
      font-size: 17px;
      margin: 0 auto 11px;
      text-align: center;
      line-height: 44px;
      color: #ce5500;
    }
    .qrcode-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 20px;
      margin: 0 135px 14px;
      flex: 1;
      .qrcode-icon {
        .bg-img(
          14px,
          14px,
          'https://qoss.qrmkt.cn/hbseller_client/invite-fans-qrcode.png'
        );
      }
      .text {
        font-size: 14px;
        color: #ffffff;
        line-height: 20px;
      }
      .back {
        .bg-img(
          5px,
          11px,
          'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/icon-back.png'
        );
        margin-top: 2px;
      }
    }
    .note {
      width: 345px;
      height: 188px;
      background: #ffffff;
      box-shadow: 0px 10px 10px rgba(0, 61, 243, 0.4);
      border-radius: 10px;
      margin: 0 auto;
      padding: 20px 15px;
      box-sizing: border-box;
      overflow-y: scroll;
      .title {
        height: 25px;
        line-height: 25px;
        .icon {
          float: left;
          width: 5px;
          height: 17px;
          margin-top: 4px;
          background: #527dfd;
          box-shadow: 0px 2px 3px rgba(2, 113, 253, 0.49);
          border-radius: 3px;
        }
        .text {
          float: left;
          font-size: 16px;
          margin-left: 8px;
          color: #2b333b;
        }
      }
      p {
        font-size: 14px;
        line-height: 28px;
        color: #666666;
      }
    }
  }
}
</style>
