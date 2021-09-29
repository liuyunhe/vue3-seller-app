<template>
  <div class="register-container">
    <div class="banner">
      <img
        src="https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/register-banner.png"
        alt=""
      />
    </div>
    <van-form
      @submit="onSubmit"
      input-align="right"
      :show-error-message="false"
      :show-error="true"
    >
      <van-cell-group inset style="margin:0">
        <van-field
          v-model="username"
          name="门店名称"
          label="门店名称"
          placeholder="请输入门店名称"
          :rules="[{ required: true, message: '请输入门店名称' }]"
        />
        <van-field
          v-model="username"
          name="经营人姓名"
          label="经营人姓名"
          placeholder="请输入姓名"
          :rules="[{ required: true, message: '请输入姓名' }]"
        />
        <van-field
          v-model="result"
          is-link
          readonly
          name="picker"
          label="性别"
          placeholder="点击选择性别"
          @click="showPicker = true"
          :rules="[{ required: true, message: '请输入姓名' }]"
        />
        <van-popup v-model:show="showPicker" position="bottom">
          <van-picker
            :columns="columns"
            :columns-field-names="customFieldName"
            @confirm="onConfirm"
            @cancel="showPicker = false"
          />
        </van-popup>
        <van-field
          v-model="date"
          is-link
          readonly
          name="datetimePicker"
          label="出生日期"
          placeholder="点击选择时间"
          @click="showDatetimePicker = true"
          :rules="[{ required: true, message: '点击选择时间' }]"
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

        <van-field
          v-model="username"
          name="电话"
          label="电话"
          placeholder="请输入电话号码"
          :rules="[{ required: true, message: '请输入电话号码' }]"
        />
        <van-field
          v-model="fieldValue"
          is-link
          readonly
          label="门店地址"
          placeholder="请选择门店地址"
          @click="showRegionPopup = true"
          :rules="[{ required: true, message: '请选择门店地址' }]"
        />
        <van-popup v-model:show="showRegionPopup" square position="bottom">
          <van-cascader
            v-model="cascaderValue"
            title="请选择门店地址"
            :options="options"
            @close="showRegionPopup = false"
            @change="onRegionChange"
            @finish="onRegionFinish"
            :field-names="fieldNames"
          />
        </van-popup>
        <van-field
          v-model="username"
          name=""
          label=""
          input-align="left"
          placeholder="请输入详细地址，精确到街道门牌号"
          :rules="[
            { required: true, message: '请输入详细地址，精确到街道门牌号' }
          ]"
        />
        <van-field name="uploader" label="门头照">
          <template #input>
            <van-uploader
              v-model="headImg"
              capture="camera"
              max-count="1"
              :before-read="asyncBeforeRead"
              :after-read="(file) => afterRead(file, 'headImg')"
              upload-text="上传门头照片"
              :max-size="6000 * 1024"
              @oversize="onOversize"
            />
          </template>
        </van-field>
        <van-field name="uploader" label="烟草证照">
          <template #input>
            <van-uploader
              v-model="licenceImg"
              capture="camera"
              max-count="1"
              :before-read="asyncBeforeRead"
              :after-read="(file) => afterRead(file, 'licenceImg')"
              upload-text="上传烟草证件"
              :max-size="6000 * 1024"
              @oversize="onOversize"
            />
          </template>
        </van-field>
        <van-field
          v-model="username"
          label-width="8.2em"
          name="烟草专卖许可证号"
          label="烟草专卖许可证号"
          placeholder="请输入"
          :rules="[{ required: true, pattern, message: '请输入' }]"
        />
        <van-field name="radio" label="区域">
          <template #input>
            <van-radio-group v-model="checked" direction="horizontal">
              <van-radio name="1">城镇</van-radio>
              <van-radio name="2">乡村</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
          v-model="result"
          is-link
          readonly
          name="picker"
          label="所属销区"
          placeholder="点击选择所属销区"
          @click="showPicker = true"
          :rules="[{ required: true, message: '请输入所属销区' }]"
        />
        <van-popup v-model:show="showPicker" position="bottom">
          <van-picker
            :columns="columns"
            :columns-field-names="customFieldName"
            @confirm="onConfirm"
            @cancel="showPicker = false"
          />
        </van-popup>
        <van-field
          v-model="username"
          name="业务员"
          label="业务员"
          placeholder="请输入业务员"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button square block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import {
  CascaderOption,
  CascaderFieldNames,
  UploaderFileListItem,
  Toast
} from 'vant'
import Compressor from 'compressorjs'
import axios, { http } from '@/http'
export default defineComponent({
  setup() {
    const username = ref('')
    const password = ref('')
    const result = ref('')
    const date = ref('')
    const showPicker = ref(false)
    const currentDate = ref(new Date())
    const showDatetimePicker = ref(false)
    const checked = ref('1')
    const headImg = ref<UploaderFileListItem[]>([])
    const licenceImg = ref<UploaderFileListItem[]>([])
    const columns = [
      { cityName: '男', id: 1 },
      { cityName: '女', id: 2 }
    ]
    const customFieldName = {
      text: 'cityName'
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onConfirm = (value: any) => {
      result.value = value.cityName
      showPicker.value = false
      console.log(value)
    }
    const onDatetimeConfirm = (value: Date) => {
      const d = new Date(value)
      date.value =
        d.getFullYear() +
        '-' +
        (d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1) +
        '-' +
        (d.getDate() - 0 < 10 ? '0' + d.getDate() : d.getDate())
      showDatetimePicker.value = false
      console.log(value)
    }

    const pattern = /\d{12}/
    const onSubmit = (values: unknown) => {
      console.log('submit', values)
    }

    const showRegionPopup = ref(false)

    const fieldValue = ref('') // 详细地址

    const cascaderValue = ref('') //  省市区地址
    const fieldNames: CascaderFieldNames = {
      text: 'name',
      value: 'code',
      children: 'items'
    }
    const options = ref<CascaderOption>([])
    let option: CascaderOption
    let province: string
    let city: string
    let district: string
    const onRegionChange = async ({ value, tabIndex }: CascaderOption) => {
      if (tabIndex === 0) {
        option = (options.value as CascaderOption[]).find(
          (i) => i.code === value
        ) as CascaderOption
        http
          .get('/syx/region/query/level', { parentCode: value })
          .then((res) => {
            if (res.code === '200') {
              res.data.map((i: { items: never[] }) => {
                i.items = []
              })
              option.items = res.data
            } else {
              alert(res.msg)
            }
          })
          .catch((err) => {
            console.log(err)
          })
      }
      if (tabIndex === 1) {
        const op = (option.items as CascaderOption[]).find(
          (i) => i.code === value
        ) as CascaderOption
        http
          .get('/syx/region/query/level', { parentCode: value })
          .then((res) => {
            if (res.code === '200') {
              op.items = res.data
            } else {
              alert(res.msg)
            }
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
    const onRegionFinish = ({ selectedOptions }: CascaderOption) => {
      console.log(selectedOptions)
      showRegionPopup.value = false
      fieldValue.value = selectedOptions
        .map((option: { name: string; code: string }, index: number) => {
          if (index == 0) province = option.code
          if (index == 1) city = option.code
          if (index == 2) district = option.code
          return option.name
        })
        .join('/')
      console.log(province, city, district)
    }

    const onOversize = (file: UploaderFileListItem) => {
      console.log(file)
      Toast('文件大小不能超过 6Mb')
    }

    const asyncBeforeRead = (file: File) =>
      new Promise((resolve, reject) => {
        if (
          file.type !== 'image/jpeg' &&
          file.type !== 'image/jpg' &&
          file.type !== 'image/png' &&
          file.type !== 'image/bmp'
        ) {
          Toast('请上传 png/jpg/jpeg/bmp 格式图片')
          reject()
        } else {
          new Compressor(file, {
            quality: 0.6,
            maxWidth: 1024,
            success: resolve,
            error(err) {
              console.log(err.message)
            }
          })
        }
      })
    const afterRead = async (
      file: UploaderFileListItem,
      target: 'headImg' | 'licenceImg'
    ) => {
      console.log(target, file.file)
      file.status = 'uploading'
      file.message = '上传中...'

      const formData = new FormData()
      const imgFile = new window.File(
        [file.file as BlobPart],
        file.file?.name as string,
        {
          type: file.file?.type
        }
      )
      formData.append('file', imgFile)
      console.log(formData, imgFile)
      axios
        .post('/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(({ data: res }) => {
          console.log(res)
          if (res.code == '0') {
            file.status = 'done'
            if (target === 'headImg') {
              headImg.value = [
                {
                  url: res.data.url
                }
              ]
            }
            if (target === 'licenceImg') {
              licenceImg.value = [
                {
                  url: res.data.url
                }
              ]
            }
          }
        })
        .catch((err) => {
          console.log(err)
          file.status = 'failed'
          file.message = '上传失败！'
        })
    }

    const minDate = ref(new Date(1920, 0, 1))
    const maxDate = ref(new Date())

    onMounted(async () => {
      http
        .get('/syx/region/query/level', { level: 1 })
        .then((res) => {
          if (res.code === '200') {
            res.data.map((i: { items: never[] }) => {
              i.items = []
            })
            options.value = res.data
          } else {
            alert(res.msg)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    })
    return {
      username,
      password,
      columns,
      customFieldName,
      showPicker,
      currentDate,
      showDatetimePicker,
      checked,
      onConfirm,
      onDatetimeConfirm,
      result,
      date,
      headImg,
      licenceImg,
      pattern,
      onSubmit,
      minDate,
      maxDate,
      showRegionPopup,
      options,
      onRegionChange,
      onRegionFinish,
      fieldValue,
      fieldNames,
      cascaderValue,
      asyncBeforeRead,
      afterRead,
      onOversize
    }
  }
})
</script>

<style lang="less" scoped>
.register-container {
  background-color: #f6f6f6;
  padding-bottom: 25px;
  .banner {
    margin-bottom: 11px;
    img {
      display: block;
      width: 100%;
      height: 105px;
    }
  }
}
</style>
