<template>
  <div class="feedback-container">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="feedContent"
          name="feedContent"
          rows="3"
          autosize
          label=""
          label-width="0"
          type="textarea"
          maxlength="50"
          placeholder="请简要描述您的问题或意见"
          show-word-limit
          :rules="[
            {
              required: true,
              message: '请输入内容'
            }
          ]"
        />
      </van-cell-group>
      <div class="mg10"></div>
      <van-cell-group inset>
        <van-field
          v-model="phoneNo"
          name="phoneNo"
          rows="1"
          autosize
          label="联系方式："
          label-width="5.5em"
          type="input"
          maxlength="11"
          placeholder="请输入手机号码"
          :rules="[
            {
              required: true,
              pattern: phonePattern,
              message: '请输入手机号'
            }
          ]"
        />
      </van-cell-group>
      <div class="mg10"></div>
      <div class="tips">我们会仔细阅读您的反馈，并尽早给您回复，非常感谢。</div>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script lang="ts">
import { http } from '@/http'
import { Toast } from 'vant'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Feedback',
  props: {
    feedFrom: {
      type: String,
      requried: true
    }
  },
  setup(props) {
    const feedContent = ref('')
    const phoneNo = ref('')
    const phonePattern = /^1[3456789]\d{9}$/
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSubmit = (values: any) => {
      const params = Object.assign(values, { feedFrom: props.feedFrom })
      http
        .post('/hbSeller/feedback/add', params, false)
        .then((res) => {
          if (res.code === '200') {
            Toast.success('提交成功！')
            setTimeout(() => {
              window.history.go(-1)
            }, 3000)
          } else {
            Toast.fail(res.msg)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }

    return {
      feedContent,
      phoneNo,
      phonePattern,
      onSubmit
    }
  }
})
</script>

<style lang="less" scoped>
.feedback-container {
  min-height: 100vh;
  background-color: #f4f4f4;
  padding: 10px 0;
  box-sizing: border-box;
  .mg10 {
    height: 10px;
  }
  .tips {
    height: 17px;
    font-size: 12px;
    line-height: 17px;
    color: #999999;
    margin: 10px 18px;
  }
}
</style>
