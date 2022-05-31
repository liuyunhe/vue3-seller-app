<template>
  <div class="seller-my-rebate-container">
    <van-tabs v-model:active="activeName" title-active-color="#0271FD" sticky>
      <div class="list">
        <van-tab title="鼓励金" name="hb">
          <div class="data">
            <div class="title">可提现金额（元）</div>
            <div class="number">
              <span>{{ dataNumber.redpackBalance.toFixed(2) }}</span>
              <!-- <van-button class="btn" type="primary" size="small"
                >提现到微信</van-button
              > -->
            </div>
            <div class="line"></div>
            <div class="bottom">
              <div class="item left">
                <div class="name">总收益（元）</div>
                <div class="number">
                  {{ dataNumber.redpackTotalIncome.toFixed(2) }}
                </div>
              </div>
              <div class="item right">
                <div class="name">总提现（元）</div>
                <div class="number">
                  {{ dataNumber.redpackTotalPay.toFixed(2) }}
                </div>
              </div>
            </div>
          </div>
          <div class="list-title">最近三个月提现明细</div>
          <template v-if="showNoHb">
            <div class="no-message">
              暂无鼓励金
            </div>
          </template>
          <van-list
            v-model:loading="hbLoading"
            :finished="hbFinished"
            :finished-text="hbFinishedText"
            @load="onHbListLoad"
            :offset="10"
          >
            <template v-for="item in hbList" :key="item.id">
              <div class="message-item">
                <!-- <div class="icon">
                  <img
                    src="https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/msg-icon.png"
                    alt=""
                  />
                </div> -->
                <div class="content" style="width:100%">
                  <div class="head">
                    <div class="title">
                      <span v-if="item.status == 1" style="color:#FF7600"
                        >待审核</span
                      >
                      <span v-if="item.status == 2" style="color:#04AB57"
                        >提现完成</span
                      >
                      <span v-if="item.status == 3" style="color:red"
                        >审核未通过</span
                      >
                      <span v-if="item.status == 4" style="color:#FF7600"
                        >待转账</span
                      >
                      <span v-if="item.status == 5" style="color:red"
                        >转账失败</span
                      >
                      <span v-if="item.status == 6" style="color:red"
                        >转账失败</span
                      >
                    </div>
                    <div class="time">+￥{{ item.txAmount.toFixed(2) }}</div>
                  </div>
                  <div class="foot">
                    <div class="brand">{{ item.txTime }}</div>
                  </div>
                </div>
              </div>
            </template>
          </van-list>
        </van-tab>
        <van-tab title="积分" name="js">
          <div class="data">
            <div class="title">可提出积分</div>
            <div class="number">
              <span>{{ dataNumber.pointsBalance }}</span>
              <!-- <van-button class="btn" type="primary" size="small"
                >提取积分</van-button
              > -->
            </div>
            <div class="line"></div>
            <div class="bottom">
              <div class="item left">
                <div class="name">总积分</div>
                <div class="number">{{ dataNumber.pointsTotalIncome }}</div>
              </div>
              <div class="item right">
                <div class="name">总提出积分</div>
                <div class="number">{{ dataNumber.pointsTotalPay }}</div>
              </div>
            </div>
          </div>
          <div class="list-title">最近三个月提现明细</div>
          <template v-if="showNoJf">
            <div class="no-message">
              暂无积分
            </div>
          </template>
          <van-list
            v-model:loading="jfLoading"
            :finished="jfFinished"
            :finished-text="jfFinishedText"
            @load="onJfListLoad"
            :offset="0"
          >
            <template v-for="item in jfList" :key="item.id">
              <div class="message-item">
                <!-- <div class="icon">
                  <img
                    src="https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/msg-icon.png"
                    alt=""
                  />
                </div> -->
                <div class="content" style="width:100%">
                  <div class="head">
                    <div class="title">
                      <span v-if="item.status == 1" style="color:#FF7600"
                        >待审核</span
                      >
                      <span v-if="item.status == 2" style="color:#04AB57"
                        >提现完成</span
                      >
                      <span v-if="item.status == 3" style="color:red"
                        >审核未通过</span
                      >
                      <span v-if="item.status == 4" style="color:#FF7600"
                        >待转账</span
                      >
                      <span v-if="item.status == 5" style="color:red"
                        >转账失败</span
                      >
                      <span v-if="item.status == 6" style="color:red"
                        >转账失败</span
                      >
                    </div>
                    <div class="time">+{{ item.txAmount }}</div>
                  </div>
                  <div class="foot">
                    <div class="brand">{{ item.txTime }}</div>
                  </div>
                </div>
              </div>
            </template>
          </van-list>
        </van-tab>
      </div>
    </van-tabs>
  </div>
