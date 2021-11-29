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
    <div class="content" v-if="!needComplete">
      <div class="name">性别</div>
      <div class="value">{{ fanGender }}</div>
    </div>
    <div class="content" v-if="!needComplete">
      <div class="name">生日</div>
      <div class="value">{{ birthday }}</div>
    </div>
    <div class="content" v-if="!needComplete">
      <div class="name">手机号</div>
      <div class="value">{{ fanMobile }}</div>
    </div>
    <van-form @submit="onSubmit" input-align="right" v-if="needComplete">
      <van-cell-group inset>
        <van-field
          v-if="!fanGenderFlag"
          v-model="fanGender"
          name=""
          label="性别"
          placeholder="请选择性别"
          error-message-align="right"
          @click="handleClickField('showMalePicker')"
          :rules="[{ required: true, message: '性别不能为空' }]"
        />
        <van-popup v-model:show="showMalePicker" position="bottom">
          <van-picker
            :columns="maleColumns"
            :columns-field-names="maleCustomFieldName"
            :default-index="maleIndex"
            @confirm="onMaleConfirm"
            @cancel="showMalePicker = false"
          />
        </van-popup>
        <div class="content" style="margin:0" v-if="fanGenderFlag">
          <div class="name">性别</div>
          <div class="value">{{ fanGender }}</div>
        </div>
        <van-field
          v-if="!birthdayFlag"
          v-model="birthday"
          name=""
          label="生日"
          placeholder="点击选择时间"
          error-message-align="right"
          @click="handleClickField('showDatetimePicker')"
          :rules="[{ required: true, message: '生日不能为空' }]"
        />
        <van-popup v-model:show="showDatetimePicker" position="bottom">
          <van-datetime-picker
            v-model="currentDate"
            type="date"
            title="选择年月日"
            :min-date="minDate"
            :max-date="maxDate"
            @confirm="onDatetimeConfirm"
            @cancel="showDatetimePicker = false"
          />
        </van-popup>
        <div class="content" style="margin:0" v-if="birthdayFlag">
          <div class="name">生日</div>
          <div class="value">{{ birthday }}</div>
        </div>
        <van-field
          v-if="!fanMobileFlag"
          v-model="fanMobile"
          name=""
          label="手机号"
          placeholder="请输入手机号"
          error-message-align="right"
          :rules="[
            {
              required: true,
              message: '电话号码不能为空'
            },
            {
              required: true,
              pattern: phonePattern,
              message: '电话号码格式错误'
            }
          ]"
        />
        <div class="content" style="margin:0" v-if="fanMobileFlag">
          <div class="name">手机号</div>
          <div class="value">{{ fanMobile }}</div>
        </div>
        <van-field
          v-if="!fanMobileFlag"
          class="phoneCode"
          v-model="phoneCode"
          name="phoneCode"
          label="验证码"
          placeholder="请输入验证码"
          error-message-align="right"
          @update:model-value="handleCodeChange"
          :rules="[
            {
              required: true,
              pattern: phoneCodePattern,
              message: '请输入验证码'
            }
          ]"
        >
          <template #button>
            <van-button
              :disabled="btnDisabled"
              size="small"
              type="primary"
              @click="handleGetCode"
              >{{ phoneCodeText }}</van-button
            >
          </template>
        </van-field>
      </van-cell-group>
      <div class="content" @click="jumpToAddr">
        <div class="name">我的地址</div>
        <div class="btn"></div>
        <div class="value">点击查看</div>
      </div>
      <div style="margin: 40px 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
    <div class="content" @click="jumpToAddr" v-if="!needComplete">
      <div class="name">我的地址</div>
      <div class="btn"></div>
      <div class="value">点击查看</div>
    </div>
  </div>
</template>

