<template>
  <div class="fans-rank-container">
    <act-tips-popup :show="showTips" @close="handleColseTips">
      <div class="tips-content">
        <div class="text" v-html="actTips"></div>
      </div>
    </act-tips-popup>
    <award-popup :show="showAwardPopup" @close="handleCloseAwardPopup">
      <div class="award-warp">
        <div class="title"></div>
        <img class="pic" :src="drawData ? drawData.awdPic : ''" alt="" />
        <div class="name">{{ drawData && drawData.awdName }}</div>
        <div
          class="btn"
          @click="
            handleReceive(drawData, () => {
              showAwardPopup = false
            })
          "
        ></div>
      </div>
    </award-popup>
    <award-popup :show="showNoAwardPopup" @close="handleCloseNoAwardPopup">
      <div class="no-award-warp">
        <div class="name">未中奖</div>
        <div class="btn" @click="handleCloseNoAwardPopup"></div>
      </div>
    </award-popup>
    <div class="bg">
      <div class="btn-tips" @click="showTips = true"></div>
      <div class="btn-gift" @click="handleClickGiftsBtn"></div>
      <div class="join-etime" v-if="!showActTips">
        参与截止时间：{{ joinEtime }}
      </div>
      <div class="act-tips" v-if="showActTips && resultFlagType == 2">
        参与时间已结束，未获得排名奖励，请下次再接再厉~
      </div>
      <div class="act-tips t" v-if="showActTips && resultFlagType >= 4">
        参与时间已结束，恭喜获得排名奖励，奖励可前往“我的礼品”中查看，若已领取请忽略
      </div>
      <div class="rank-data1">
        <div class="rank-data-title">本期荷芯粉丝活动零售户排名</div>
        <div class="no-data" v-if="actOnStatus == 1">
          <div class="icon"></div>
          <div class="tips">参与截止后，统计展示符合条件的 零售户排名</div>
        </div>
        <div class="item left" v-if="actOnStatus == 2">
          <div class="title">零售户排名</div>
          <div class="data">
            {{ rankNum == 0 ? '暂无' : `第${rankNum}名` }}
          </div>
        </div>
        <div class="item right" v-if="actOnStatus == 2">
          <div class="title">荷芯粉丝数</div>
          <div class="data">
            {{ finishFanNum == 0 ? '暂无' : `${finishFanNum}个` }}
          </div>
        </div>
      </div>
      <div class="rank-data2" v-if="actOnStatus == 1">
        <div class="rank-data-title">
          <div class="top" :class="{ noSt: !statisTime }">昨日数据展示</div>
          <div class="bottom" v-if="statisTime">截止到：{{ statisTime }}</div>
        </div>
        <div class="item left">
          <div class="title">扫码粉丝数</div>
          <div class="data">
            {{ scanFanNum == 0 ? '0个' : `${scanFanNum}个` }}
          </div>
        </div>
        <div class="item right">
          <div class="title">粉丝扫码总包数</div>
          <div class="data">
            {{ scanCodeNum == 0 ? '0包' : `${scanCodeNum}包` }}
          </div>
        </div>
      </div>
      <div class="rank-list" v-if="actOnStatus == 1">
        <ul>
          <li v-for="(item, index) in rankList" :key="item.id">
            <div class="icon first" v-if="index == 0"></div>
            <div class="icon second" v-if="index == 1"></div>
            <div class="icon third" v-if="index == 2"></div>
            <div class="index" v-if="index > 2">{{ index }}</div>
            <div class="shop-name">{{ item.shopName }}</div>
            <div class="fans">{{ item.scanFanNum }}</div>
          </li>
          <div class="no-list" v-if="showNoList">
            <div class="no-list-icon"></div>
            <div class="no-list-tips">当前暂无统计数据</div>
          </div>
        </ul>
      </div>
      <div class="rank-list finish" v-if="actOnStatus == 2">
        <ul>
          <li v-for="(item, index) in rankList" :key="item.id">
            <div class="icon first" v-if="index == 0"></div>
            <div class="icon second" v-if="index == 1"></div>
            <div class="icon third" v-if="index == 2"></div>
            <div class="index" v-if="index > 2">{{ index }}</div>
            <div class="shop-name">{{ item.shopName }}</div>
            <div class="fans">{{ item.finishFanNum }}</div>
          </li>
          <div class="no-list" v-if="showNoList">
            <div class="no-list-icon"></div>
            <div class="no-list-tips">当前暂无统计数据</div>
          </div>
        </ul>
      </div>
      <div class="finish-tips" v-if="actOnStatus == 2">
        <span class="icon-tips"></span
        >补充说明：未进入榜单的零售户则代表其店铺的粉丝均未达到活动要求的扫码天数。
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { http } from '@/http'
import { Dialog, Toast } from 'vant'
import ActTipsPopup from '@/components/ActTipsPopup/index.vue'
import AwardPopup from '@/components/AwardPopup/index.vue'
import { DrawData, handleReceive, getActRules } from '@/plugins/hbsDraw'
import { handleClickJumpBtn } from '@/hooks/useJumpBtn'
import { useRouter } from 'vue-router'

