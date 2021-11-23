<template>
  <div class="message-container">
    <van-tabs v-model:active="activeName" title-active-color="#0271FD">
      <div class="list">
        <van-tab title="平台消息" name="sys">
          <template v-if="sysMessageList.length === 0">
            <div class="no-message">
              暂无消息
            </div>
          </template>
          <template v-for="item in sysMessageList" :key="item.id">
            <router-link :to="`/customer/messageDetail?id=${item.id}&type=sys`">
              <div class="message-item">
                <div class="icon">
                  <img
                    src="https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/msg-icon.png"
                    alt=""
                  />
                </div>
                <div class="content">
                  <div class="head">
                    <div class="title">{{ item.title }}</div>
                    <div class="time">{{ item.sendTime }}</div>
                  </div>
                  <div class="foot">{{ item.subTitle }}</div>
                </div>
              </div>
            </router-link>
          </template>
        </van-tab>
        <van-tab title="店铺消息" name="shop">
          <template v-if="shopMessageList.length === 0">
            <div class="no-message">
              暂无消息
            </div>
          </template>
          <template v-for="item in shopMessageList" :key="item.id">
            <router-link
              :to="`/customer/messageDetail?id=${item.id}&type=shop`"
            >
              <div class="message-item">
                <div class="icon">
                  <img
                    src="https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/msg-icon.png"
                    alt=""
                  />
                </div>
                <div class="content">
                  <div class="head">
                    <div class="title">{{ item.title }}</div>
                    <div class="time">{{ item.sendTime }}</div>
                  </div>
                  <div class="foot">{{ item.subTitle }}</div>
                </div>
              </div>
            </router-link>
          </template>
        </van-tab>
      </div>
    </van-tabs>
  </div>
</template>

<script lang="ts">
import { http } from '@/http'
import { Toast } from 'vant'
import {
  defineComponent,
  onActivated,
  onDeactivated,
  onMounted,
  ref
} from 'vue'
interface Message {
  id: number
  title: string
  subTitle: string
  sendTime: string
}
export default defineComponent({
  name: 'CustomerMessage',
  setup() {
    const activeName = ref<'sys' | 'shop'>('sys')
    const sysMessageList = ref<Message[]>([])
    const shopMessageList = ref<Message[]>([])
    const getSysMessageList = () => {
      http.post('/hbSeller/fans/msg/system', {}, false).then((res) => {
        if (res.code === '200') {
          sysMessageList.value = res.data
        } else {
          Toast.fail(res.msg)
        }
      })
    }
    const getShopMessageList = () => {
      http.post('/hbSeller/fans/msg/shop/query', {}, false).then((res) => {
        if (res.code === '200') {
          shopMessageList.value = res.data
        } else {
          Toast.fail(res.msg)
        }
      })
    }
    onMounted(() => {
      getSysMessageList()
      getShopMessageList()
    })
    onActivated(() => {
      console.log('Activated!')
    })
    onDeactivated(() => {
      console.log('Deactivated')
    })
    return {
      activeName,
      sysMessageList,
      shopMessageList
    }
  }
})
</script>

<style lang="less" scoped>
@import '@/theme/common';
.message-container {
  min-height: 100%;
  background-color: #f4f4f4;
  .list {
    padding: 10px 15px;
    box-sizing: border-box;
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
    padding: 17px 10px;
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
      flex: 1;
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
        font-size: 12px;
        color: #999999;
        text-align: right;
      }
    }
    .foot {
      height: 20px;
      font-size: 12px;
      font-weight: 500;
      line-height: 20px;
      color: #999999;
    }
  }
}
</style>
