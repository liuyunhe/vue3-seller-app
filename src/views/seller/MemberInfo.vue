<template>
  <div class="member-info-container">
    <div class="head">
      <div class="content">
        <div class="seller-head-img">
          <img :src="headimgurl" alt="" />
        </div>
        <div class="info">
          <div class="name">{{ shopName }}<i class=""></i></div>
          <div class="member">
            <span class="lv">LV{{ shopLevel }} {{ levelName }}</span
            ><span class="title"></span>
          </div>
        </div>
      </div>
      <div class="lv-content">
        <div class="lv-num">LV{{ shopLevel }}</div>
        <div class="lv-bar">
          <div class="active" :style="{ width: `${levelBarWidth}%` }"></div>
        </div>
        <div class="lv-num">LV{{ shopLevel + 1 }}</div>
      </div>
      <!-- <div class="tips">再增加11个粉丝可升值3级紫钻会员</div> -->
    </div>
    <div class="main">
      <div class="title">零售户等级制度</div>
      <div class="content">
        <div class="level title">等级</div>
        <div class="jf title">所需积分</div>
        <div class="name title">名称</div>
      </div>
      <div class="content" v-for="item in shopLevelList" :key="item.id">
        <div class="level text">LV{{ item.shopLevel }}</div>
        <div class="jf text">
          {{ item.levelScoreMin }} - {{ item.levelScoreMax }}积分
        </div>
        <div class="name text">{{ item.levelName }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { http } from '@/http'
import { Toast } from 'vant'
import { defineComponent, onMounted, ref } from 'vue'

interface ShopLevel {
  id: number
  status: number
  shopLevel: number
  levelName: string
  levelIcon: string
  levelScoreMin: number
  levelScoreMax: number
}

export default defineComponent({
  name: 'SellerMemberInfo',
  setup() {
    const shopName = ref('')
    const headimgurl = ref('')
    const shopLevel = ref(0)
    const levelName = ref('')
    const upgradeScore = ref(0)
    const levelBarWidth = ref(0)
    const shopLevelList = ref<ShopLevel[]>([])
    const getSellerInfo = () => {
      http
        .post('/hbSeller/sellerPerson/personInfo', {}, false)
        .then((res) => {
          if (res.code === '200') {
            shopName.value = res.data.personInfo.shopName
            headimgurl.value = res.data.personInfo.headimgurl
            shopLevel.value = res.data.personInfo.shopLevel as number
            levelName.value = res.data.levelCode.levelName
            upgradeScore.value = res.data.upgradeScore
            const levelScore =
              res.data.levelCode.levelScoreMax -
              res.data.levelCode.levelScoreMin +
              1
            levelBarWidth.value =
              ((levelScore - upgradeScore.value) / levelScore) * 100
          } else {
            Toast.fail(res.msg)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
    const getMemberInfo = () => {
      http
        .post('/hbSeller/sellerPerson/shopLevelList', {}, false)
        .then((res) => {
          if (res.code === '200') {
            shopLevelList.value = res.data.levelCodeList
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
      getMemberInfo()
    })
    return {
      shopName,
      headimgurl,
      shopLevel,
      levelName,
      upgradeScore,
      levelBarWidth,
      shopLevelList
    }
  }
})
</script>

<style lang="less" scoped>
@import '@/theme/common';
.member-info-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .head {
    .bg-img(
      375px,
      170px,
      'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/personal/member-head-bg.png'
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
    .lv-content {
      margin-left: 83px;
      margin-top: -6px;
      margin-bottom: 6px;
      display: flex;
      height: 17px;
      justify-content: left;
      align-items: center;

      .lv-num {
        width: fit-content;
        margin: 0 10px;
        color: #fff;
        font-size: 12px;
        line-height: 17px;
      }
      .lv-bar {
        width: 209px;
        height: 10px;
        border-radius: 10px;
        background: #9c9da0;
        .active {
          width: 0;
          height: 10px;
          border-radius: 10px;
          background: linear-gradient(
            90deg,
            #ffe565 0%,
            #ffb430 90%,
            #ff9900 100%
          );
        }
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
    padding: 24px 20px;
    box-sizing: border-box;
    .title {
      height: 24px;
      font-size: 17px;
      font-weight: bold;
      line-height: 25px;
      color: #333333;
      margin-bottom: 20px;
    }
    .content {
      display: flex;
      justify-content: space-between;
      margin: 0 16px;
      flex: 1;
      .line1 {
        line-height: 40px;
        font-size: 14px;
        text-align: center;
        background: #ffcc4a;
        color: #000;
        margin-bottom: 0;
        border-bottom: 1px solid rgba(226, 226, 225, 0.5);
        border-right: 1px solid rgba(226, 226, 225, 0.5);
      }
      .line2 {
        line-height: 40px;
        font-size: 14px;
        text-align: center;
        color: #ffb430;
        border-bottom: 1px solid rgba(226, 226, 225, 0.5);
        border-left: 1px solid rgba(226, 226, 225, 0.5);
        border-radius: unset;
      }
      .level {
        width: 105px;
        height: 40px;
        border-radius: 5px 0px 0px 0px;
        &.title {
          .line1();
        }
        &.text {
          .line2();
        }
      }
      .jf {
        width: 123px;
        height: 40px;
        &.title {
          .line1();
        }
        &.text {
          .line2();
        }
      }
      .name {
        width: 115px;
        height: 40px;
        border-radius: 0px 5px 0px 0px;
        &.title {
          .line1();
        }
        &.text {
          .line2();
          border-right: 1px solid rgba(226, 226, 225, 0.5);
        }
      }
    }
  }
}
</style>