interface RankItem {
  id: number
  sellerId: number
  shopName: string //店铺名称
  scanFanNum: number //扫码粉丝数
  scanCodeNum: number //扫码烟包数
  rankNum: number //排名
  finishFanNum: number //达标粉丝数
}

export default defineComponent({
  name: 'ScanFansRank',
  props: {
    actCode: {
      type: String,
      default: ''
    }
  },
  components: { ActTipsPopup, AwardPopup },
  setup(props) {
    const actOnStatus = ref<number>(1)
    const resultFlagType = ref<number>(0)
    const scanFanNum = ref<number>(0)
    const scanCodeNum = ref<number>(0)
    const rankNum = ref<number>(0)
    const finishFanNum = ref<number>(0)
    const joinEtime = ref<string | null>(null)
    const statisTime = ref<string>('')
    const rankList = ref<RankItem[]>([])
    const showNoList = ref<boolean>(false)
    const showActTips = ref<boolean>(false)
    const showTips = ref<boolean>(false)
    const drawData = ref<DrawData | null>(null)
    const showAwardPopup = ref<boolean>(false)
    const showNoAwardPopup = ref<boolean>(false)
    const actTips = ref<string>('')
    const router = useRouter()
    const handleClickGiftsBtn = () => {
      handleClickJumpBtn(router, '/common/myGifts')
    }
    const getScanCodeRankList = () => {
      http
        .post(
          '/hbSeller/seller/corefanAct/scanCodeRankList',
          { actCode: props.actCode },
          false
        )
        .then((res) => {
          if (res.code === '200') {
            rankList.value = (res.data && res.data.data) || []
          }
          console.log(rankList.value)
          if (rankList.value.length == 0) {
            showNoList.value = true
          }
        })
    }
    const getFinishRankList = (resultFlag: number) => {
      http
        .post(
          '/hbSeller/seller/corefanAct/finishRankList',
          { actCode: props.actCode },
          false
        )
        .then((res) => {
          if (res.code === '200') {
            rankList.value = (res.data && res.data.data) || []
          }
          if (rankList.value.length == 0) {
            showNoList.value = true
          }
          switch (resultFlag) {
            // 1: 参与时间已结束，请耐心等待统计排名…;
            // 2: 统计数据已出,但没有排名;
            // 3: 统计数据已出,等待开奖;
            // 4: 统计数据已出,待领奖;
            // 5: 统计数据已出,奖品已领;
            // 6: 统计数据已出,奖品过期;
            case 1:
              Toast({
                duration: 0,
                forbidClick: true,
                message:
                  '参与时间已结束，系统正在统计零售户排名，请耐心等待…\n可通过刷新页面，或者退出稍后重新进入查看排名结果'
              })
              break
            case 2:
              Toast({
                duration: 3000,
                forbidClick: true,
                message:
                  '本期排行榜活动已结束，未在排名奖励内，请下次再接再厉～'
              })
              break

            default:
              break
          }
        })
    }
    const getActInfo = () => {
      http
        .post(
          '/hbSeller/seller/corefanAct/statisInfo',
          { actCode: props.actCode },
          false
        )
        .then((res) => {
          if (res.code === '200') {
            const { actOnGoingStatus, resultFlag = null } = res.data
            const { userAward } = res.data
            joinEtime.value = res.data.joinEtime || null
            statisTime.value = res.data.statisTime || ''
            actOnStatus.value = actOnGoingStatus
            // 1. 活动进行中 2.参与已截止
            if (actOnGoingStatus == 1) {
              getScanCodeRankList()
              if (res.data.scanInfo) {
                scanFanNum.value = res.data.scanInfo.scanFanNum || 0
                scanCodeNum.value = res.data.scanInfo.scanCodeNum || 0
              }
            }
            if (actOnGoingStatus == 2) {
              showActTips.value = true

              if (res.data.rankInfo) {
                rankNum.value = res.data.rankInfo.rankNum || 0
                finishFanNum.value = res.data.rankInfo.finishFanNum || 0
              }
              resultFlagType.value = resultFlag
              getFinishRankList(resultFlag)
              switch (resultFlag) {
                // 1: 参与时间已结束，请耐心等待统计排名…;
                // 2: 统计数据已出,但没有排名;
                // 3: 统计数据已出,等待开奖;
                // 4: 统计数据已出,待领奖;
                // 5: 统计数据已出,奖品已领;
                // 6: 统计数据已出,奖品过期;

                case 3:
                  Dialog.alert({
                    title: '提示',
                    message: '统计数据已出,等待开奖'
                  }).then(() => {
                    // on close
                  })
                  break
                case 4:
                  if (userAward != null) {
                    drawData.value = userAward
                    showAwardPopup.value = true
                  }
                  break
                case 5:
                  Dialog.alert({
                    title: '提示',
                    message: '活动奖品已领取\n请进入<我的礼品>中查看～'
                  }).then(() => {
                    // on close
                  })
                  break
                case 6:
                  Dialog.alert({
                    title: '提示',
                    message: '很遗憾，奖品一直未领取，已过期~'
                  }).then(() => {
                    // on close
                  })
                  break
                default:
                  break
              }
            }
          } else {
            Toast.fail(res.msg)
          }
        })
    }
    const handleColseTips = () => {
      showTips.value = false
    }
    const handleCloseAwardPopup = () => {
      showAwardPopup.value = false
      Toast(`活动奖品，请进入<我的礼品>中查看～`)
    }
    const handleCloseNoAwardPopup = () => {
      showNoAwardPopup.value = false
    }

    getActRules(props.actCode).then((rules) => {
      actTips.value = rules
    })

    onMounted(() => {
      getActInfo()
    })
    return {
      actTips,
      showTips,
      showActTips,
      showAwardPopup,
      showNoAwardPopup,
      actOnStatus,
      scanFanNum,
      rankList,
      showNoList,
      scanCodeNum,
      statisTime,
      drawData,
      joinEtime,
      rankNum,
      finishFanNum,
      resultFlagType,
      handleColseTips,
      handleCloseAwardPopup,
      handleCloseNoAwardPopup,
      handleReceive,
      handleClickGiftsBtn
    }
  }
})
</script>
<style>
.tips-content .text p {
  font-size: 14px;
  color: #4c0404;
  text-align: justify;
  margin: 10px 0;
  line-height: 1.3;
}
</style>
<style lang="less" scoped>
@import '@/theme/common';
.fans-rank-container {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background-color: #2e50e5;
  overflow: scroll;
  .bg {
    .bg-img(
      375px,
      800px,
      'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/act/scanFansRank/bg.png'
    );
    padding-top: 310px;
    .btn-tips {
      .bg-img(
        74px,
        31px,
        'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/act/scanFansRank/btn-tips.png'
      );
      position: absolute;
      top: 12px;
      right: 12px;
    }
    .btn-gift {
      .bg-img(
        74px,
        31px,
        'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/act/scanFansRank/btn-gift.png'
      );
      position: absolute;
      top: 52px;
      right: 12px;
    }
    .join-etime {
      position: absolute;
      width: 100%;
      top: 248px;
      left: 0;
      text-align: center;
      font-size: 14px;
      line-height: 20px;
      color: #fff;
    }
    .act-tips {
      .bg-img(
        318px,
        48px,
        'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/act/scanFansRank/act-tips-bg.png'
      );
      position: absolute;
      top: 240px;
      left: 34px;
      text-align: center;
      font-size: 12px;
      font-weight: 400;
      color: #fe522a;
      line-height: 40px;
      &.t {
        padding-top: 5px;
        line-height: 15px;
      }
    }
    .btn-draw {
      .bg-img(
        326px,
        51px,
        'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/act/scanCode/btn-start.png'
      );
      position: absolute;
      top: 607px;
      left: 26px;
    }
    .rank-data1 {
      .bg-img(
        366px,
        155px,
        'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/act/scanFansRank/box-m.png'
      );
      position: relative;
      margin: 0 auto 30px;
      padding: 44px 28px 23px 24px;
      box-sizing: border-box;
      .rank-data-title {
        .bg-img(
          313px,
          50px,
          'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/act/scanFansRank/rank-data-title1.png'
        );
        position: absolute;
        top: -19px;
        left: 25px;
        font-size: 19px;
        font-weight: 400;
        color: #ffffff;
        line-height: 55px;
        text-align: center;
      }
      .no-data {
        display: flex;
        width: 100%;
        height: 100%;
        align-items: center;
        .icon {
          .bg-img(
            38px,
            57px,
            'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/act/scanFansRank/no-data-icon.png'
          );
          margin-left: 28px;
        }
        .tips {
          width: 200px;
          height: 30px;
          line-height: 15px;
          font-size: 13px;
          font-weight: 400;
          color: #333333;
          margin-left: 23px;
        }
      }
      .item {
        width: 150px;
        overflow: hidden;
        .title {
          line-height: 34px;
          font-size: 13px;
          color: #333333;
          text-align: center;
        }
        .data {
          line-height: 26px;
          font-size: 18px;
          font-weight: bold;
          color: #e48b00;
          text-align: center;
        }
        &.left {
          float: left;
          padding-top: 12px;
        }
        &.right {
          width: 150px;
          float: right;
          padding-top: 12px;
        }
      }
    }
    .rank-data2 {
      .bg-img(
        366px,
        138px,
        'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/act/scanFansRank/box-m1.png'
      );
      position: relative;
      margin: 0 auto 10px;
      padding: 44px 28px 23px 24px;
      box-sizing: border-box;
      .rank-data-title {
        .bg-img(
          309px,
          61px,
          'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/act/scanFansRank/rank-data-title2.png'
        );
        position: absolute;
        top: -34px;
        left: 29px;
        .top {
          height: 30px;
          line-height: 45px;
          font-size: 18px;
          text-align: center;
          color: #ffffff;
          &.noSt {
            line-height: 63px;
            height: 63px;
          }
        }
        .bottom {
          height: 30px;
          font-size: 12px;
          color: #ffffff;
          line-height: 30px;
          text-align: center;
        }
      }
      .item {
        width: 150px;
        overflow: hidden;
        .title {
          line-height: 34px;
          font-size: 13px;
          color: #333333;
          text-align: center;
        }
        .data {
          line-height: 26px;
          font-size: 18px;
          font-weight: bold;
          color: #e48b00;
          text-align: center;
        }
        &.left {
          float: left;
        }
        &.right {
          width: 150px;
          float: right;
        }
      }
    }
    .rank-list {
      .bg-img(
        366px,
        354px,
        'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/act/scanFansRank/box-l.png'
      );
      margin: 0 auto;
      padding: 60px 28px 40px;
      box-sizing: border-box;
      &.finish {
        background-image: url('https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/act/scanFansRank/box-l1.png');
      }
      ul {
        width: 310px;
        height: 254px;
        overflow-y: scroll;
        li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 0 13px;
          height: 38px;
          box-sizing: border-box;
          border-bottom: 1px solid #eeeeee;
          .icon {
            &.first {
              .bg-img(
                30px,
                30px,
                'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/act/fansRank/star-1.png'
              );
            }
            &.second {
              .bg-img(
                30px,
                30px,
                'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/act/fansRank/star-2.png'
              );
            }
            &.third {
              .bg-img(
                30px,
                30px,
                'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/act/fansRank/star-3.png'
              );
            }
          }
          .index {
            width: 30px;
            line-height: 38px;
            text-align: center;
            font-size: 14px;
            color: #f57f1f;
          }
          .shop-name {
            width: 150px;
            line-height: 38px;
            text-align: center;
            font-size: 14px;
            color: #555555;
            margin-left: 30px;
            .text-overflow();
          }
          .fans {
            width: 50px;
            line-height: 38px;
            text-align: center;
            font-size: 14px;
            color: #ff9c00;
          }
        }
        .no-list {
          padding-top: 88px;
          .no-list-icon {
            .bg-img(
              53px,
              53px,
              'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/act/scanFansRank/show-no-list-icon.png'
            );
            margin: 0 auto;
          }
          .no-list-tips {
            line-height: 60px;
            text-align: center;
            font-size: 14px;
            font-weight: 500;
            color: #e48b00;
          }
        }
      }
    }
    .finish-tips {
      width: 345px;
      height: 50px;
      margin: 0 auto;
      background: #2420ff;
      color: #fff;
      padding: 12px 15px 10px;
      box-sizing: border-box;
      line-height: 14px;
      font-size: 12px;
      border-radius: 8px;
      .icon-tips {
        .bg-img(
          13px,
          13px,
          'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/act/scanFansRank/icon-tips.png'
        );
        display: inline-block;
        vertical-align: middle;
        margin-bottom: 2px;
        margin-right: 2px;
      }
    }
  }
  .tips-content {
    .bg-img(
      312px,
      412px,
      'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/act/fansRank/tips-bg.png'
    );
    padding: 160px 20px 20px;
    box-sizing: border-box;
    .text {
      width: 100%;
      height: 200px;
      overflow-x: scroll;
      p {
        font-size: 14px;
        color: #4c0404;
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
  .award-warp {
    .bg-img(
      310px,
      280px,
      'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/act/fansRank/award-bg.png'
    );
    .title {
      text-align: center;
      font-size: 22px;
      line-height: 30px;
      height: 50px;
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
      margin-bottom: 10px;
      font-weight: bolder;
      color: #ad4423;
    }
    .btn {
      .bg-img(
        255px,
        50px,
        'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/act/fansRank/btn-get-award.png'
      );
      margin: 0 auto;
    }
  }
  .no-award-warp {
    .bg-img(
      310px,
      280px,
      'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/act/fansRank/no-award-bg.png'
    );
    .name {
      position: relative;
      top: 180px;
      text-align: center;
      font-size: 16px;
      line-height: 20px;
      margin-bottom: 10px;
      font-weight: bolder;
      color: #ad4423;
    }
    .btn {
      .bg-img(
        255px,
        50px,
        'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/act/fansRank/btn-ok.png'
      );
      position: relative;
      top: 180px;
      margin: 0 auto;
    }
  }
}
</style>
