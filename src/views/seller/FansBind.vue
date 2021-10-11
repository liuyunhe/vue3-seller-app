<template>
  <div class="bind-fans-container">
    <div class="bg">
      <div class="invite-btn">分享好友绑定粉丝</div>
      <div class="note">
        <div class="title">
          <i class="icon"></i>
          <div class="text">邀约规则</div>
        </div>
        <p>
          1、将页面分享给好友，好友获取后点击绑定成为粉丝按钮，绑定成功后，成为零售户的粉丝。
        </p>
        <p>
          2、绑定成为粉丝后，参与活动抽大奖。
        </p>
        <p>
          3、这里是活动规则，需要细化。
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FansBind',
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
@import '../../theme/common.less';
.bind-fans-container {
  height: 100vh;
  background-color: #527dfd;
  .bg {
    .bg-img(
      375px,
      603px,
      'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/invite-fans-bg.png'
    );
    background-position-y: -64px;
    background-size: cover;
    padding-top: 292px;
    box-sizing: border-box;
    .invite-btn {
      width: 182px;
      height: 44px;
      background: linear-gradient(180deg, #fff8d6 0%, #fead2c 100%);
      box-shadow: 0px 6px 4px rgba(2, 113, 253, 0.42);
      border-radius: 4px;
      font-size: 17px;
      margin: 0 auto 45px;
      text-align: center;
      line-height: 44px;
      color: #ce5500;
    }
    .note {
      width: 345px;
      height: 188px;
      background: #ffffff;
      box-shadow: 0px 10px 10px rgba(0, 61, 243, 0.4);
      border-radius: 10px;
      margin: 0 auto;
      padding: 20px 15px;
      box-sizing: border-box;
      overflow-y: scroll;
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
}
</style>
