<template>
  <div class="edit-invition-container">
    <div class="mg10"></div>
    <van-cell-group inset>
      <van-field
        v-model="title"
        rows="2"
        autosize
        type="textarea"
        maxlength="30"
        placeholder="请输入内容"
        show-word-limit
      />
    </van-cell-group>
    <div class="mg10"></div>
    <van-cell-group inset>
      <van-field
        v-model="subTitle"
        rows="2"
        autosize
        type="textarea"
        maxlength="30"
        placeholder="请输入内容"
        show-word-limit
      />
    </van-cell-group>
    <div class="mg10"></div>
    <van-cell-group inset>
      <van-field
        v-model="msgContent"
        rows="4"
        autosize
        type="textarea"
        maxlength="100"
        placeholder="请输入内容"
        show-word-limit
      />
    </van-cell-group>
    <div class="btn" @click="handleSubmit">提交</div>
  </div>
  <popup-with-head
    :show="showPopup"
    needCancelBtn
    headImg="
      https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/edtIvt-icon.png
    "
    contentText="活动邀约已提交，请耐心等候审核"
    @confirm="showPopup = false"
  >
    <router-link to="/seller/myInvite" replace>
      <div class="light">取消</div>
      <div class="plain">确定</div>
    </router-link>
  </popup-with-head>
</template>

<script lang="ts">
import { http } from '@/http'
import { Toast } from 'vant'
import { defineComponent, ref } from 'vue'
import PopupWithHead from '@/components/PopupWithHead/index.vue'

export default defineComponent({
  name: 'EditInvition',
  components: { PopupWithHead },
  props: {
    titleP: {
      type: String,
      requried: true,
      default: ''
    },
    subTitleP: {
      type: String,
      requried: true,
      default: ''
    },
    contentP: {
      type: String,
      requried: true,
      default: ''
    }
  },
  setup(props) {
    const title = ref(props.titleP)
    const subTitle = ref(props.subTitleP)
    const msgContent = ref(props.contentP)
    const showPopup = ref(false)

    const handleSubmit = () => {
      if (!title.value || !subTitle.value || !msgContent.value) {
        Toast.fail('请完整填写表单')
        return
      }
      const params = {
        title: title.value,
        subTitle: subTitle.value,
        msgContent: msgContent.value
      }
      http
        .post('/hbSeller/sellerInvite/createInviteMsg', params, true)
        .then((res) => {
          if (res.code === '200') {
            showPopup.value = true
          } else {
            Toast.fail(res.msg)
          }
        })
    }
    return {
      title,
      subTitle,
      msgContent,
      showPopup,
      handleSubmit
    }
  }
})
</script>

<style lang="less" scoped>
.edit-invition-container {
  height: 100vh;
  background: #f6f6f6;
  .mg10 {
    height: 10px;
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
    margin-top: 60px;
  }
}
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
}
</style>
