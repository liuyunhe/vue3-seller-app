<template>
  <div class="customer-sign-container">
    <act-tips-popup :show="showTips" @close="handleColseTips">
      <div class="tips-content">
        <div class="text">
          <p v-for="(item, index) in actTips" :key="index">
            {{ item }}
          </p>
        </div>
      </div>
    </act-tips-popup>
    <act-tips-popup :show="showDrawNotes" @close="showDrawNotes = false">
      <div class="draw-notes-content">
        <div class="text">
          <p v-for="item in drawHis" :key="item.id">
            <span class="left"> {{ item.note }} </span>
            <span class="right">{{ item.ctime }}</span>
          </p>
          <div class="no-notes" v-if="drawHis.length == 0">暂无记录</div>
        </div>
      </div>
    </act-tips-popup>
    <award-popup :show="showAwardPopup" @close="nextStep">
      <div class="award-warp">
        <img class="pic" :src="drawData && drawData.awdPic" alt="" />
        <div class="name">{{ drawData && drawData.awdName }}</div>
        <div class="btn" @click="handleReceive(drawData, nextStep)"></div>
      </div>
    </award-popup>
    <award-popup :show="showSignPopup" @close="handleCloseSignPopup">
      <div class="sign-award-warp">
        <img
          class="pic"
          src="https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/act/jf.png"
          alt=""
        />
        <div class="name">
          {{
            signPointsList.length == 2
              ? `${signPointsList[0]}荷石璧+${signPointsList[1]}荷石璧`
              : `${signPointsList[0]}荷石璧`
          }}
        </div>
        <div class="btn" @click="handleGetSignedAward"></div>
      </div>
    </award-popup>
    <award-popup :show="showNoAwardPopup" @close="nextStep">
      <div class="no-award-warp">
        <div class="name">未中奖</div>
        <div class="btn" @click="nextStep"></div>
      </div>
    </award-popup>
    <div class="bg">
      <div class="btn-tips" @click="showTips = true"></div>
      <div class="btn-gift" @click="handleClickGiftsBtn"></div>
      <!-- 日历 -->
      <div class="content-box">
        <div class="title">{{ showYear }}年{{ showMonth }}月</div>
        <div class="calendar">
          <table border="1">
            <thead>
              <tr>
                <th>一</th>
                <th>二</th>
                <th>三</th>
                <th>四</th>
                <th>五</th>
                <th>六</th>
                <th>日</th>
              </tr>
            </thead>
            <tbody class="con"></tbody>
          </table>
        </div>
        <div class="bottom">
          <template v-if="contSignFlag">
            <div class="text">
              已连续签到<span style="color:#ED4C4A">{{ contDay }}</span
              >天
            </div>
            <div class="text2" v-if="!isMaxContDay">
              连续签到{{ nextSignInfo.contSignDays }}天即可获得{{
                nextSignInfo.points
              }}荷石壁
            </div>
            <div class="text2" v-if="isMaxContDay">
              已连签{{ contDay }}天,继续下一轮签到活动吧！
            </div>
          </template>
          <div
            class="btn-sign active"
            v-if="!isSignToday"
            @click="handleClickSign"
          ></div>
          <div class="btn-sign " v-if="isSignToday"></div>
        </div>
      </div>
      <!-- 抽奖 -->
      <div class="draw-box" v-if="drawFlag">
        <div class="title">
          <span style="float:left">签到抽奖活动</span>
          <span class="right" style="float:right"
            >已累计签到{{ ljSignDay }}天</span
          >
        </div>
        <div class="btn-draw " v-if="!canDraw"></div>
        <div
          class="btn-draw active"
          v-if="canDraw"
          @click="getDrawTicket"
        ></div>
        <div class="draw-note" @click="handleClickSignNotes"></div>
        <!-- 2: 累计签到未开始 4:累计签到已结束 -->
        <template v-if="ljSignStatus == 1">
          <div class="draw-tips" v-if="!canDraw">
            签到满{{ drawContDays }}天，可获得抽奖机会
          </div>
          <div class="draw-tips" v-if="canDraw">
            抽奖机会剩余{{ canDrawNum }}次
          </div>
        </template>
        <template v-if="ljSignStatus == 2">
          <div class="draw-tips">活动未开始</div>
        </template>
        <template v-if="ljSignStatus == 4">
          <div class="draw-tips">活动已结束，请关注下期活动～</div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { http } from '@/http'
