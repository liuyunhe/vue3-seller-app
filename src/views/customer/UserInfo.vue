<template>
  <div class="userInfo-container">
    <div class="mg10"></div>
    <div class="content">
      <div class="name">头像</div>
      <div class="value headimg">
        <img :src="fanHeadImg" alt="" />
      </div>
    </div>
    <div class="content">
      <div class="name">昵称</div>
      <div class="value">{{ fanNickName }}</div>
    </div>
    <div class="content">
      <div class="name">性别</div>
      <div class="value">{{ fanGender }}</div>
    </div>
    <div class="content">
      <div class="name">生日</div>
      <div class="value">{{ birthday }}</div>
    </div>
    <div class="content">
      <div class="name">手机号</div>
      <div class="value">{{ fanMobile }}</div>
    </div>
    <div class="content" @click="jumpToAddr">
      <div class="name">我的地址</div>
      <div class="btn"></div>
      <div class="value">点击查看</div>
    </div>
  </div>
</template>

<script lang="ts">
import { http } from '@/http'
import { Toast } from 'vant'
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  name: 'CustomerUserInfo',
  setup() {
    const fanHeadImg = ref('')
    const fanNickName = ref('')
    const fanGender = ref('')
    const birthday = ref('')
    const fanMobile = ref('')
    const jumpToAddr = () => {
      window.location.href = '/yx/views/general/addr-mgr.html'
    }
    const getUserInfo = () => {
      http
        .post('/hbSeller/fans/personalInfo/query', {}, false)
        .then((res) => {
          if (res.code === '200') {
            fanHeadImg.value = res.data.info.fanHeadImg
            fanNickName.value = res.data.info.fanNickName
            birthday.value = res.data.info.birthday || '暂无'
            fanMobile.value = res.data.info.fanMobile
            fanGender.value =
              res.data.info.fanGender == 1
                ? '男'
                : res.data.info.fanGender == 2
                ? '女'
                : '暂无'
            fanHeadImg.value = res.data.info.fanHeadImg
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
    })
    return {
      fanHeadImg,
      fanNickName,
      birthday,
      fanMobile,
      fanGender,
      jumpToAddr
    }
  }
})
</script>

<style lang="less" scoped>
@import '@/theme/common';
.userInfo-container {
  height: 100vh;
  .mg10 {
    height: 10px;
    background-color: #f4f4f4;
  }
  .content {
    margin: 0 15px;
    height: 53px;
    border-bottom: 1px solid #e6e6e6;
    font-size: 14px;
    .name {
      float: left;
      height: 53px;
      line-height: 53px;
      color: #323233;
      margin-left: 10px;
    }
    .value {
      float: right;
      height: 53px;
      line-height: 53px;
      color: #b1b1b1;
      margin-right: 10px;
      &.headimg {
        width: 40px;
        height: 40px;
        margin-top: 6px;
        img {
          display: block;
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
      }
    }
    .btn {
      .bg-img(
        8px,
        13px,
        'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/personal/iconfont-go.png'
      );
      float: right;
      margin-top: 20px;
      margin-right: 5px;
      filter: contrast(0.5);
    }
  }
}
</style>
