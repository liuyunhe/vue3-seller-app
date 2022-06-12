<template>
  <div class="my-points-container">
    <template v-if="!loading">
      <div class="head">
        <div class="headImg">
          <img :src="headimg" alt="" />
        </div>
        <div class="user-info">
          <div class="t">{{ nickname }}</div>
          <div class="numb">{{ point }}荷石璧</div>
        </div>
      </div>
      <div class="title">积分明细</div>
      <template v-if="myPoints == null || myPoints.length === 0">
        <div class="no-message">
          暂无积分
        </div>
      </template>
      <template v-else>
        <div class="list">
          <div class="item" v-for="item in myPoints" :key="item.id">
            <div class="left">
              <div class="name">{{ item.txnDesc }}</div>
              <div class="time">{{ item.createTime }}</div>
            </div>
            <div class="right" :class="{ plus: item.txnType === 1 }">
              {{ item.txnType === 1 ? '+' : '-' }}{{ item.txnPoints }}
            </div>
          </div>
        </div>
      </template>
      <div class="mb15"></div>
    </template>
  </div>
</template>

<script lang="ts">
import { http } from '@/http'
import { Toast } from 'vant'
import { defineComponent, onMounted, ref } from 'vue'

interface Point {
  createTime: string
  id: number
  txnDesc: string
  txnPoints: number
  updateTime: string
  txnType: number
}

export default defineComponent({
  name: 'MyPoints',
  props: {
    shopName: {
      type: String
    }
  },
  setup(props) {
    const loading = ref(true)
    const point = ref<number | null>(null)
    const headimg = ref<string>('')
    const myPoints = ref<Point[] | null>(null)
    const nickname = ref('')
    const getUserInfo = () => {
      http
        .get('/syx/user/info', {})
        .then((res) => {
          loading.value = false
          if (res.code === '200') {
            point.value = res.data.point
            headimg.value = res.data.user.headimg
            if (props.shopName) {
              nickname.value = props.shopName
            } else {
              nickname.value = res.data.user.nickname
            }
          } else {
            Toast.fail(res.msg)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
    const getPoints = () => {
      http
        .get('/syx/user/score/list', {})
        .then((res) => {
          if (res.code === '200') {
            myPoints.value = res.data
          } else {
            Toast.fail(res.msg)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
    onMounted(() => {
      getUserInfo()
      getPoints()
    })

    return {
      loading,
      myPoints,
      point,
      headimg,
      nickname
    }
  }
})
</script>

<style lang="less" scoped>
@import '@/theme/common';
.my-points-container {
  min-height: 100vh;
  background-color: #f7f7f7;
  .head {
    .bg-img(
      375px,
      108px,
      'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/bg-my-points.png'
    );
    padding: 12px 10px 0;
    box-sizing: border-box;
    .headImg {
      float: left;
      width: 84px;
      height: 84px;
      img {
        display: block;
        width: 60px;
        border-radius: 50%;
        margin: 12px auto;
      }
    }
    .user-info {
      float: left;
      margin-left: 5px;
      padding-top: 10px;
      box-sizing: border-box;
      .t {
        height: 20px;
        line-height: 20px;
        font-size: 12px;
        color: #ffffff;
      }
      .numb {
        height: 50px;
        line-height: 50px;
        font-size: 35px;
        color: #ffffff;
        margin-left: -5px;
      }
    }
  }
  .title {
    margin-left: 30px;
    height: 33px;
    line-height: 33px;
    font-size: 12px;
    color: #999;
  }
  .list {
    margin: 0 15px;
    background: #fff;
    .item {
      height: 70px;
      padding: 13px 15px 0;
      border: 1px solid #f6f6f6;
      box-sizing: border-box;
      .left {
        float: left;
        width: 200px;
        .name {
          height: 20px;
          font-size: 14px;
          line-height: 20px;
          color: #303133;
          margin-bottom: 5px;
          .text-overflow();
        }
        .time {
          height: 17px;
          font-size: 12px;
          line-height: 17px;
          color: #b1b1b1;
          .text-overflow();
        }
      }
      .right {
        float: right;
        height: 42px;
        line-height: 42px;
        font-size: 16px;
        color: #ef3c35;
        &.plus {
          color: rgb(32, 187, 32);
        }
      }
    }
  }
  .mb15 {
    height: 15px;
  }
  .no-message {
    position: relative;
    top: 200px;
    line-height: 30px;
    text-align: center;
    font-size: 14px;
    color: #b1b1b1;
  }
}
</style>