</template>

<script lang="ts">
import { http } from '@/http'
import { Toast } from 'vant'
import { defineComponent, onMounted, ref } from 'vue'
interface RebateItem {
  id: number
  txTime: string
  txAmount: number
  status: number //提现状态 1.待审核 2.提现完成 3.审核未通过 4.待转账 5和6 转账失败
}
export default defineComponent({
  name: 'SellerMyRebate',
  setup() {
    const activeName = ref<'hb' | 'js'>('hb')

    const dataNumber = ref({
      redpackTotalIncome: 0, //红包总收益
      redpackTotalPay: 0, //红包提现金额
      redpackBalance: 0, //红包余额
      pointsTotalIncome: 0, //积分总收入
      pointsTotalPay: 0, //积分提现额度
      pointsBalance: 0 //积分余额
    })

    const hbLoading = ref(false)
    const hbFinished = ref(false)
    const showNoHb = ref(false)
    const hbFinishedText = ref('没有更多了')
    const hbList = ref<RebateItem[]>([])

    const jfLoading = ref(false)
    const jfFinished = ref(false)
    const showNoJf = ref(false)
    const jfFinishedText = ref('没有更多了')
    const jfList = ref<RebateItem[]>([])
    const hbParams = {
      page: 0,
      pageSize: 20
    }
    const getMyWallet = () => {
      http.post('/hbSeller/seller/rebate/wallet', {}, false).then((res) => {
        if (res.code === '200') {
          res.data = {
            id: 5,
            sellerId: 30,
            redpackTotalIncome: 4.1, //红包总收益
            redpackTotalPay: 0, //红包提现金额
            redpackBalance: 4.1, //红包余额
            redPackNum: 3,
            rebateNum: 5,
            pointsTotalIncome: 20, //积分总收入
            pointsTotalPay: 0, //积分提现额度
            pointsBalance: 20, //积分余额
            pointsNum: 2,
            ctime: '2022-04-12 13:17:29',
            utime: '2022-04-12 13:25:38'
          }
          if (res.data) {
            dataNumber.value.redpackTotalIncome = res.data.redpackTotalIncome
            dataNumber.value.redpackTotalPay = res.data.redpackTotalPay
            dataNumber.value.redpackBalance = res.data.redpackBalance
            dataNumber.value.pointsTotalIncome = res.data.pointsTotalIncome
            dataNumber.value.pointsTotalPay = res.data.pointsTotalPay
            dataNumber.value.pointsBalance = res.data.pointsBalance
          }
        } else {
          Toast.fail(res.msg)
        }
      })
    }
    const getHbList = () => {
      http
        .post('/hbSeller/seller/rebate/tx/redpack/detail', hbParams, false)
        .then((res) => {
          if (res.code === '200') {
            if (res.data.length < hbParams.pageSize) {
              if (hbParams.page == 1 && res.data.length == 0) {
                hbFinishedText.value = ''
                showNoHb.value = true
              }
              // 数据全部加载完成
              hbFinished.value = true
              hbList.value.push(...res.data)
            } else {
              // 加载状态结束
              hbLoading.value = false
              hbList.value.push(...res.data)
            }
          } else {
            Toast.fail(res.msg)
          }
        })
    }
    const onHbListLoad = () => {
      hbParams.page += 1
      getHbList()
    }
    const jfParams = {
      page: 0,
      pageSize: 20
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const getJfList = () => {
      http
        .post('/hbSeller/seller/rebate/tx/points/detail', jfParams, false)
        .then((res) => {
          if (res.code === '200') {
            if (res.data.length < jfParams.pageSize) {
              if (jfParams.page == 1 && res.data.length == 0) {
                jfFinishedText.value = ''
                showNoJf.value = true
              }
              // 数据全部加载完成
              jfFinished.value = true
              jfList.value.push(...res.data)
            } else {
              // 加载状态结束
              jfLoading.value = false
              jfList.value.push(...res.data)
            }
          } else {
            Toast.fail(res.msg)
          }
        })
    }
    const onJfListLoad = () => {
      jfParams.page += 1
      getJfList()
    }
    onMounted(() => {
      getMyWallet()
    })
    return {
      dataNumber,
      activeName,
      hbLoading,
      hbFinished,
      showNoHb,
      hbFinishedText,
      hbList,
      onHbListLoad,
      jfLoading,
      jfFinished,
      showNoJf,
      jfFinishedText,
      jfList,
      onJfListLoad
    }
  }
})
</script>

<style lang="less" scoped>
@import '@/theme/common';
.seller-my-rebate-container {
  height: 100vh;
  background-color: #f4f4f4;
  overflow: scroll;
  .list {
    // height: calc(100vh - 44px);
    padding: 20px 15px;
    box-sizing: border-box;
    // overflow: scroll;
    .data {
      border-radius: 5px;
      background-color: #fff;
      margin-bottom: 10px;
      padding: 20px 20px 10px;
      box-sizing: border-box;
      .title {
        height: 17px;
        font-size: 12px;
        font-weight: 400;
        color: #303133;
      }
      .number {
        margin: 10px 0 20px;
        height: 38px;
        font-size: 27px;
        font-weight: bold;
        line-height: 38px;
        color: #303133;
        letter-spacing: 1px;
        .btn {
          float: right;
          top: 50%;
          transform: translateY(-50%);
        }
      }
      .line {
        height: 1px;
        background: #e6e6e6;
      }
      .bottom {
        overflow: hidden;
        .item {
          width: 100px;
          .name {
            height: 32px;
            line-height: 32px;
            font-size: 12px;
            font-weight: 400;
            color: #999999;
          }
          .number {
            height: 20px;
            font-size: 15px;
            font-weight: 500;
            line-height: 20px;
            color: #0b0d1b;
            margin: 0;
          }
          &.left {
            float: left;
          }
          &.right {
            float: right;
            text-align: right;
            .number {
              padding-right: 10px;
            }
          }
        }
      }
    }
    .list-title {
      padding-left: 4px;
      height: 40px;
      line-height: 40px;
      font-size: 12px;
      font-weight: 400;
      color: #303133;
    }
  }
  .no-message {
    position: relative;
    top: 150px;
    line-height: 30px;
    text-align: center;
    font-size: 14px;
    color: #b1b1b1;
  }
  .message-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    background-color: #fff;
    margin-bottom: 10px;
    padding: 17px 15px;
    box-sizing: border-box;
    border-radius: 5px;
    .icon {
      width: 46px;
      height: 46px;
      margin-right: 15px;
      img {
        display: block;
        width: 46px;
        height: 46px;
      }
    }
    .head {
      height: 30px;
      display: flex;
      justify-content: space-between;
      .title {
        width: 130px;
        line-height: 30px;
        font-size: 14px;
        color: #2b333b;
        text-align: left;
        .text-overflow();
      }
      .time {
        width: 134px;
        line-height: 30px;
        font-size: 14px;
        color: #999999;
        text-align: right;
      }
    }
    .foot {
      height: 20px;
      display: flex;
      flex: 1;
      justify-content: space-between;
      .brand {
        height: 20px;
        font-size: 12px;
        font-weight: 500;
        line-height: 20px;
        color: #999999;
      }
      .value {
        height: 20px;
        font-size: 12px;
        font-weight: 500;
        line-height: 20px;
        color: #ff7600;
      }
    }
  }
}
</style>
