<template>
  <div class="customer-home-container">
    <ul class="act-list">
      <template v-for="item in actList" :key="item.id">
        <router-link :to="CUSTOMER_ACT_LINK[item.actTypeCode]">
          <li class="act-item">
            <div class="img">
              <img :src="item.actPic" alt="" />
            </div>
            <div class="bottom">
              <div class="content">
                <div class="title">{{ item.actName }}</div>
                <div class="time">{{ item.stime }} - {{ item.etime }}</div>
              </div>
              <div class="btn"></div>
            </div>
          </li>
        </router-link>
      </template>
    </ul>
    <p class="building-tips">— 更多活动 敬请期待 —</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { http } from '@/http'
import { Toast } from 'vant'
import { CUSTOMER_ACT_LINK } from '@/plugins/acts-link'

interface Act {
  id: number
  status: number
  actTypeCode: string
  actCode: string
  stime: string
  etime: string
  actName: string
  actPic: string
}

export default defineComponent({
  name: 'CustomerActs',
  setup() {
    const actList = ref<Act[]>([])
    const formatTime = (time: string) => {
      const timestamp = Date.parse(time.replace(/-/g, '/'))
      return (
        new Date(timestamp).getMonth() +
        1 +
        '月' +
        new Date(timestamp).getDate() +
        '日' +
        ' ' +
        (new Date(timestamp).getHours() < 10
          ? '0' + new Date(timestamp).getHours()
          : new Date(timestamp).getHours()) +
        ':' +
        (new Date(timestamp).getMinutes() < 10
          ? '0' + new Date(timestamp).getMinutes()
          : new Date(timestamp).getMinutes())
      )
    }
    const getActList = () => {
      http.post('/hbSeller/act/list', {}, false).then((res) => {
        if (res.code === '200') {
          if (res.data) {
            actList.value = res.data.map((item: Act) => {
              item.stime = formatTime(item.stime)

              item.etime = formatTime(item.etime)
              return item
            })
          } else {
            actList.value = []
          }
        } else {
          Toast.fail(res.msg)
        }
      })
    }
    onMounted(() => {
      getActList()
    })
    return {
      CUSTOMER_ACT_LINK,
      actList
    }
  }
})
</script>

<style lang="less" scoped>
@import '@/theme/common';
.customer-home-container {
  min-height: 100%;
  margin: 0 15px;
  padding-top: 15px;
  box-sizing: border-box;
  .act-list {
    .act-item {
      width: 345px;
      height: 205px;
      margin-bottom: 15px;
      border-radius: 8px;
      background-color: #fff;
      .img {
        width: 345px;
        height: 140px;
        img {
          display: block;
          width: 345px;
          height: 140px;
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
        }
      }
      .bottom {
        display: flex;
        height: 65px;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        .content {
          .title {
            height: 24px;
            font-size: 17px;
            font-weight: bolder;
            line-height: 24px;
            color: #303133;
          }
          .time {
            margin-top: 5px;
            height: 17px;
            font-size: 12px;
            font-weight: 400;
            line-height: 17px;
            color: #b1b1b1;
          }
        }
        .btn {
          .bg-img(
            85px,
            28px,
            'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/act/btn-enter.png'
          );
        }
      }
    }
  }
  p.building-tips {
    height: 33px;
    text-align: center;
    font-size: 14px;
    line-height: 13px;
    color: #b1b1b1;
  }
}
</style>
