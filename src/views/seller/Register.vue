<template>
  <div class="register-container" v-show="!isRegister && showForm">
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
      :disabled="formDiabled"
    >
      <van-cell-group inset style="margin:0">
        <van-field
          v-model="shopName"
          name="shopName"
          label="门店名称"
          placeholder="请输入门店名称"
          :rules="[{ required: true, message: '请输入门店名称' }]"
        />
        <van-field
          v-model="contactName"
          name="contactName"
          label="经营人姓名"
          placeholder="请输入姓名"
          :rules="[{ required: true, message: '请输入姓名' }]"
        />
        <van-field
          v-model="male"
          :is-link="!formDiabled"
          readonly
          name="male"
          label="性别"
          placeholder="点击选择性别"
          @click="handleClickField('showMalePicker')"
          :rules="[{ required: true, message: '请输入姓名' }]"
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
        <van-field
          v-model="date"
          :is-link="!formDiabled"
          readonly
          name="date"
          label="出生日期"
          placeholder="点击选择时间"
          @click="handleClickField('showDatetimePicker')"
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
          v-if="contactPhone"
          v-model="contactPhone"
          name="contactPhone"
          label="电话"
          placeholder="请输入电话号码"
          :rules="[
            { required: true, pattern: phonePattern, message: '请输入电话号码' }
          ]"
        />
        <van-field
          v-model="fieldValue"
          :is-link="!formDiabled"
          readonly
          label="门店地址"
          placeholder="请选择门店地址"
          @click="handleClickField('showRegionPopup')"
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
          v-model="detailAddr"
          name="detailAddr"
          label=""
          input-align="left"
          placeholder="请输入详细地址，精确到街道门牌号"
          :rules="[
            { required: true, message: '请输入详细地址，精确到街道门牌号' }
          ]"
        />
        <van-field
          v-model="GPSValue"
          :is-link="!formDiabled"
          disabled
          readonly
          label="门店定位"
          placeholder="请定位门店地址"
          right-icon="https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/rs-location.png"
          @click="handleClickField('showForm')"
          :rules="[{ required: true, message: '请定位门店地址' }]"
        />
        <van-field name="uploader" label="门头照">
          <template #input>
            <van-uploader
              :deletable="!formDiabled"
              v-model="shopImg"
              capture="camera"
              max-count="1"
              :before-read="asyncBeforeRead"
              :after-read="(file) => afterRead(file, 'shopImg')"
              upload-text="上传门头照片"
              :max-size="6000 * 1024"
              @oversize="onOversize"
            />
          </template>
        </van-field>
        <van-field name="uploader" label="烟草证照">
          <template #input>
            <van-uploader
              :deletable="!formDiabled"
              v-model="licenseImg"
              capture="camera"
              max-count="1"
              :before-read="asyncBeforeRead"
              :after-read="(file) => afterRead(file, 'licenseImg')"
              upload-text="上传烟草证件"
              :max-size="6000 * 1024"
              @oversize="onOversize"
            />
          </template>
        </van-field>
        <van-field
          v-model="licenseNo"
          label-width="8.2em"
          name="licenseNo"
          label="烟草专卖许可证号"
          placeholder="请输入"
          :rules="[
            { required: true, pattern: licenseNoPattern, message: '请输入' }
          ]"
        />
        <van-field name="radio" label="区域">
          <template #input>
            <van-radio-group
              v-model="areaType"
              :disabled="formDiabled"
              direction="horizontal"
            >
              <van-radio :name="1">城镇</van-radio>
              <van-radio :name="2">乡村</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
          v-model="saleZone"
          :is-link="!formDiabled"
          readonly
          name="saleZone"
          label="所属销区"
          placeholder="点击选择所属销区"
          @click="handleClickField('showSaleZonePicker')"
          :rules="[{ required: true, message: '请输入所属销区' }]"
        />
        <van-popup v-model:show="showSaleZonePicker" position="bottom">
          <van-picker
            :columns="saleZoneCodeColumns"
            :columns-field-names="saleZoneCodeCustomFieldName"
            :default-index="saleZoneIndex"
            @confirm="onSaleZoneConfirm"
            @cancel="showSaleZonePicker = false"
          />
        </van-popup>
        <van-field
          v-model="salesman"
          name="salesman"
          label="业务员"
          placeholder="请输入业务员"
        />
      </van-cell-group>
      <div style="margin: 16px;" v-if="!formDiabled">
        <van-button square block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
      <div style="margin: 16px;" v-else>
        <van-button square block type="primary">
          返回
        </van-button>
      </div>
    </van-form>
  </div>
  <!-- 定位 -->
  <div class="register-location-container" v-if="!isRegister && !showForm">
    <iframe
      id="mapPage"
      width="100%"
      height="100%"
      frameborder="0"
      src="https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=XA6BZ-LXHKS-424O2-6IBRS-FP4Q2-5EFTW&referer=hbseller"
    >
    </iframe>
  </div>
  <!-- 审核状态 -->
  <div class="is-register-container" v-if="isRegister">
    <!-- 审核通过 -->
    <template v-if="registerStatus === 1">
      <div class="icon">
        <img
          src="https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/rs-ok.png"
          alt=""
        />
      </div>
      <div class="status">审核通过</div>
      <div class="text">恭喜您，成为专属零售户！拥有了专属二维码</div>
      <div class="text">可以邀请好友成为粉丝及参与平台活动，赶快去体验吧！</div>
      <div class="btn" v-if="contactPhone">
        <van-button
          square
          type="primary"
          style="width:8rem"
          @click="showBindPhone = true"
          >绑定手机号</van-button
        >
        <van-popup
          v-model:show="showBindPhone"
          style="background-color: #f6f6f6;"
        >
          <div class="form-bind">
            <div class="title">绑定手机号</div>
            <van-form
              @submit="onSubmitPhone"
              :show-error-message="false"
              :show-error="true"
              input-align="left"
              label-width="4rem"
            >
              <van-cell-group inset>
                <van-field
                  v-model="contactPhone"
                  name="contactPhone"
                  label="手机号"
                  placeholder="请输入手机号"
                  :rules="[
                    {
                      required: true,
                      pattern: phonePattern,
                      message: '请输入手机号'
                    }
                  ]"
                />
                <van-field
                  v-model="phoneCode"
                  name="phoneCode"
                  label="验证码"
                  placeholder="请输入验证码"
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
                      size="mini"
                      type="primary"
                      @click="handleGetCode"
                      >{{ phoneCodeText }}</van-button
                    >
                  </template>
                </van-field>
              </van-cell-group>
              <div style="margin: 16px;">
                <van-button
                  round
                  block
                  type="primary"
                  size="small"
                  native-type="submit"
                  style="width: 7rem;margin: auto;"
                >
                  提交
                </van-button>
              </div>
            </van-form>
          </div>
        </van-popup>
      </div>
    </template>
    <template v-if="registerStatus === 2">
      <div class="icon">
        <img
          src="https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/rs-wait.png"
          alt=""
        />
      </div>
      <div class="status">已提交</div>
      <div class="text">注册信息已提交，请您耐心等候审核！</div>
      <!-- <div class="btn">
        <van-button
          square
          plain
          type="primary"
          style="width:8rem;background-color:#f6f6f6"
          >返回</van-button
        >
      </div> -->
    </template>
    <!-- 审核通过 -->
    <template v-if="registerStatus === 3">
      <div class="icon">
        <img
          src="https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/rs-failed.png"
          alt=""
        />
      </div>
      <div class="status">审核失败</div>
      <div class="text">很遗憾，审核失败，请核实信息后再来申请！</div>
      <div class="btn">
        <van-button
          square
          plain
          type="primary"
          style="width:8rem;background-color:#f6f6f6"
          @click="isRegister = false"
          >返回</van-button
        >
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import {
  CascaderOption,
  CascaderFieldNames,
  UploaderFileListItem,
  Toast,
  PickerFieldNames,
  PickerObjectOption
} from 'vant'
import Compressor from 'compressorjs'
import axios, { http } from '@/http'
export default defineComponent({
  setup() {
    const showBindPhone = ref(false)
    const contactPhone = ref('')
    const phoneCode = ref('')
    const phoneCodeText = ref('发送验证码')
    const formDiabled = ref(false)
    const showForm = ref(true)
    const isRegister = ref(true) // 是否注册
    const registerStatus = ref(0) // 注册的状态， 1: 审核通过, 2: 待审核, 3: 审核不通过
    const shopName = ref('')
    const contactName = ref('')
    const detailAddr = ref('')
    const salesman = ref('')
    const licenseNo = ref('')
    const password = ref('')
    const male = ref('')
    const maleIndex = ref(0)
    const saleZoneIndex = ref(0)
    const saleZone = ref('')
    const date = ref('')
    const GPSValue = ref('')
    const showMalePicker = ref(false)
    const showSaleZonePicker = ref(false)
    const currentDate = ref(new Date())
    const showDatetimePicker = ref(false)
    const areaType = ref(1)
    const shopImg = ref<UploaderFileListItem[]>([])
    const licenseImg = ref<UploaderFileListItem[]>([])
    const maleColumns = [
      { name: '男', id: 1 },
      { name: '女', id: 2 }
    ]
    const maleCustomFieldName: PickerFieldNames = {
      text: 'name'
    }
    interface SaleZoneOption {
      zoneName: string
      zoneCode: string
    }
    const saleZoneCodeColumns = ref<SaleZoneOption[]>([])
    const saleZoneCodeCustomFieldName: PickerFieldNames = {
      text: 'zoneName'
    }

    let gender: string
    const onMaleConfirm = (value: PickerObjectOption) => {
      male.value = value.name
      gender = value.id
      showMalePicker.value = false
      console.log(gender)
    }

    let saleZoneCode: string
    const onSaleZoneConfirm = (value: PickerObjectOption) => {
      saleZone.value = value.zoneName
      saleZoneCode = value.zoneCode
      showSaleZonePicker.value = false
      console.log(saleZoneCode)
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

    const phonePattern = /^1[3456789]\d{9}$/
    const licenseNoPattern = /\d{12}/
    const phoneCodePattern = /\d{6}/

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
    let provName: string
    let cityName: string
    let countyName: string
    let provCode: string
    let cityCode: string
    let countyCode: string
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
              Toast.fail(res.msg)
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
              Toast.fail(res.msg)
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
          if (index == 0) {
            provName = option.name
            provCode = option.code
          }
          if (index == 1) {
            cityName = option.name
            cityCode = option.code
          }
          if (index == 2) {
            countyName = option.name
            countyCode = option.code
          }
          return option.name
        })
        .join('/')
    }

    const onOversize = (file: UploaderFileListItem) => {
      console.log(file)
      Toast('文件大小不能超过 6Mb')
    }

    let shopImgCode: string
    let licenseImgCode: string
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
      target: 'shopImg' | 'licenseImg'
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
      formData.append('channel', 'hb-SellerInfo')
      console.log(formData, imgFile)
      axios
        .post('/hbact/ossCommon/uploadOne', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(({ data: res }) => {
          console.log(res)
          if (res.code === '200') {
            file.status = 'done'
            if (target === 'shopImg') {
              shopImgCode = res.data.rdmCode
              shopImg.value = [
                {
                  url: res.data.filePath
                }
              ]
            }
            if (target === 'licenseImg') {
              licenseImgCode = res.data.rdmCode
              licenseImg.value = [
                {
                  url: res.data.filePath
                }
              ]
            }
          }
          console.log(shopImgCode, licenseImgCode)
        })
        .catch((err) => {
          console.log(err)
          file.status = 'failed'
          file.message = '上传失败！'
        })
    }

    const minDate = ref(new Date(1920, 0, 1))
    const maxDate = ref(new Date())

    let shopLat: number
    let shopLng: number

    type Flag =
      | 'showSaleZonePicker'
      | 'showForm'
      | 'showRegionPopup'
      | 'showDatetimePicker'
      | 'showMalePicker'
    const handleClickField = (flag: Flag) => {
      if (formDiabled.value) return
      if (flag === 'showSaleZonePicker') {
        showSaleZonePicker.value = true
      }
      if (flag === 'showForm') {
        showForm.value = false
      }
      if (flag === 'showRegionPopup') {
        showRegionPopup.value = true
      }
      if (flag === 'showDatetimePicker') {
        showDatetimePicker.value = true
      }
      if (flag === 'showMalePicker') {
        showMalePicker.value = true
      }
    }

    const getSellerInfo = () => {
      http
        .get('/hbSeller/seller/isRegister', {})
        .then((res) => {
          if (res.code === '200') {
            console.log(res.data)
            isRegister.value = res.data.isRegister
            if (res.data.isRegister) {
              registerStatus.value = res.data.registerStatus
              if (registerStatus.value === 3) {
                const regiserInfo = res.data.regiserInfo
                shopName.value = regiserInfo.shopName
                contactName.value = regiserInfo.contactName
                gender = regiserInfo.gender
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const maleColumn = maleColumns.find((item, index) => {
                  if (item.id == regiserInfo.gender) {
                    maleIndex.value = index
                    return true
                  }
                })!
                male.value = maleColumn.name
                date.value = regiserInfo.birthday
                const birthday = (regiserInfo.birthday as string).split('-')
                const year = Number(birthday[0])
                const month = Number(birthday[1]) - 1
                const day = Number(birthday[2])
                currentDate.value = new Date(year, month, day)
                provName = regiserInfo.provName
                cityName = regiserInfo.cityName
                countyName = regiserInfo.countyName
                fieldValue.value = provName + '/' + cityName + '/' + countyName
                provCode = regiserInfo.provCode
                cityCode = regiserInfo.cityCode
                countyCode = regiserInfo.countyCode
                detailAddr.value = regiserInfo.detailAddr
                if (regiserInfo.shopLat && regiserInfo.shopLng) {
                  GPSValue.value = '已定位'
                  shopLat = regiserInfo.shopLat
                  shopLng = regiserInfo.shopLng
                }
                licenseImgCode = regiserInfo.licenseImgCode
                licenseImg.value = [
                  {
                    url: regiserInfo.licenseImg as string
                  }
                ]
                shopImgCode = regiserInfo.shopImgCode
                shopImg.value = [
                  {
                    url: regiserInfo.shopImg as string
                  }
                ]
                licenseNo.value = regiserInfo.licenseNo
                areaType.value = regiserInfo.areaType
                saleZoneCode = regiserInfo.saleZoneCode
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const saleZoneColumn = saleZoneCodeColumns.value.find(
                  (item, index) => {
                    if (item.zoneCode == regiserInfo.saleZoneCode) {
                      saleZoneIndex.value = index
                      return true
                    }
                  }
                )!
                saleZone.value = saleZoneColumn.zoneName
                salesman.value = regiserInfo.salesman || ''
                if (regiserInfo.contactPhone != null) {
                  contactPhone.value = regiserInfo.contactPhone
                }
              }
            }
          } else {
            Toast.fail(res.msg)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }

    const onSubmit = () => {
      const params = {
        licenseNo: licenseNo.value,
        licenseImgCode,
        shopName: shopName.value,
        shopImgCode,
        contactName: contactName.value,
        areaType: areaType.value,
        provCode,
        provName,
        cityCode,
        cityName,
        countyCode,
        countyName,
        detailAddr: detailAddr.value,
        saleZoneCode,
        shopLat,
        shopLng,
        salesman: salesman.value,
        gender,
        birthday: date.value
      }
      console.log('submit', params)
      http
        .post('/hbSeller/seller/register', params, true)
        .then((res) => {
          if (res.code === '200') {
            Toast.success(res.msg)
            getSellerInfo()
          } else {
            Toast.fail(res.msg)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }

    const onSubmitPhone = () => {
      const params = {
        contactPhone: contactPhone.value,
        phoneCode: phoneCode.value
      }
      console.log(params)
      http
        .post(' /hbSeller/seller/phoneCodeCheck', params, false)
        .then((res) => {
          if (res.code === '200') {
            Toast.success('绑定成功')
            showBindPhone.value = false
          } else {
            Toast.fail(res.msg)
          }
        })
    }

    const codeCount = ref(60)
    const btnDisabled = ref(false)
    const handleCodeChange = () => {
      if (phoneCode.value.length > 6) {
        phoneCode.value = phoneCode.value.substring(0, 6)
      }
    }
    const handleGetCode = () => {
      if (!phonePattern.test(contactPhone.value)) {
        Toast.fail('请输入正确的手机号！')
        return
      }
      http
        .post(
          ' /hbSeller/seller/phoneCodeSend',
          { contactPhone: contactPhone.value },
          false
        )
        .then((res) => {
          if (res.code === '200') {
            Toast.success('已发送！')
            btnDisabled.value = true
            phoneCodeText.value = `重新发送(${codeCount.value--})`
            let countInter: number | undefined = setInterval(() => {
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

    const getRegion = () => {
      http
        .get('/syx/region/query/level', { level: 1 })
        .then((res) => {
          if (res.code === '200') {
            res.data.map((i: { items: never[] }) => {
              i.items = []
            })
            options.value = res.data
          } else {
            Toast.fail(res.msg)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }

    const getSaleZoneList = () => {
      http
        .get('/hbSeller/saleZone/allList', {})
        .then((res) => {
          if (res) {
            console.log(res)
            saleZoneCodeColumns.value = res
            getSellerInfo()
          } else {
            Toast.fail(res.msg)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }

    onMounted(async () => {
      getRegion()
      getSaleZoneList()
      window.addEventListener(
        'message',
        function(event) {
          // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
          const loc = event.data
          if (loc && loc.module == 'locationPicker') {
            //防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
            console.log('location', loc)
            GPSValue.value = '已定位'
            shopLat = loc.latlng.lat
            shopLng = loc.latlng.lng
            showForm.value = true
          }
        },
        false
      )
    })
    return {
      formDiabled,
      isRegister,
      registerStatus,
      showForm,
      shopName,
      contactName,
      licenseNo,
      contactPhone,
      phoneCode,
      detailAddr,
      salesman,
      password,
      maleColumns,
      maleCustomFieldName,
      saleZoneCodeColumns,
      saleZoneCodeCustomFieldName,
      showMalePicker,
      showSaleZonePicker,
      currentDate,
      showDatetimePicker,
      areaType,
      onMaleConfirm,
      onSaleZoneConfirm,
      onDatetimeConfirm,
      male,
      maleIndex,
      saleZoneIndex,
      saleZone,
      GPSValue,
      date,
      shopImg,
      licenseImg,
      phonePattern,
      licenseNoPattern,
      phoneCodePattern,
      handleClickField,
      onSubmit,
      onSubmitPhone,
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
      onOversize,
      showBindPhone,
      phoneCodeText,
      handleGetCode,
      btnDisabled,
      handleCodeChange
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
.is-register-container {
  background-color: #f6f6f6;
  height: 100vh;
  padding-top: 81px;
  box-sizing: border-box;
  .icon {
    margin-bottom: 28px;
    img {
      width: 70px;
      height: 70px;
      display: block;
      margin: 0 auto;
    }
  }
  .status {
    font-size: 16px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    color: #2b333b;
    margin-bottom: 8px;
  }
  .text {
    font-size: 12px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    color: #b1b1b1;
  }
  .btn {
    margin-top: 36px;
    text-align: center;
  }
}
#mapPage {
  height: 100vh;
}
.form-bind {
  width: 20rem;
  box-sizing: border-box;
  .title {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
  }
}
</style>