import { Dialog, Toast } from 'vant'
import { Draw, DrawData, handleReceive } from '@/plugins/hbsDraw'
import ActTipsPopup from '@/components/ActTipsPopup/index.vue'
import AwardPopup from '@/components/AwardPopup/index.vue'
import { handleClickJumpBtn } from '@/hooks/useJumpBtn'
import { useRouter } from 'vue-router'

const ACT_TIPS = [
  '1、消费者在活动期间内连续打卡7天，每日签到可获得28荷石璧，完成连续签到每天可额外获得一定值的荷石璧奖励',
  '2、中间断签，则重新开始计算连续签到记录，对应奖励也会重新计算',
  '3、开启百天签到活动，活动期间签到100天，即可获得1次抽奖机会，可有机会获得鼓励金、实物、荷石璧等奖励'
]
interface SignRecord {
  ctime: string
  day: string
}
interface DrawNote {
  id: number
  ctime: string //抽奖时间
  note: string
}
export default defineComponent({
  name: 'Sign',
  components: { ActTipsPopup, AwardPopup },
  setup() {
    const ljSignDay = ref<number>(0)
    const contDay = ref<number>(0)
    const drawContDays = ref<number>(0)
    const canDrawNum = ref<number>(0)
    const ljSignStatus = ref<number>(0) // 1: 累计签到进行中 2: 累计签到未开始 4:累计签到已结束
    const showTips = ref<boolean>(false)
    const showDrawNotes = ref<boolean>(false)
    const showAwardPopup = ref<boolean>(false)
    const showNoAwardPopup = ref<boolean>(false)
    const showSignPopup = ref<boolean>(false)
    const actTips = ref<string[]>(ACT_TIPS)
    const canDraw = ref(false)
    const isMaxContDay = ref(false)
    const contSignFlag = ref(false)
    const drawFlag = ref(false)
    const isSignToday = ref(false)
    const nextSignInfo = ref({
      contSignDays: 0, //需要连续签到的天数
      points: 0 //连续签到赠送的积分数量
    })
    const router = useRouter()
    const handleClickGiftsBtn = () => {
      handleClickJumpBtn(router, '/common/myGifts')
    }
    const drawData = ref<DrawData | null>(null)
    const getActInfo = (): Promise<SignRecord[]> => {
      return new Promise((resolve) => {
        http.post(' /hbSeller/fansSign/actInfo', {}, false).then((res) => {
          let signRecords: SignRecord[] = []
          if (res.code === '200') {
            drawFlag.value = res.data.actConf.drawFlag
            contSignFlag.value = res.data.actConf.contSignFlag
            isSignToday.value = res.data.isSignToday
            ljSignStatus.value = res.data.ljSignStatus
            if (drawFlag.value) {
              canDraw.value = res.data.canDraw
              canDrawNum.value = res.data.canDrawNum
              drawContDays.value = res.data.actConf.drawContDays || 0
              ljSignDay.value = res.data.ljSignDay || 0
            }
            if (contSignFlag.value) {
              contDay.value = res.data.contDay || 0
              isMaxContDay.value = res.data.isMaxContDay
              nextSignInfo.value.contSignDays =
                res.data.nextSignInfo.contSignDays
              nextSignInfo.value.points = res.data.nextSignInfo.points
            }
            signRecords = res.data.signRecords || []
          } else {
            Toast.fail(res.msg)
          }
          resolve(signRecords)
        })
      })
    }
    const signPointsList = ref<number[]>([])

    const handleGetSignedAward = () => {
      showSignPopup.value = false
      Toast.success('领取成功!')
    }
    const drawHis = ref<DrawNote[]>([])
    const handleClickSignNotes = () => {
      http.post('/hbSeller/fansSign/drawHis', {}, false).then((res) => {
        if (res.code === '200') {
          drawHis.value = res.data || []
          showDrawNotes.value = true
        } else {
          Dialog.alert({
            title: '提示',
            message: res.msg
          }).then(() => {
            // on close
          })
        }
      })
    }

    const getDrawTicket = () => {
      http.post('/hbSeller/fansSign/drawTicket', {}, false).then((res) => {
        if (res.code === '200') {
          const { actCode, ticket } = res.data
          Draw({ actCode, ticket }).then((award) => {
            console.log(award)
            drawData.value = award as DrawData | null
            if (drawData.value) {
              showAwardPopup.value = true
            } else {
              showNoAwardPopup.value = true
            }
          })
        } else {
          Dialog.alert({
            title: '提示',
            message: res.msg
          }).then(() => {
            // on close
          })
        }
      })
    }
    const handleColseTips = () => {
      showTips.value = false
    }
    const handleCloseAwardPopup = () => {
      showAwardPopup.value = false
    }
    const handleCloseSignPopup = () => {
      showSignPopup.value = false
    }
    const handleCloseNoAwardPopup = () => {
      showNoAwardPopup.value = false
    }

    const con = document.getElementsByClassName('con')
    const date = new Date()
    const showYear = ref(date.getFullYear()) //展示在页面上的年份
    const showMonth = ref(date.getMonth() + 1) //展示在页面上的月份
    const setCalender = (
      year: number,
      month: number,
      signRecords: SignRecord[]
    ) => {
      con[0].innerHTML = ''
      const records = signRecords.map((item) => {
        return item.day.slice(6)
      })
      const date = new Date()
      const nowyear = date.getFullYear() //保存当前时间，写在方法里是因为避免使用过程中超过了晚上12点而日期无变化
      const nowmonth = date.getMonth()
      const nowdate = date.getDate()
      // date.setDate(1) //这里设置的是每个月的第一天，方便取到每个月第一天的星期数
      date.setFullYear(year, month, 1)
      const dayCount = new Date(year, month + 1, 0).getDate() //获取这个月一共有几天
      const Firstweek = date.getDay() == 0 ? 7 : date.getDay() // 获取这个月的第一天是星期几
      const list: (string | number)[][] = []
      let yindex = 0 // 第几行
      let index = 1 //日期
      while (index <= dayCount) {
        list[yindex] = []
        if (yindex == 0) {
          //第一行
          for (let i = 0; i < 7; i++) {
            if (i + 1 < Firstweek) {
              //每个月1号有格子的话留空
              list[yindex][i] = ''
            } else {
              list[yindex][i] = index
              index++
            }
          }
        } else {
          //其余行
          for (let i = 0; i < 7 && index <= dayCount; i++) {
            list[yindex][i] = index
            index++
          }
        }
        yindex++
      }
      for (const i in list) {
        let td = ''
        const tr = document.createElement('tr')
        for (const j in list[i]) {
          if (year == nowyear && month == nowmonth && list[i][j] == nowdate) {
            if (records.includes(list[i][j] + '')) {
              list[i][
                j
              ] = `<td class="allday nowday"><div class="signed">${list[i][j]}</div></td>`
            } else {
              list[i][j] = `<td class="allday nowday">${list[i][j]}</td>`
            }
          } else if (
            year == nowyear &&
            month == nowmonth &&
            records.includes(list[i][j] + '')
          ) {
            list[i][
              j
            ] = `<td class="allday"><div class="signed">${list[i][j]}</div></td>`
          } else {
            list[i][j] = `<td class="allday ">${list[i][j]}</td>`
          }
          td += list[i][j]
        }
        tr.innerHTML = td
        con[0].appendChild(tr)
      }
    }

    //上个月
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const left = () => {
    //   if (showMonth.value > 1) {
    //     showMonth.value--
    //     con[0].innerHTML = ''
    //     setCalender(showYear.value, showMonth.value - 1)
    //   } else {
    //     showMonth.value = 12
    //     showYear.value--
    //     con[0].innerHTML = ''
    //     setCalender(showYear.value, showMonth.value - 1)
    //   }
    // }
    //下个月
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const right = () => {
    //   if (showMonth.value < 12) {
    //     showMonth.value++
    //     con[0].innerHTML = ''
    //     setCalender(showYear.value, showMonth.value - 1)
    //   } else {
    //     showMonth.value = 1
    //     showYear.value++
    //     con[0].innerHTML = ''
    //     setCalender(showYear.value, 0)
    //   }
    // }
    const initAct = () => {
      getActInfo().then((signRecords) => {
        setCalender(date.getFullYear(), date.getMonth(), signRecords)
      })
    }
    const handleClickSign = () => {
      http.post('/hbSeller/fansSign/doSign', {}, false).then((res) => {
        if (res.code === '200') {
          signPointsList.value = res.data.pointsList || []
          if (signPointsList.value.length) {
            showSignPopup.value = true
          } else {
            Toast.success('恭喜您，签到成功!')
          }
          initAct()
        } else {
          Dialog.alert({
            title: '提示',
            message: res.msg
          }).then(() => {
            // on close
          })
        }
      })
    }
    const nextStep = () => {
      handleCloseAwardPopup()
      handleCloseNoAwardPopup()
      initAct()
    }
    onMounted(() => {
      initAct()
    })

    return {
      contSignFlag,
      actTips,
      showTips,
      showDrawNotes,
      showAwardPopup,
      showNoAwardPopup,
      showSignPopup,
      ljSignDay,
      contDay,
      drawContDays,
      showYear,
      showMonth,
      nextSignInfo,
      canDraw,
      isMaxContDay,
      isSignToday,
      drawFlag,
      signPointsList,
      drawHis,
      drawData,
      canDrawNum,
      ljSignStatus,
      getDrawTicket,
      handleClickSign,
      handleColseTips,
      handleCloseAwardPopup,
      handleCloseNoAwardPopup,
      handleCloseSignPopup,
      handleClickSignNotes,
      handleGetSignedAward,
      nextStep,
      handleReceive,
      handleClickGiftsBtn
    }
  }
})
</script>
<style>
.customer-sign-container td {
  line-height: 34px;
  font-size: 12px;
  color: #666;
}
.customer-sign-container td.nowday {
  background-size: 34px;
  background-image: url('https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/act/sign/nowday.png');
  background-repeat: no-repeat;
  background-position: center;
}
.customer-sign-container td .signed {
  background-size: 15px;
  background-image: url('https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/act/sign/sign.png');
  background-repeat: no-repeat;
  background-position: 18px 16px;
}
</style>
<style lang="less" scoped>
@import '@/theme/common';
.customer-sign-container {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background-color: #d00004;
  overflow: scroll;
  .bg {
    .bg-img(
      375px,
      860px,
      'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/act/sign/bg.png'
    );
    .btn-tips {
      .bg-img(
        74px,
        31px,
        'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/act/scanCode/btn-tips.png'
      );
      position: absolute;
      top: 9px;
      right: 91px;
    }
    .btn-gift {
      .bg-img(
        74px,
        31px,
        'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/act/sign/btn-gift.png'
      );
      position: absolute;
      top: 9px;
      right: 13px;
    }
    .content-box {
      width: 346px;
      height: 430px;
      margin: 0 auto;
      position: relative;
      top: 150px;
      background: #f8f6f0;
      border-radius: 20px;
      text-align: center;
      .title {
        height: 47px;
        line-height: 47px;
        font-weight: bold;
        color: #333333;
      }
      .calendar {
        height: 240px;
        background: #fff;
        table {
          width: 325px;
          height: 240px;
          margin: 0 10px;
          thead {
            border-bottom: 1px solid #f3f3f6;
          }
          th {
            height: 34px;
            line-height: 34px;
            font-size: 12px;
            color: #333;
          }
        }
      }

      .bottom {
        .text {
          padding-top: 17px;
          height: 18px;
          font-size: 18px;
          font-family: Source Han Sans SC;
          font-weight: bold;
          color: #323232;
          margin-bottom: 11px;
        }
        .text2 {
          height: 14px;
          font-size: 14px;
          color: #999999;
          margin-bottom: 18px;
        }
        .btn-sign {
          .bg-img(
            320px,
            45px,
            'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/act/sign/btn-sign.png'
          );
          margin: 0 auto;
          &.active {
            background-image: url('https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/act/sign/btn-sign-active.png');
          }
        }
      }
    }
    .draw-box {
      width: 346px;
      height: 224px;
      margin: 0 auto;
      position: relative;
      top: 160px;
      background: #fff;
      border-radius: 20px;
      text-align: center;
      .title {
        margin: 0 22px;
        padding-top: 16px;
        height: 18px;
        font-size: 18px;
        color: #b83821;
        font-weight: bold;
        .right {
          height: 14px;
          font-size: 14px;
          color: #ed4c4a;
        }
      }
      .btn-draw {
        .bg-img(
          140px,
          142px,
          'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/act/sign/btn-draw.png'
        );
        position: absolute;
        top: 37px;
        left: 100px;
        &.active {
          background-image: url('https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/act/sign/btn-draw-active.png');
        }
      }
      .draw-note {
        .bg-img(
          70px,
          27px,
          'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/act/sign/draw-note.png'
        );
        position: absolute;
        top: 42px;
        right: 27px;
      }
      .draw-tips {
        position: absolute;
        left: 0;
        bottom: 18px;
        width: 100%;
        height: 20px;
        text-align: center;
        line-height: 20px;
        font-size: 14px;
        color: #999;
      }
    }
  }
  .tips-content {
    .bg-img(
      374px,
      433px,
      'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/act/sign/tips-bg.png'
    );
    padding: 150px 70px 70px;
    box-sizing: border-box;
    .text {
      width: 100%;
      height: 250px;
      overflow-x: scroll;
      p {
        font-size: 14px;
        color: #a55600;
        text-align: justify;
        margin: 10px 0;
        line-height: 1.3;
        &.title {
          text-align: center;
          font-size: 20px;
          color: #4c0404;
          font-weight: bolder;
        }
      }
    }
  }
  .draw-notes-content {
    .bg-img(
      330px,
      322px,
      'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/act/sign/draw-notes-bg.png'
    );
    padding: 60px 20px 20px;
    box-sizing: border-box;
    .text {
      width: 100%;
      height: 240px;
      overflow-x: scroll;
      p {
        font-size: 12px;
        color: #a55600;
        text-align: justify;
        line-height: 36px;
        border-bottom: 1px solid #a55600;
        height: 36px;
        .text-overflow();
        .left {
          float: left;
        }
        .right {
          float: right;
        }
      }
      .no-notes {
        line-height: 240px;
        text-align: center;
        font-size: 14px;
        color: #a55600;
      }
    }
  }
  .award-warp {
    .bg-img(
      310px,
      322px,
      'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/act/sign/award-bg.png'
    );
    padding-top: 50px;
    box-sizing: border-box;
    .title {
      text-align: center;
      font-size: 22px;
      line-height: 30px;
      font-weight: bolder;
    }
    .pic {
      display: block;
      width: 100px;
      height: 100px;
      margin: 10px auto 20px;
    }
    .name {
      text-align: center;
      font-size: 16px;
      line-height: 20px;
      margin-bottom: 20px;
      font-weight: bolder;
      color: #a55600;
    }
    .btn {
      .bg-img(
        210px,
        50px,
        'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/act/sign/btn-get-award.png'
      );
      margin: 0 auto;
    }
  }
  .sign-award-warp {
    .bg-img(
      330px,
      426px,
      'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/act/sign/sign-award-bg.png'
    );
    padding-top: 180px;
    box-sizing: border-box;
    .title {
      text-align: center;
      font-size: 22px;
      line-height: 30px;
      font-weight: bolder;
    }
    .pic {
      display: block;
      width: 100px;
      height: 100px;
      margin: 10px auto 20px;
    }
    .name {
      text-align: center;
      font-size: 16px;
      line-height: 20px;
      margin-bottom: 20px;
      font-weight: bolder;
      color: #a55600;
    }
    .btn {
      .bg-img(
        210px,
        50px,
        'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/act/sign/btn-get-award.png'
      );
      margin: 0 auto;
    }
  }
  .no-award-warp {
    .bg-img(
      310px,
      322px,
      'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/act/sign/no-award-bg.png'
    );
    .name {
      position: relative;
      top: 180px;
      text-align: center;
      font-size: 16px;
      line-height: 20px;
      font-weight: bolder;
      color: #a55600;
    }
    .btn {
      .bg-img(
        210px,
        50px,
        'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/act/sign/btn-ok.png'
      );
      position: relative;
      top: 200px;
      margin: 0 auto;
    }
  }
}
</style>
