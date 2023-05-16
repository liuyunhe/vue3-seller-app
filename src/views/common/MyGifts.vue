<template>
  <div class="myGifts-container">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      :finished-text="finishedText"
      @load="onListLoad"
      :offset="10"
    >
      <template v-for="item in giftsList" :key="item.id">
        <div class="lp-item" @click="getReceive(item)">
          <div class="lp-item-borad">
            <div
              class="img-zone"
              :style="{ backgroundImage: `url(${item.awdPic})` }"
            ></div>
            <div class="content-zone">
              <div class="name">{{ item.awdName }}</div>
              <div class="actName">
                {{ item.actName }}
              </div>
              <div class="tips" v-if="item.awdType != 3 && item.awdStatus == 0">
                请在7天内领取
              </div>
              <div class="tips" v-if="item.awdType == 3 && item.awdStatus == 0">
                请在24小时内领取
              </div>
              <div class="tips" v-if="item.awdType == 10">
                48小时内有效，请前往已绑定零售户店领取
              </div>
            </div>
            <div class="receive-btn" v-if="item.awdStatus == 0">待领取</div>
            <div class="receive-btn used" v-if="item.awdStatus == 1">
              已领取
            </div>
            <div class="receive-btn used" v-if="item.awdStatus == 2">
              已过期
            </div>
          </div>
          <div class="lp-item-func">
            <div class="time">中奖时间：{{ item.drawTime }}</div>
            <div
              v-if="item.awdType == 1 && item.awdStatus != 2"
              class="btn"
              @click="jumpToOrder(item.uaId)"
            >
              订单详情
            </div>
          </div>
          <div class="disabled" v-if="item.awdStatus == 2"></div>
        </div>
      </template>
    </van-list>
    <div class="h30"></div>
    <template v-if="showNoGift">
      <div class="page-no-gift"></div>
      <div class="no-gift-tips">暂无礼品</div>
    </template>
    <template v-else></template>
  </div>
</template>

<script lang="ts">
import { http } from '@/http'
import { DrawData, handleReceive } from '@/plugins/hbsDraw'
import { Toast } from 'vant'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MyGifts',
  setup() {
    const loading = ref(false)
    const finished = ref(false)
    const showNoGift = ref(false)
    const finishedText = ref('没有更多了')
    const giftsList = ref<Array<DrawData>>([])
    const params = {
      actTypeMain: 2, //  1: 营销平台, 2:私域平台。
      recordId: 0,
      size: 10
    }
    const getMyGiftsDetail = () => {
      http.get('/syx/awd/list', params).then((res) => {
        if (res.code === '200') {
          if (res.data.length < params.size) {
            if (params.recordId == 1 && res.data.length == 0) {
              finishedText.value = ''
              showNoGift.value = true
            }
            // 数据全部加载完成
            finished.value = true
            giftsList.value.push(...res.data)
          } else {
            // 加载状态结束
            loading.value = false
            giftsList.value.push(...res.data)
          }
        } else {
          Toast.fail(res.msg)
        }
      })
    }
    const onListLoad = () => {
      if (giftsList.value.length - 1 > 0) {
        params.recordId = giftsList.value[giftsList.value.length - 1].id
      }
      getMyGiftsDetail()
    }
    const getReceive = (item: DrawData) => {
      if (item.awdStatus == 0) {
        handleReceive(item, (code) => {
          if (code == '200') {
            item.awdStatus = 1
          }
          console.log('received')
        })
      }
    }
    const jumpToOrder = (id: string) => {
      window.location.href = `/yx/views/general/order-detail.html?uaId=${id}&&hbSeller=1`
    }
    return {
      loading,
      finished,
      showNoGift,
      finishedText,
      giftsList,
      onListLoad,
      jumpToOrder,
      getReceive
    }
  }
})
</script>

<style lang="less" scoped>
@import '@/theme/common';
.myGifts-container {
  height: 100vh;
  background-color: #f4f4f4;
  overflow: scroll;
  padding-top: 16px;
  &:before {
    content: '.';
    display: block;
    height: 0;
    visibility: hidden;
  }
  .page-no-gift {
    background-image: url(https://qrmkt.oss-cn-beijing.aliyuncs.com/common/memberDay/no-gift.png);
    background-repeat: no-repeat;
    background-size: 100%;
    width: 194px;
    height: 164px;
    margin: 0 auto;
    margin-top: 50%;
  }
  .no-gift-tips {
    margin-top: 20px;
    height: 30px;
    line-height: 14px;
    text-align: center;
    color: #b1b1b1;
  }
  .lp-item {
    position: relative;
    margin: 16px auto;
    width: 343px;
    height: 141px;
    padding: 0 10px;
    background-image: url(https://qrmkt.oss-cn-beijing.aliyuncs.com/common/memberDay/gift_bg_normal.png);
    background-repeat: no-repeat;
    background-size: 100%;
    box-sizing: border-box;
    &:first-child {
      margin-top: 0;
    }
    .disabled {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-image: url(https://qrmkt.oss-cn-beijing.aliyuncs.com/common/memberDay/gift_bg_disabled.png);
      background-repeat: no-repeat;
      background-size: 100%;
    }
    .lp-item-borad {
      width: 100%;
      height: 100px;
      padding-top: 20px;
      position: relative;
      box-sizing: border-box;
      .img-zone {
        width: 51px;
        height: 61px;
        margin-left: 17px;
        float: left;
        background-image: url(https://qrmkt.oss-cn-beijing.aliyuncs.com/common/memberDay/hb.png);
        background-repeat: no-repeat;
        background-size: 100%;
        background-position: center;
        background-size: contain;
      }
      .content-zone {
        margin-left: 80px;
        .name {
          width: 150px;
          line-height: 20px;
          font-size: 14px;
          color: #444;
          margin-bottom: 7px;
          overflow: hidden;
          max-height: 40px;
          .text-overflow();
        }
        .actName {
          width: 150px;
          line-height: 20px;
          font-size: 12px;
          color: #444;
          margin-bottom: 7px;
          overflow: hidden;
          max-height: 40px;
          .text-overflow();
        }
        .tips {
          height: 20px;
          line-height: 20px;
          font-size: 12px;
          color: #888888;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .receive-btn {
        position: absolute;
        width: 60px;
        height: 24px;
        right: 0;
        top: 20px;
        box-sizing: border-box;
        border: 1px solid #ff7400;
        border-radius: 2px;
        text-align: center;
        line-height: 24px;
        font-size: 12px;
        color: #ff7400;
        &.used {
          color: #7f7f7f;
          border-color: #7f7f7f;
        }
      }
    }
    .lp-item-func {
      height: 40px;
      position: relative;
      .time {
        height: 40px;
        line-height: 40px;
        color: #888888;
        font-size: 12px;
        width: 250px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .btn {
        position: absolute;
        top: 8px;
        right: 0;
        width: 60px;
        height: 24px;
        background: linear-gradient(
          0deg,
          rgba(255, 150, 0, 1) 0%,
          rgba(255, 114, 0, 1) 100%
        );
        border-radius: 2px;
        text-align: center;
        line-height: 24px;
        font-size: 12px;
        color: #fff;
      }
    }
  }
  .h30 {
    height: 30px;
  }
}
</style>
