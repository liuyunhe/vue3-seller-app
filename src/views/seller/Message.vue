<template>
  <div class="message-container">
    <template v-for="item in messageList" :key="item.id">
      <router-link :to="`/seller/messageDetail?id=${item.id}`">
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
  name: 'SellerMessage',
  setup() {
    const messageList = ref<Message[]>([])
    const getMessageList = () => {
      http.post('/hbSeller/sellerMsg/sysMsgList', {}, false).then((res) => {
        if (res.code === '200') {
          messageList.value = res.data
        } else {
          Toast.fail(res.msg)
        }
      })
    }
    onMounted(() => {
      getMessageList()
    })
    onActivated(() => {
      console.log('Activated!')
    })
    onDeactivated(() => {
      console.log('Deactivated')
    })
    return {
      messageList
    }
  }
})
</script>

<style lang="less" scoped>
.message-container {
  padding: 15px;
  box-sizing: border-box;
  min-height: 100%;
  background-color: #f4f4f4;
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
