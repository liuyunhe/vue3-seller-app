<template>
  <div class="customer-home-container">
    <act-tips-popup :show="showTips" @close="handleColseTips">
      <div class="tips-content">
        <div class="text">
          <p class="title">
            活动规则
          </p>
          <div v-html="actTips"></div>
        </div>
      </div>
    </act-tips-popup>
    <award-popup :show="showAwardPopup" @close="nextStep">
      <div class="award-warp">
        <div class="title">恭喜您获得</div>
        <img class="pic" :src="drawData ? drawData.awdPic : ''" alt="" />
        <div class="name" :class="{ mb5: drawData && drawData.awdType == 10 }">
          {{ drawData && drawData.awdName }}
        </div>
        <div class="tips" v-if="drawData && drawData.awdType == 10">
          7天内有效，请前往已绑定零售户店领取
        </div>
        <div class="btn" @click="handleReceive(drawData, nextStep)">
          立即领取
        </div>
      </div>
    </award-popup>
    <award-popup :show="showNoAwardPopup" @close="nextStep">
      <div class="no-award-warp">
        <div class="title">未中奖</div>
        <div class="btn" @click="nextStep">我知道了</div>
      </div>
    </award-popup>
    <div class="bg">
      <div class="btn-tips" @click="showTips = true"></div>
      <div class="btn-gift" @click="handleClickGiftsBtn"></div>
      <div class="btn-draw" @click="getDrawTicket"></div>
      <div class="btn-scan" @click="handleClickScan"></div>
      <div class="draw-tips">
        当前剩余 <span>{{ canDrawNum }}</span> 次抽奖机会
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { http } from '@/http'
import { Dialog, Toast } from 'vant'
import { Draw, DrawData, handleReceive, getActRules } from '@/plugins/hbsDraw'
import ActTipsPopup from '@/components/ActTipsPopup/index.vue'
import AwardPopup from '@/components/AwardPopup/index.vue'
import { handleClickJumpBtn } from '@/hooks/useJumpBtn'
import { useRouter } from 'vue-router'
import { wxScanQRCode } from '@/plugins/Wx'

export default defineComponent({
  name: 'ScanCode',
  props: {
    actCode: {
      type: String,
      default: ''
    }
  },
  components: { ActTipsPopup, AwardPopup },
  setup(props) {
    const canDrawNum = ref<number>(0)
    const showTips = ref<boolean>(false)
    const showAwardPopup = ref<boolean>(false)
    const showNoAwardPopup = ref<boolean>(false)
    const actTips = ref<string>('')
    const drawData = ref<DrawData | null>(null)
    const router = useRouter()
    const handleClickGiftsBtn = () => {
      handleClickJumpBtn(router, '/common/myGifts')
    }
    const getActInfo = () => {
      http.post('/hbSeller/scanCodeAct/userActInfo', {}, false).then((res) => {
        if (res.code === '200') {
          canDrawNum.value = res.data.canDrawNum || 0
        } else {
          Toast.fail(res.msg)
        }
      })
    }
    const getDrawTicket = () => {
      http.post('/hbSeller/scanCodeAct/drawTicket', {}, false).then((res) => {
        if (res.code === '200') {
          const { actCode, ticket } = res.data
          Draw({ actCode, ticket }).then((award) => {
            console.log(award)
            drawData.value = award as DrawData | null
            if (drawData.value) {
              showAwardPopup.value = true
            } else {
              showNoAwardPopup.value = true
            }
          })
        } else {
          Dialog.alert({
            title: '提示',
            message: res.msg
          }).then(() => {
            // on close
          })
        }
      })
    }
    const handleClickScan = () => {
      wxScanQRCode()
    }
    const handleColseTips = () => {
      showTips.value = false
    }
    const handleCloseAwardPopup = () => {
      showAwardPopup.value = false
    }
    const handleCloseNoAwardPopup = () => {
      showNoAwardPopup.value = false
    }
    const nextStep = () => {
      handleCloseAwardPopup()
      handleCloseNoAwardPopup()
      getActInfo()
    }
    getActRules(props.actCode).then((rules) => {
      actTips.value = rules
    })
    onMounted(() => {
      getActInfo()
    })
    return {
      actTips,
      showTips,
      showAwardPopup,
      showNoAwardPopup,
      canDrawNum,
      drawData,
      getDrawTicket,
      handleClickScan,
      handleColseTips,
      handleCloseAwardPopup,
      handleCloseNoAwardPopup,
      handleReceive,
      nextStep,
      handleClickGiftsBtn,
      wxScanQRCode
    }
  }
})
</script>

