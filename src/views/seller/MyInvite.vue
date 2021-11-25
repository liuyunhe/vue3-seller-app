<template>
  <div class="my-invite-container">
    <template v-if="inviteMsgList.length === 0">
      <div class="no-message">
        暂无活动邀约，赶快去创建吧！
      </div>
    </template>
    <ul class="content">
      <li class="message" v-for="item in inviteMsgList" :key="item.id">
        <router-link :to="`/seller/inviteDetail?id=${item.id}`">
          <div class="container">
            <div class="title">
              <div class="text">
                {{ item.title }}
              </div>
              <span> {{ item.ctime }}</span>
            </div>
            <div class="sub-title">
              <div class="text">
                {{ item.subTitle }}
              </div>
              <span v-if="item.status === 0" style="color:#FFAD20">审核中</span>
              <span v-if="item.status === 1" style="color:#0180FF">已发送</span>
              <span v-if="item.status === 2" style="color:#FF3400"
                >审核失败</span
              >
            </div>
            <!-- <div class="border-line"></div> -->
            <!-- <div class="content">{{ item.msgContent }}</div> -->
          </div>

          <div class="audit-msg" v-if="item.status === 2">
            未审核通过原因：{{ item.auditMsg }}
          </div>
        </router-link>
      </li>
    </ul>
    <div class="btn" @click="showTplList = true">新建活动邀约</div>
  </div>
  <van-popup v-model:show="showTplList" style="border-radius:2.6vw">
    <div class="tpl-list">
      <ul>
        <li v-for="item in msgTplList" :key="item.id">
          <div class="title">{{ item.title }}</div>
          <div class="content">
            <p class="text">{{ item.subTitle }}</p>
            <router-link
              replace
              :to="
                `/seller/editInvition?title=${item.title}&subTitle=${item.subTitle}&content=${item.content}`
              "
            >
              <div class="btn">选择</div>
            </router-link>
          </div>
          <!-- <div class="time">{{ item.ctime }}</div> -->
        </li>
      </ul>
    </div>
  </van-popup>
</template>

<script lang="ts">
import { http } from '@/http'
import { Toast } from 'vant'
import { defineComponent, onMounted, ref } from 'vue'

interface InviteMsg {
  id: number
  title: string //  主标题
  subTitle: string //副标题
  msgContent: string // 内容
  shopId: number
  status: number // 待审核, 1:审核通过, 2: 审核未通过
  auditMsg: string
  ctime: string
}
interface MsgTpl {
  id: number
  rcdNote: string | null
  title: string
  subTitle: string
  content: string
  idx: number
  ctime: string
}

export default defineComponent({
  name: 'MyInvite',
  setup() {
    const inviteMsgList = ref<InviteMsg[]>([])
    const msgTplList = ref<MsgTpl[]>([
      {
        id: 0,
        rcdNote: null,
        title: 'title2',
        subTitle: 'sub2',
        content: '33',
        idx: 1,
        ctime: ''
      },
      {
        id: 0,
        rcdNote: null,
        title: 'title2',
        subTitle: 'sub2',
        content: '33',
        idx: 1,
        ctime: ''
      }
    ])
    const showTplList = ref(false)
    const getMsgTplList = () => {
      http
        .post('/hbSeller/sellerInvite/msgTplList', {}, false)
        .then((res) => {
          if (res.code === '200') {
            msgTplList.value = res.data.msgTplList
          } else {
            Toast.fail(res.msg)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
    const getInviteMsgList = () => {
      http
        .post('/hbSeller/sellerInvite/inviteMsgList', {}, false)
        .then((res) => {
          if (res.code === '200') {
            inviteMsgList.value = res.data
          } else {
            Toast.fail(res.msg)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
    onMounted(() => {
      getInviteMsgList()
      getMsgTplList()
    })
    return {
      inviteMsgList,
      msgTplList,
      showTplList
    }
  }
})
</script>

<style lang="less" scoped>
@import '@/theme/common';
.my-invite-container {
  height: 100vh;
  background: #f6f6f6;
  .no-message {
    position: absolute;
    width: 100%;
    top: 200px;
    line-height: 30px;
    text-align: center;
    font-size: 14px;
    color: #b1b1b1;
  }
  ul {
    height: calc(100vh - 66px);
    padding-top: 10px;
    box-sizing: border-box;
    overflow-y: scroll;
    li {
      width: 100%;
      // height: 95px;
      background: #fff;
      // border-radius: 7px;
      margin-bottom: 10px;
      &:last-child {
        margin-bottom: 0;
      }
      .container {
        padding: 12px 15px;
        box-sizing: border-box;
        .title {
          height: 23px;
          font-size: 16px;
          font-weight: 500;
          line-height: 23px;
          color: #2b333b;
          margin-bottom: 5px;
          .text {
            width: 200px;
            float: left;
            .text-overflow();
          }
          span {
            font-size: 12px;
            float: right;
            color: #b1b1b1;
          }
        }
        .sub-title {
          height: 23px;
          font-size: 14px;
          font-weight: 500;
          line-height: 23px;
          color: #b1b1b1;
          margin-bottom: 5px;
          .text {
            width: 280px;
            float: left;
            .text-overflow();
          }
          span {
            font-size: 12px;
            float: right;
            color: #0180ff;
          }
        }
        .border-line {
          height: 2px;
          border-bottom: 1px solid #e6e6e6;
          margin-bottom: 12px;
        }
        .content {
          // height: 20px;
          font-size: 14px;
          font-weight: 500;
          line-height: 20px;
          color: #2b2b2b;
          text-align: justify;
        }
      }
      .audit-msg {
        height: 40px;
        font-size: 14px;
        font-weight: 500;
        line-height: 40px;
        background: #fff4ee;
        color: #ff660d;
        padding: 0 15px;
        box-sizing: border-box;
      }
    }
  }
  .btn {
    width: 345px;
    height: 44px;
    line-height: 44px;
    text-align: center;
    color: #fff;
    background: #0271fd;
    opacity: 1;
    border-radius: 4px;
    margin: 0 auto;
    margin-top: 10px;
  }
}
.tpl-list {
  width: 345px;
  max-height: 420px;
  overflow-y: scroll;
  ul {
    margin: 0 15px;
    li {
      height: 107px;
      padding: 11px 0;
      box-sizing: border-box;
      border-bottom: 1px solid #eeeeee;
      .title {
        height: 23px;
        line-height: 23px;
        font-size: 16px;
        color: #2b333b;
        margin-bottom: 3px;
      }
      .content {
        height: 40px;
        position: relative;
        .text {
          position: relative;
          top: 0.1rem;
          width: 231px;
          font-size: 14px;
          height: 40px;
          line-height: 20px;
          color: #666666;
          margin-bottom: 9px;
          word-break: break-word;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .btn {
          position: absolute;
          top: 0;
          right: 0;
          width: 60px;
          height: 32px;
          line-height: 32px;
          text-align: center;
          color: #fff;
          background: #0271fd;
          box-shadow: 0px 2px 3px rgba(2, 113, 253, 0.26);
          border-radius: 4px;
        }
      }
      .time {
        height: 17px;
        font-size: 12px;
        line-height: 17px;
        color: #b1b1b1;
      }
    }
  }
}
</style>
