<template>
  <div class="fans-container">
    <div class="data-bar">
      <div class="data-item">
        <div class="number">{{ fansNum }}</div>
        <div class="name">粉丝数</div>
      </div>
      <div class="data-item">
        <div class="number">{{ sacnCodeNum }}</div>
        <div class="name">扫烟码数</div>
      </div>
      <div class="data-item">
        <div class="number">{{ shopScanActNum }}</div>
        <div class="name">核销数</div>
      </div>
    </div>
    <div class="router-bar">
      <div class="router-item">
        <router-link to="/seller/inviteFans">
          <img
            src="https://qoss.qrmkt.cn/hbseller_client/fans-invite-icon.png"
            alt=""
          />
        </router-link>
      </div>
      <div class="router-item">
        <!-- <router-link to="/seller/inviteFans"> -->
        <img src="https://qoss.qrmkt.cn/hbseller_client/fy-icon.png" alt="" />
        <!-- </router-link> -->
      </div>
    </div>
    <div class="fans-bar">
      <div class="title">我的粉丝</div>
      <div class="list">
        <ul v-if="fansList.length > 0">
          <li v-for="item in fansList" :key="item.id">
            <div class="head-img"><img :src="item.fanHeadImg" alt="" /></div>
            <div class="info">
              <div class="nickname">{{ item.fanNickName }}</div>
              <div class="role">{{ item.fanGender === 1 ? '男' : '女' }}</div>
            </div>
            <div class="time">{{ item.ctime }}</div>
          </li>
        </ul>
        <div class="no-fans-tips" v-else>暂无粉丝</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { http } from '@/http'
import { Toast } from 'vant'
import { defineComponent, onMounted, ref } from 'vue'

interface FanInfo {
  id: number
  fanNickName: string
  fanHeadImg: string
  ctime: string
  fanGender: number
}

export default defineComponent({
  name: 'SellerFans',
  setup() {
    const fansNum = ref<string | number>('') // 粉丝数目
    const sacnCodeNum = ref<string | number>('') // 扫烟码数
    const shopScanActNum = ref<string | number>('') // 核销数量
    const fansList = ref<FanInfo[]>([])

    const getShopData = () => {
      http
        .post('/hbSeller/sellerFans/shopStatis', {}, false)
        .then((res) => {
          if (res.code === '200') {
            if (res.data) {
              fansNum.value = res.data.fansNum || 0
              sacnCodeNum.value = res.data.sacnCodeNum || 0
              shopScanActNum.value = res.data.shopScanActNum || 0
            } else {
              fansNum.value = '0'
              sacnCodeNum.value = '0'
              shopScanActNum.value = '0'
            }
          } else {
            Toast.fail(res.msg)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }

    const getFansList = () => {
      http
        .post('/hbSeller/sellerFans/fanList', {}, false)
        .then((res) => {
          if (res.code === '200') {
            fansList.value = res.data
          } else {
            Toast.fail(res.msg)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }

    onMounted(() => {
      getShopData()
      getFansList()
    })
    return {
      fansNum,
      sacnCodeNum,
      shopScanActNum,
      fansList
    }
  }
})
</script>

<style lang="less" scoped>
.fans-container {
  box-sizing: border-box;
  padding: 13px 11px 0;
  height: 100%;
  overflow: scroll;
  .data-bar {
    display: flex;
    height: 69px;
    justify-content: center;
    align-content: center;
    flex: 1;
    margin-bottom: 5px;
    .data-item {
      width: 117px;
      padding-top: 11px;
      padding-bottom: 18px;
      background-repeat: no-repeat;
      background-size: contain;
      .number {
        height: 21px;
        font-size: 17px;
        text-align: center;
        line-height: 21px;
        color: #2b333b;
      }
      .name {
        height: 19px;
        font-size: 12px;
        text-align: center;
        line-height: 19px;
        color: #2b333b;
      }
      &:nth-child(1) {
        background-image: url('https://qoss.qrmkt.cn/hbseller_client/data-item-1.png');
      }
      &:nth-child(2) {
        background-image: url('https://qoss.qrmkt.cn/hbseller_client/data-item-2.png');
      }
      &:nth-child(3) {
        background-image: url('https://qoss.qrmkt.cn/hbseller_client/data-item-3.png');
      }
      &:nth-child(4) {
        background-image: url('https://qoss.qrmkt.cn/hbseller_client/data-item-4.png');
      }
    }
  }
  .router-bar {
    display: flex;
    height: 92px;
    justify-content: center;
    align-content: center;
    flex: 1;
    margin-bottom: 3px;
    .router-item {
      flex: 1;
      img {
        display: block;
        width: 100%;
        height: 92px;
      }
    }
  }
  .fans-bar {
    .title {
      height: 23px;
      line-height: 23px;
      font-size: 16px;
      font-weight: bold;
      text-align: left;
      color: #2b333b;
      margin: 0 6px 11px;
    }
    .list {
      ul {
        margin: 0 4px;
        li {
          display: flex;
          width: 100%;
          height: 80px;
          margin-bottom: 10px;
          background: #ffffff;
          border-radius: 5px;
          justify-content: space-between;
          align-items: center;
          padding: 0 15px;
          box-sizing: border-box;
          .head-img {
            width: 50px;
            height: 50px;
            img {
              display: block;
              width: 50px;
              height: 50px;
              border-radius: 50%;
            }
          }
          .info {
            width: 110px;
            height: 50px;
            padding: 2px 0;
            box-sizing: border-box;
            .nickname {
              width: 100%;
              height: 20px;
              line-height: 20px;
              font-size: 16px;
              color: #2b333b;
              margin-bottom: 9px;
            }
            .role {
              width: 100%;
              height: 17px;
              line-height: 17px;
              font-size: 14px;
              color: #999999;
            }
          }
          .time {
            width: 130px;
            color: #999999;
            height: 17px;
            font-size: 12px;
            padding-bottom: 22px;
          }
        }
      }
    }
    .no-fans-tips {
      height: 100px;
      line-height: 100px;
      text-align: center;
      color: #999999;
    }
  }
}
</style>
