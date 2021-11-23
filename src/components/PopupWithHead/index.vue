<template>
  <van-popup
    v-model:show="showPopup"
    :close-on-click-overlay="false"
    style="border-radius:2.6vw;background-color: unset;"
  >
    <img class="popup-icon" :src="headImg" :style="headImgStyle" alt="" />
    <div class="popup-container">
      <slot name="content">
        <div class="text">{{ contentText }}</div>
      </slot>
      <div class="btns">
        <slot name="default">
          <template v-if="needCancelBtn">
            <div class="light" @click="handleClickCancel">取消</div>
            <div class="plain" @click="handleClickConfirm">确定</div>
          </template>
          <template v-else>
            <div class="plain no-cancel" @click="handleClickConfirm">
              {{ confirmBtnText }}
            </div>
          </template>
        </slot>
      </div>
    </div>
    <template v-if="needCloseBtn">
      <div class="btn-close" @click="handleClickCancel">
        <img
          src="https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/Close.png"
          alt=""
        />
      </div>
    </template>
  </van-popup>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: 'PopupWithHead',
  props: {
    show: {
      type: Boolean,
      requrie: true,
      default: false
    },
    headImg: {
      type: String,
      requrie: true,
      default: ''
    },
    headImgStyle: {
      type: Object || null,
      requrie: false,
      default: null
    },
    needCancelBtn: {
      type: Boolean,
      requrie: true,
      default: false
    },
    contentText: {
      type: String,
      requrie: false,
      default: ''
    },
    confirmBtnText: {
      type: String,
      requrie: true,
      default: '确定'
    },
    needCloseBtn: {
      type: Boolean,
      requrie: false,
      default: false
    }
  },
  setup(props, context) {
    const showPopup = ref(props.show)
    watch(
      () => props.show,
      () => {
        showPopup.value = props.show
      }
    )
    const handleClickConfirm = () => {
      context.emit('confirm')
    }
    const handleClickCancel = () => {
      context.emit('cancel')
    }

    return {
      showPopup,
      handleClickConfirm,
      handleClickCancel
    }
  }
})
</script>

<style lang="less" scoped>
.popup-container {
  width: 300px;
  height: 280px;
  margin-top: -98px;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  .text {
    margin-top: 130px;
    height: 28px;
    font-size: 17px;
    text-align: center;
    line-height: 28px;
    color: #303133;
  }
  .btns {
    margin: 44px 44px 0;
    .light {
      float: left;
      width: 100px;
      height: 44px;
      line-height: 44px;
      font-size: 16px;
      border: 1px solid #0180ff;
      text-align: center;
      border-radius: 4px;
      color: #0180ff;
      box-sizing: border-box;
    }
    .plain {
      float: right;
      width: 100px;
      height: 44px;
      line-height: 44px;
      font-size: 16px;
      text-align: center;
      background: #0271fd;
      border-radius: 4px;
      color: #fff;
      &.no-cancel {
        width: 100%;
      }
    }
  }
}
.popup-icon {
  display: block;
  width: 115px;
  height: 115px;
  margin: 0 auto;
}
.btn-close {
  img {
    display: block;
    width: 30px;
    height: 30px;
    margin: 30px auto 0;
  }
}
</style>
