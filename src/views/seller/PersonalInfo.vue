<template>
  <div class="personal-info-container">
    <div class="head">
      <router-link to="/seller/memberInfo">
        <div class="content">
          <div class="seller-head-img">
            <img :src="headimgurl" alt="" />
          </div>
          <div class="info">
            <div class="name">
              {{ shopName }}<img class="icon-lv" :src="levelIconUrl" alt="" />
            </div>
            <div class="member">
              <span class="lv">LV{{ shopLevel }} {{ levelName }}</span
              ><span class="title"></span>
            </div>
          </div>
          <div class="btn"></div>
        </div>
      </router-link>

      <div class="tips">距离升级还需要{{ upgradeScore }}积分</div>
    </div>
    <div class="main">
      <div class="title">我的功能</div>
      <div class="content">
        <router-link to="/seller/myRebate">
          <div class="item">
            <i class="icon icon-wallet"></i>
            <div class="name">我的返佣</div>
          </div>
        </router-link>
        <router-link to="/seller/myInvite">
          <div class="item">
            <i class="icon icon-invite"></i>
            <div class="name">我的消息</div>
          </div>
        </router-link>

        <router-link to="/common/myGifts">
          <div class="item">
            <i class="icon icon-gift"></i>
            <div class="name">我的礼品</div>
          </div>
        </router-link>
        <router-link :to="`/common/myPoints?shopName=${shopName}`">
          <div class="item">
            <i class="icon icon-integral"></i>
            <div class="name">我的积分</div>
          </div>
        </router-link>
      </div>
      <div class="content">
        <router-link to="/common/feedback?feedFrom=2">
          <div class="item">
            <i class="icon icon-opinion"></i>
            <div class="name">意见反馈</div>
          </div>
        </router-link>
        <router-link to="/seller/bindFansQrcode">
          <div class="item">
            <i class="icon icon-invite-qrcode"></i>
            <div class="name">我的邀请码</div>
          </div>
        </router-link>

        <div class="item"></div>
        <div class="item"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { http } from '@/http'
import { Toast } from 'vant'
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  name: 'SellerInfo',
  setup() {
    const shopName = ref('')
    const headimgurl = ref('')
    const shopLevel = ref(0)
    const levelName = ref('')
    const levelIconUrl = ref('')
    const upgradeScore = ref(0)
    const getSellerInfo = () => {
      http
        .post('/hbSeller/sellerPerson/personInfo', {}, false)
        .then((res) => {
          if (res.code === '200') {
            shopName.value = res.data.personInfo.shopName
            headimgurl.value = res.data.personInfo.headimgurl
            shopLevel.value = res.data.personInfo.shopLevel
            levelName.value = res.data.levelCode.levelName
            levelIconUrl.value = res.data.levelCode.levelIconUrl
            upgradeScore.value = res.data.upgradeScore
          } else {
            Toast.fail(res.msg)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
    onMounted(() => {
      getSellerInfo()
    })
    return {
      shopName,
      headimgurl,
      shopLevel,
      levelName,
      upgradeScore,
      levelIconUrl
    }
  }
})
</script>

<style lang="less" scoped>
@import '@/theme/common';
.personal-info-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .head {
    .bg-img(
      375px,
      170px,
      'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/personal/head-bg.png'
    );
    background-size: 375px 170px;
    margin-bottom: -42px;
    .content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 17px 23px 0;
      .seller-head-img {
        width: 65px;
        height: 65px;
        img {
          display: block;
          width: 50px;
          height: 50px;
          margin: 7px auto;
          border-radius: 50%;
        }
      }
      .info {
        flex: 1;
        .name {
          height: 25px;
          font-size: 18px;
          line-height: 25px;
          margin-left: 5px;
          color: #fff;
          .icon-lv {
            display: inline-block;
            width: 15px;
            margin-left: 5px;
          }
        }
        .member {
          .bg-img(
            140px,
            28px,
            'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/personal/icon-degree.png'
          );
          box-sizing: border-box;
          padding: 6px 4px 9px 21px;
          line-height: 13px;
          color: #ffcc65;
          font-size: 12px;
          .lv {
            display: block;
            width: fit-content;
            transform: scale(0.7) translateX(-15%);
          }
          .title {
            float: right;
            transform: scale(0.7);
          }
        }
      }
      .btn {
        .bg-img(
          10px,
          16px,
          'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/personal/iconfont-go.png'
        );
      }
    }
    .tips {
      margin-left: 93px;
      color: #fff;
      height: 14px;
      line-height: 14px;
      font-size: 12px;
    }
  }
  .main {
    width: 100%;
    height: 100%;
    flex: 1;
    border-radius: 20px 20px 0px 0px;
    background-color: #fff;
    padding: 24px 12px;
    box-sizing: border-box;
    .title {
      height: 24px;
      font-size: 17px;
      font-weight: bold;
      line-height: 25px;
      color: #333333;
      margin-left: 8px;
      margin-bottom: 20px;
    }
    .content {
      display: flex;
      justify-content: space-between;
      margin-bottom: 30px;
      .item {
        width: 74px;
        i.icon {
          display: block;
          margin: 0 auto;
          &.icon-wallet {
            .bg-img(33px, 33px, @icon-wallet);
          }
          &.icon-virtual-currency {
            .bg-img(33px, 33px, @icon-virtual-currency);
          }
          &.icon-integral {
            .bg-img(33px, 33px, @icon-integral);
          }
          &.icon-gift {
            .bg-img(33px, 33px, @icon-gift);
          }
          &.icon-invite {
            .bg-img(33px, 33px, @icon-invite);
          }
          &.icon-qrcode {
            .bg-img(33px, 33px, @icon-qrcode);
          }
          &.icon-survey {
            .bg-img(33px, 33px, @icon-survey);
          }
          &.icon-opinion {
            .bg-img(33px, 33px, @icon-opinion);
          }
          &.icon-invite-qrcode {
            .bg-img(33px, 33px, @icon-invite-qrcode);
          }
        }
        .name {
          height: 20px;
          line-height: 20px;
          font-size: 14px;
          color: #303133;
          text-align: center;
        }
      }
    }
  }
}
</style>
