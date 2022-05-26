<template>
  <div class="seller-rebate-detail-container">
    <van-tabs v-model:active="activeName" title-active-color="#0271FD" sticky>
      <div class="list">
        <van-tab title="红包" name="hb">
          <template v-if="showNoHb">
            <div class="no-message">
              暂无红包
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
                    <div class="title">{{ item.scanNickname }}</div>
                    <div class="time">{{ item.ctime }}</div>
                  </div>
                  <div class="foot">
                    <div class="brand">{{ item.prodName }}</div>
                    <div class="value">+{{ item.rebateValue }}鼓励金</div>
                  </div>
                </div>
              </div>
            </template>
          </van-list>
          <div class="h30"></div>
        </van-tab>
        <van-tab title="积分" name="jf">
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
                    <div class="title">{{ item.scanNickname }}</div>
                    <div class="time">{{ item.ctime }}</div>
                  </div>
                  <div class="foot">
                    <div class="brand">{{ item.prodName }}</div>
                    <div class="value">+{{ item.rebateValue }}积分</div>
                  </div>
                </div>
              </div>
            </template>
          </van-list>
          <div class="h30"></div>
        </van-tab>
      </div>
    </van-tabs>
  </div>
</template>

<script lang="ts">
import { http } from '@/http'
import { Toast } from 'vant'
import { defineComponent, ref } from 'vue'
interface RebateItem {
  id: number
  scanNickname: string
  prodName: string
  ctime: string
  rebateValue: number
  type: number
}
export default defineComponent({
  name: 'SellerRebateDetail',
  setup() {
    const activeName = ref<'hb' | 'js'>('hb')

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
      type: '3',
      page: 0,
      pageSize: 20
    }
    const getHbList = () => {
      http
        .post('/hbSeller/seller/rebate/detail', hbParams, false)
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
      type: '6',
      page: 0,
      pageSize: 20
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const getJfList = () => {
      http
        .post('/hbSeller/seller/rebate/detail', jfParams, false)
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
    return {
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
.seller-rebate-detail-container {
  height: 100vh;
  background-color: #f4f4f4;
  overflow: scroll;
  .list {
    // height: calc(100vh - 44px);
    padding: 10px 15px;
    box-sizing: border-box;
    // overflow: scroll;
  }
  .no-message {
    position: relative;
    top: 200px;
    line-height: 30px;
    text-align: center;
    font-size: 14px;
    color: #b1b1b1;
  }
  .message-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
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
        font-size: 16px;
        color: #2b333b;
        text-align: left;
        .text-overflow();
      }
      .time {
        width: 134px;
        line-height: 30px;
        font-size: 12px;
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
  .h30 {
    height: 30px;
  }
}
</style>
