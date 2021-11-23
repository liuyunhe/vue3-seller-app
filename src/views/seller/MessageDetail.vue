<template>
  <div class="message-detail-container">
    <template v-if="showMsg">
      <div class="message-item">
        <div class="icon">
          <img
            src="https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/msg-icon.png"
            alt=""
          />
        </div>
        <div class="content">
          <div class="head">
            <div class="title">{{ title }}</div>
            <div class="time">{{ sendTime }}</div>
          </div>
          <div class="foot">{{ subTitle }}</div>
        </div>
      </div>
      <!-- <div class="act-img">
      <img
        src="https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/invite-fans-bg.png"
        alt=""
      />
    </div> -->
      <div class="note">
        <div class="title">
          <i class="icon"></i>
          <div class="text">详细内容</div>
        </div>
        <p>
          {{ msgContent }}
        </p>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { http } from '@/http'
import { Toast } from 'vant'
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  name: 'SelllerMessageDetail',
  props: {
    id: {
      type: String,
      requried: true
    }
  },
  setup(props) {
    const showMsg = ref(false)
    const title = ref('')
    const subTitle = ref('')
    const msgContent = ref('')
    const sendTime = ref('')
    const getMessageInfo = () => {
      http
        .post('/hbSeller/sellerMsg/sysMsgItem', { msgId: props.id }, false)
        .then((res) => {
          if (res.code === '200') {
            title.value = res.data.title
            subTitle.value = res.data.subTitle
            msgContent.value = res.data.msgContent
            sendTime.value = res.data.sendTime
            showMsg.value = true
          } else {
            Toast.fail(res.msg)
          }
        })
    }
    onMounted(() => {
      getMessageInfo()
    })
    return {
      showMsg,
      title,
      subTitle,
      msgContent,
      sendTime
    }
  }
})
</script>

<style lang="less" scoped>
@import '@/theme/common';
.message-detail-container {
  padding: 15px;
  box-sizing: border-box;
  min-height: 100vh;
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
        .text-overflow();
      }
      .time {
        width: 134px;
        line-height: 30px;
        font-size: 12px;
        color: #999999;
        text-align: right;
        .text-overflow();
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
  .act-img {
    width: 100%;
    margin-bottom: 10px;
    img {
      display: block;
      width: 100%;
      border-radius: 5px;
    }
  }
  .note {
    width: 345px;
    background: #ffffff;
    border-radius: 10px;
    margin: 0 auto;
    padding: 20px 15px;
    box-sizing: border-box;
    .title {
      height: 25px;
      line-height: 25px;
      .icon {
        float: left;
        width: 5px;
        height: 17px;
        margin-top: 4px;
        background: #527dfd;
        box-shadow: 0px 2px 3px rgba(2, 113, 253, 0.49);
        border-radius: 3px;
      }
      .text {
        float: left;
        font-size: 16px;
        margin-left: 8px;
        color: #2b333b;
      }
    }
    p {
      font-size: 14px;
      line-height: 28px;
      color: #666666;
    }
  }
}
</style>