<script lang="ts">
import { http } from '@/http'
import { GlobalDataProps } from '@/store'
import { PickerFieldNames, PickerObjectOption, Toast } from 'vant'
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'CustomerUserInfo',
  setup() {
    const store = useStore<GlobalDataProps>()
    const needComplete = computed(() => store.state.needComplete)
    const fanHeadImg = ref('')
    const fanNickName = ref('')
    const fanGender = ref('')
    const birthday = ref('')
    const fanMobile = ref('')
    const phonePattern = /^1[3456789]\d{9}$/
    const phoneCodePattern = /^\d{6}$/
    const showDatetimePicker = ref(false)
    const showMalePicker = ref(false)
    const currentDate = ref(new Date())
    const minDate = ref(new Date(1920, 0, 1))
    const maxDate = ref(new Date())
    const maleColumns = [
      { name: '男', id: '1' },
      { name: '女', id: '2' }
    ]
    const maleCustomFieldName: PickerFieldNames = {
      text: 'name'
    }
    const maleIndex = ref(0)
    const phoneCode = ref('')
    const phoneCodeText = ref('发送验证码')
    const codeCount = ref(60)
    const btnDisabled = ref(false)
    const fanGenderFlag = ref(false)
    const birthdayFlag = ref(false)
    const fanMobileFlag = ref(false)
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
            birthday.value = res.data.info.birthday || ''
            fanMobile.value = res.data.info.fanMobile
            fanGender.value =
              res.data.info.fanGender == 1
                ? '男'
                : res.data.info.fanGender == 2
                ? '女'
                : ''
            fanHeadImg.value = res.data.info.fanHeadImg
            if (fanGender.value) fanGenderFlag.value = true
            if (birthday.value) birthdayFlag.value = true
            if (fanMobile.value) fanMobileFlag.value = true
          } else {
            Toast.fail(res.msg)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
    type Flag = 'showDatetimePicker' | 'showMalePicker'
    const handleClickField = (flag: Flag) => {
      if (flag === 'showDatetimePicker') {
        showDatetimePicker.value = true
      }
      if (flag === 'showMalePicker') {
        showMalePicker.value = true
      }
    }
    const onDatetimeConfirm = (value: Date) => {
      const d = new Date(value)
      birthday.value =
        d.getFullYear() +
        '-' +
        (d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1) +
        '-' +
        (d.getDate() - 0 < 10 ? '0' + d.getDate() : d.getDate())
      showDatetimePicker.value = false
      console.log(value)
    }
    let gender: string
    const onMaleConfirm = (value: PickerObjectOption) => {
      fanGender.value = value.name
      gender = value.id
      showMalePicker.value = false
      console.log(gender)
    }
    const handleCodeChange = () => {
      if (phoneCode.value.length > 6) {
        phoneCode.value = phoneCode.value.substring(0, 6)
      }
    }
    const handleGetCode = () => {
      if (!phonePattern.test(fanMobile.value)) {
        Toast.fail('请输入正确的手机号！')
        return
      }
      http
        .post('/syx/user/bind/svcode', { mobile: fanMobile.value }, false)
        .then((res) => {
          if (res.code === '200') {
            Toast.success('已发送！')
            btnDisabled.value = true
            phoneCodeText.value = `重新发送(${codeCount.value--})`
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            let countInter: any = setInterval(() => {
              phoneCodeText.value = `重新发送(${codeCount.value--})`
              if (codeCount.value < 0) {
                clearInterval(countInter)
                countInter = undefined
                codeCount.value = 60
                phoneCodeText.value = '发送验证码'
                btnDisabled.value = false
              }
            }, 1000)
          } else {
            Toast.fail(res.msg)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
    const completeUserInfo = (params: {
      img: null
      nickname: null
      birth: string
      gender: string
    }) => {
      return new Promise((resolve) => {
        http
          .post('/spoint/member/completeUserInfo', params, false)
          .then((res) => {
            resolve(res)
          })
      })
    }
    const handleSubmitCode = (params: { mobile: string; vcode: string }) => {
      return new Promise((resolve) => {
        http.post('/syx/user/bind/mobile', params, false).then((res) => {
          resolve(res)
        })
      })
    }
    const handleSyncUserInfo = () => {
      http.post('/hbSeller/fans/syncUserInfo', {}, false).then((res) => {
        console.log(res)
        if (res.code === '200') {
          store.commit('setNeedComplete', false)
          sessionStorage.setItem('needComplete', '0')
          Toast.success('保存成功!')
          setTimeout(() => {
            getUserInfo()
          }, 3000)
        }
      })
    }
    const onSubmit = () => {
      if (!gender) {
        if (fanGender.value === '男') {
          gender = '1'
        } else {
          gender = '2'
        }
      }
      const params1 = {
        img: null,
        nickname: null,
        birth: birthday.value,
        gender
      }
      const params2 = {
        mobile: fanMobile.value,
        vcode: phoneCode.value
      }
      const httpArr = []
      if (!(fanGenderFlag.value && birthdayFlag.value)) {
        httpArr.push(completeUserInfo(params1))
      }
      if (!fanMobileFlag.value) {
        httpArr.push(handleSubmitCode(params2))
      }
      console.log(params1, params2)
      Promise.all(httpArr).then(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (resArr: any[]) => {
          if (resArr.length === 2) {
            const [res1, res2] = resArr
            if (res1.code == 200 && res2.code == 200) {
              handleSyncUserInfo()
            } else {
              const msg = `${res1.msg ? res1.msg : ''}${
                res1.msg && res2.msg ? ',' : ''
              }${res2.msg ? res2.msg : ''}`
              Toast.fail(msg)
            }
          } else {
            const [res1] = resArr
            if (res1.code == 200) {
              handleSyncUserInfo()
            } else {
              Toast.fail(`${res1.msg}`)
            }
          }
        }
      )
    }
    onMounted(() => {
      getUserInfo()
      Toast.success('保存成功!')
    })
    return {
      needComplete,
      fanHeadImg,
      fanNickName,
      birthday,
      fanMobile,
      fanGender,
      jumpToAddr,
      phonePattern,
      handleClickField,
      showDatetimePicker,
      showMalePicker,
      currentDate,
      minDate,
      maxDate,
      maleColumns,
      maleCustomFieldName,
      maleIndex,
      phoneCode,
      phoneCodePattern,
      phoneCodeText,
      codeCount,
      btnDisabled,
      fanGenderFlag,
      birthdayFlag,
      fanMobileFlag,
      handleGetCode,
      handleCodeChange,
      onDatetimeConfirm,
      onMaleConfirm,
      onSubmit
    }
  }
})
</script>
<style>
.userInfo-container .van-cell-group--inset {
  border-radius: 0;
}
.userInfo-container .phoneCode .van-field__label {
  line-height: 36px;
}
.userInfo-container .van-cell {
  border-bottom: 1px solid #e6e6ee;
  padding: 15px 10px;
}
.userInfo-container .van-cell::after {
  border-bottom: none;
}
</style>
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
