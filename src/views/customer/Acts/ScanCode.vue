<template>
  <div class="customer-home-container">
    <act-tips-popup :show="showTips" @close="handleColseTips">
      <div class="tips-content">
        <div class="text">
          <p class="title">
            活动规则
          </p>
          <p v-for="(item, index) in actTips" :key="index">
            {{ item }}
          </p>
        </div>
      </div>
    </act-tips-popup>
    <award-popup :show="showAwardPopup" @close="handleCloseAwardPopup">
      <div class="award-warp">
        <div class="title">恭喜您获得</div>
        <img class="pic" src="" alt="" />
        <div class="name">5元鼓励奖</div>
        <div class="btn">立即领取</div>
      </div>
    </award-popup>
    <award-popup :show="showNoAwardPopup" @close="handleCloseNoAwardPopup">
      <div class="no-award-warp">
        <div class="btn">我知道了</div>
      </div>
    </award-popup>
    <div class="bg">
      <div class="btn-tips" @click="showTips = true"></div>
      <div class="btn-gift"></div>
      <div class="btn-draw" @click="getDrawTicket"></div>
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
import { Draw } from '@/plugins/hbsDraw'
import ActTipsPopup from '@/components/ActTipsPopup/index.vue'
import AwardPopup from '@/components/AwardPopup/index.vue'

const ACT_TIPS = [
  '啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
  '啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
  '啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
  '啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
  '啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
  '啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
  '啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊'
]

export default defineComponent({
  name: 'ScanCode',
  components: { ActTipsPopup, AwardPopup },
  setup() {
    const canDrawNum = ref<number>(0)
    const showTips = ref<boolean>(false)
    const showAwardPopup = ref<boolean>(false)
    const showNoAwardPopup = ref<boolean>(true)
    const actTips = ref<string[]>(ACT_TIPS)
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
    const handleColseTips = () => {
      showTips.value = false
    }
    const handleCloseAwardPopup = () => {
      showAwardPopup.value = false
    }
    const handleCloseNoAwardPopup = () => {
      showNoAwardPopup.value = false
    }
    onMounted(() => {
      getActInfo()
    })
    return {
      actTips,
      showTips,
      showAwardPopup,
      showNoAwardPopup,
      canDrawNum,
      getDrawTicket,
      handleColseTips,
      handleCloseAwardPopup,
      handleCloseNoAwardPopup
    }
  }
})
</script>

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
        326px,
        51px,
        'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/act/scanCode/btn-start.png'
      );
      position: absolute;
      top: 607px;
      left: 26px;
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
        font-size: 16px;
        color: #4c0404;
        text-align: justify;
        margin: 10px 0;
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
