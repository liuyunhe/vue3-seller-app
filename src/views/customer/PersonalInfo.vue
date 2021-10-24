<template>
  <div class="personal-info-container">
    <div class="head">
      <router-link to="/customer/userInfo">
        <div class="content">
          <div class="seller-head-img">
            <img :src="fanHeadImg" alt="" />
          </div>
          <div class="info">
            <div class="name">{{ fanNickName }}<i class=""></i></div>
            <div class="tips"><span>点击查看个人信息详情</span></div>
          </div>
          <div class="btn"></div>
        </div>
      </router-link>
    </div>
    <div class="main">
      <div class="title">我的功能</div>
      <div class="content">
        <router-link to="/common/myGifts">
          <div class="item">
            <i class="icon icon-gift"></i>
            <div class="name">我的礼品</div>
          </div>
        </router-link>
        <router-link to="/common/myPoints">
          <div class="item">
            <i class="icon icon-integral"></i>
            <div class="name">我的积分</div>
          </div>
        </router-link>
        <div class="item" @click="handleClickMySeller">
          <i class="icon icon-seller"></i>
          <div class="name">我的零售户</div>
        </div>
        <router-link to="/common/feedback?feedFrom=1">
          <div class="item">
            <i class="icon icon-opinion"></i>
            <div class="name">意见反馈</div>
          </div>
        </router-link>
      </div>
      <div class="content">
        <div class="item">
          <i class="icon icon-survey"></i>
          <div class="name">我的问卷</div>
        </div>
        <div class="item">
          <i class="icon icon-appraise"></i>
          <div class="name">我的品吸</div>
        </div>
        <div class="item"></div>
        <div class="item"></div>
      </div>
    </div>
  </div>
  <popup-with-head
    :show="showShopDetail"
    :headImgStyle="{
      width: '80vw',
      height: '52.26667vw ',
      borderRadius: '2.66667vw'
    }"
    :headImg="shopDetail.shopImg"
    needCloseBtn
    @confirm="showShopDetail = false"
    @cancel="showShopDetail = false"
  >
    <template #content>
      <div class="shop-detail-container">
        <div class="shop-detail-title">
          {{ shopDetail.shopName }}
          <span class="btn-unbind" @click="handleClickUnbind">解绑零售户</span>
        </div>
        <div class="shop-detail-content">地址：{{ shopDetail.addr }}</div>
        <div class="shop-detail-content">
          电话：{{ shopDetail.contactPhone }}
        </div>
      </div>
    </template>
    <div></div>
  </popup-with-head>
</template>

<script lang="ts">
import { http } from '@/http'
import { Dialog, Toast } from 'vant'
import { defineComponent, onMounted, ref } from 'vue'
import PopupWithHead from '@/components/PopupWithHead/index.vue'

interface ShopDetail {
  id: number | null
  shopImg: string
  shopName: string
  contactPhone: string
  addr: string
}

export default defineComponent({
  name: 'CustomerInfo',
  components: { PopupWithHead },
  setup() {
    const fanNickName = ref('')
    const fanHeadImg = ref('')
    const shopDetail = ref<ShopDetail>({
      id: null,
      shopImg: '',
      shopName: '',
      contactPhone: '',
      addr: ''
    })
    const showShopDetail = ref(false)
    const getSellerInfo = () => {
      http
        .post('/hbSeller/fans/personalInfo/query', {}, false)
        .then((res) => {
          if (res.code === '200') {
            fanNickName.value = res.data.info.fanNickName
            fanHeadImg.value = res.data.info.fanHeadImg
          } else {
            Toast.fail(res.msg)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
    const handleClickMySeller = () => {
      if (shopDetail.value.id !== null) {
        showShopDetail.value = true
        return
      }
      http
        .post('/hbSeller/fans/personalInfo/shopInfo', {}, false)
        .then((res) => {
          if (res.code === '200') {
            if (res.data.shopInfo) {
              shopDetail.value.id = res.data.shopInfo.id
              shopDetail.value.shopImg = res.data.shopInfo.shopImg
              shopDetail.value.shopName = res.data.shopInfo.shopName
              shopDetail.value.contactPhone = res.data.shopInfo.contactPhone
              shopDetail.value.addr =
                res.data.shopInfo.provName +
                res.data.shopInfo.cityName +
                res.data.shopInfo.detailAddr
              showShopDetail.value = true
            } else {
              Toast.fail('您还未绑定零售户！')
            }
          } else {
            Toast.fail(res.msg)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }

    const handleClickUnbind = () => {
      Dialog.confirm({
        title: '提示',
        message:
          '尊敬的用户，解绑零售户，需在公众号留言“解绑零售户”，由客服人员后台操作处理，解绑前需领取未领取的奖品，如已领取请忽略，绑定关系解除后，已产生的相关活动数据会中断，需重新绑定零售户后参与店铺活动。',
        closeOnClickOverlay: true,
        confirmButtonText: '知道了'
      })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
        })
    }

    onMounted(() => {
      getSellerInfo()
    })

    return {
      fanNickName,
      fanHeadImg,
      shopDetail,
      showShopDetail,
      handleClickMySeller,
      handleClickUnbind
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
      'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/personal/c-head-bg.png'
    );
    background-size: 375px 170px;
    margin-bottom: -42px;
    .content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 23px 13px 0;
      .seller-head-img {
        width: 84px;
        height: 84px;
        img {
          display: block;
          width: 60px;
          height: 60px;
          margin: 12px auto;
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
        }
        .tips {
          color: #fff;
          height: 25px;
          line-height: 25px;
          margin-left: 5px;
          font-size: 12px;
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
      margin-bottom: 20px;
      margin-left: 8px;
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
          &.icon-seller {
            .bg-img(33px, 33px, @icon-seller);
          }
          &.icon-appraise {
            .bg-img(33px, 33px, @icon-appraise);
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
.shop-detail-container {
  padding-top: 110px;
  margin: 0 17px -8vw;
  box-sizing: border-box;
  .shop-detail-title {
    height: 27px;
    font-size: 20px;
    font-weight: bold;
    line-height: 27px;
    color: #303133;
    margin-bottom: 6px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    .btn-unbind {
      float: right;
      width: 67px;
      height: 26px;
      background: rgba(32, 105, 255, 0.06);
      border: 1px solid #2069ff;
      line-height: 26px;
      text-align: center;
      color: #2069ff;
      font-size: 12px;
      border-radius: 5px;
      box-sizing: border-box;
    }
  }
  .shop-detail-content {
    height: 27px;
    font-size: 14px;
    line-height: 27px;
    color: #303133;
    margin-bottom: 6px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