<style>
.tips-content .text p {
  font-size: 14px;
  color: #4c0404;
  text-align: justify;
  margin: 10px 0;
  line-height: 1.3;
}
</style>

<style lang="less" scoped>
@import '@/theme/common';
.customer-home-container {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background-color: #d00004;
  overflow: scroll;
  .bg {
    .bg-img(
      375px,
      724px,
      'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/act/scanCode/bg.png'
    );
    .btn-tips {
      .bg-img(
        74px,
        31px,
        'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/act/scanCode/btn-tips.png'
      );
      position: absolute;
      top: 12px;
      right: 12px;
    }
    .btn-gift {
      .bg-img(
        74px,
        31px,
        'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/act/scanCode/btn-gift.png'
      );
      position: absolute;
      top: 52px;
      right: 12px;
    }
    .btn-draw {
      .bg-img(
        160px,
        51px,
        'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/act/scanCode/btn-draw.png'
      );
      position: absolute;
      top: 607px;
      left: 23px;
    }
    .btn-scan {
      .bg-img(
        160px,
        51px,
        'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/act/scanCode/btn-scan.png'
      );
      position: absolute;
      top: 607px;
      right: 23px;
    }
    .draw-tips {
      position: absolute;
      top: 670px;
      left: 0;
      width: 100%;
      height: 20px;
      text-align: center;
      line-height: 20px;
      font-size: 14px;
      color: #fff;
      span {
        color: #ffa00b;
        font-size: 17px;
      }
    }
  }
  .tips-content {
    .bg-img(
      374px,
      433px,
      'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/act/scanCode/tips-content.png'
    );
    padding: 150px 50px 70px;
    box-sizing: border-box;
    .text {
      width: 100%;
      height: 250px;
      overflow-x: scroll;
      p {
        font-size: 14px;
        color: #4c0404;
        text-align: justify;
        margin: 10px 0;
        line-height: 1.3;
        &.title {
          text-align: center;
          font-size: 20px;
          color: #4c0404;
          font-weight: bolder;
        }
      }
    }
  }
  .award-warp {
    width: 310px;
    height: 303px;
    background: linear-gradient(0deg, #bb150a -30%, #ffc64c 50%);
    border: 2px solid #ffcb90;
    box-shadow: 0px 0px 10px 0px rgba(61, 68, 203, 0.3);
    border-radius: 10px;
    box-sizing: border-box;
    padding-top: 23px;
    color: #670404;
    .title {
      text-align: center;
      font-size: 22px;
      line-height: 30px;
      font-weight: bolder;
    }
    .pic {
      display: block;
      width: 100px;
      height: 100px;
      margin: 10px auto 20px;
    }
    .name {
      text-align: center;
      font-size: 16px;
      line-height: 20px;
      margin-bottom: 30px;
      font-weight: bolder;
      &.mb5 {
        margin-bottom: 5px;
      }
    }
    .tips {
      text-align: center;
      font-size: 14px;
      line-height: 30px;
      margin-bottom: 5px;
      color: #fff;
    }
    .btn {
      width: 240px;
      height: 43px;
      background: linear-gradient(0deg, #faf0b2, #ffa95d);
      border: 2px solid #ffcb90;
      border-radius: 21px;
      margin: 0 auto;
      line-height: 43px;
      font-size: 20px;
      font-weight: bolder;
      text-align: center;
    }
  }
  .no-award-warp {
    .bg-img(
      330px,
      322px,
      'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/act/scanCode/no-award-bg.png'
    );
    .title {
      position: relative;
      top: 180px;
      text-align: center;
      font-size: 16px;
      line-height: 20px;
      font-weight: bolder;
      color: #a55600;
    }
    .btn {
      position: relative;
      width: 240px;
      height: 43px;
      top: 235px;
      background: linear-gradient(0deg, #faf0b2, #ffa95d);
      border: 2px solid #ffcb90;
      border-radius: 21px;
      margin: 0 auto;
      color: #91210d;
      line-height: 43px;
      font-size: 20px;
      font-weight: bolder;
      text-align: center;
    }
  }
}
</style>
