<template>
  <div class="myGifts-container">
    <template v-if="giftsList !== null && giftsList.length === 0">
      <div>暂无礼品</div>
    </template>
  </div>
</template>

<script lang="ts">
import { http } from '@/http'
import { Toast } from 'vant'
import { defineComponent, onMounted, ref } from 'vue'
interface Gift {
  actCode: string
  actName: string
  awardCode: string
  awardId: number
  awdArea: string
  awdCity: string
  awdDetailType: number
  awdDistrict: string
  awdJumpurl: string | null
  awdName: string
  awdPic: string
  awdPrice: string
  awdProvince: string
  awdStatus: number
  awdType: number
  cardValue: number
  code: string
  ctime: string
  drawTime: string
  expireTime: string
  giveIntegral: number
  id: number
  integral: number
  orgId: string
  prizeName: string
  redMoney: number
  sn: string
  uaId: string
  userId: number
}

export default defineComponent({
  name: 'MyGifts',
  setup() {
    const giftsList = ref<Array<Gift> | null>(null)
    const getMyGiftsDetail = () => {
      const params = {
        recordId: 0,
        size: 10,
        actTypeMain: 2
      }
      http
        .post('/syx/awd/list/part', params, false)
        .then((res) => {
          if (res.code === '200') {
            giftsList.value = res.data
          } else {
            Toast.fail(res.msg)
          }
        })
        .then((err) => {
          console.log(err)
        })
    }
    onMounted(() => {
      getMyGiftsDetail()
    })
    return {
      giftsList
    }
  }
})
</script>

<style lang="less" scoped>
.myGifts-container {
  height: 100vh;
  background-color: #f4f4f4;
}
</style>
