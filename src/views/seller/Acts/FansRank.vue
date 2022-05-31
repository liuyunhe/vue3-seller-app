<template>
  <div class="fans-rank-container">
    <act-tips-popup :show="showTips" @close="handleColseTips">
      <div class="tips-content">
        <div class="text">
          <p v-for="(item, index) in actTips" :key="index">
            {{ item }}
          </p>
        </div>
      </div>
    </act-tips-popup>
    <award-popup :show="showAwardPopup" @close="handleCloseAwardPopup">
      <div class="award-warp">
        <div class="title"></div>
        <img class="pic" :src="drawData && drawData.awdPic" alt="" />
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
      <div class="rank-data">
        <div class="item left">
          <div class="title">
            {{ statisTime ? `截止${statisTime}排名` : '—' }}
          </div>
          <div class="data">{{ rankNum == 0 ? '暂无' : `第${rankNum}名` }}</div>
        </div>
        <div class="item right">
          <div class="title">本期绑定粉丝数</div>
          <div class="data">
            {{ newFansNum == 0 ? '暂无' : `${newFansNum}个` }}
          </div>
        </div>
      </div>
      <div class="rank-list">
        <ul>
          <li v-for="item in rankList" :key="item.id">
            <div class="icon first" v-if="item.rankNum == 1"></div>
            <div class="icon second" v-if="item.rankNum == 2"></div>
            <div class="icon third" v-if="item.rankNum == 3"></div>
            <div class="index" v-if="item.rankNum > 3">{{ item.rankNum }}</div>
            <div class="shop-name">{{ item.shopName }}</div>
            <div class="fans">{{ item.newFansNum }}</div>
          </li>
          <div class="no-list" v-if="showNoList">当前无排名数据</div>
        </ul>
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
import { DrawData, handleReceive } from '@/plugins/hbsDraw'
import { handleClickJumpBtn } from '@/hooks/useJumpBtn'
import { useRouter } from 'vue-router'

const ACT_TIPS = [
  '1、在活动时间2022年2月14日10:00至2022年2月18日18:00期间关联绑定新粉丝，按粉丝数排名统计，有机会获得实物、荷石璧、鼓励金等奖励;',
  '2、活动结束后，中奖用户可收到中奖推送消息，请留言关注;',
  '3、每天0点后更新排名;',
  '4、参与时间截止后，再绑定的粉丝不计入本期的排行数据中。'
]

interface RankItem {
  id: number
  sellerId: number
  shopName: string //店铺名称
  rankNum: number //排行位置
  newFansNum: number // 粉丝数量
}

export default defineComponent({
  name: 'FansRank',
  props: {
    actCode: {
      type: String,
      default: ''
    }
  },
  components: { ActTipsPopup, AwardPopup },
  setup(props) {
    const rankNum = ref<number>(0)
    const newFansNum = ref<number>(0)
    const statisTime = ref<string>('')
    const rankList = ref<RankItem[]>([])
    const showNoList = ref<boolean>(false)
    const showTips = ref<boolean>(false)
    const drawData = ref<DrawData | null>(null)
    const showAwardPopup = ref<boolean>(false)
    const showNoAwardPopup = ref<boolean>(false)
    const actTips = ref<string[]>(ACT_TIPS)
    const router = useRouter()
    const handleClickGiftsBtn = () => {
      handleClickJumpBtn(router, '/common/myGifts')
    }
    const getActInfo = () => {
      http
        .post(
          '/hbSeller/seller/fansRankAct/rankInfo',
          { actCode: props.actCode },
          false
        )
        .then((res) => {
          if (res.code === '200') {
            if (res.data.rankInfo) {
              rankNum.value = res.data.rankInfo.rankNum || 0
              newFansNum.value = res.data.rankInfo.newFansNum || 0
              statisTime.value = res.data.statisTime || 0
              rankList.value = JSON.parse(res.data.rankList)
              if (rankList.value.length == 0 || rankList.value == null) {
                showNoList.value = true
              }
            } else {
              showNoList.value = true
              Dialog.alert({
                title: '提示',
                message:
                  '拉新排行榜活动火热进行中，赶紧邀请您的好友成为您的粉丝吧！相关数据会在每天0点更新后显示，请持续关注哦！'
              }).then(() => {
                // on close
              })
            }
          } else {
            Toast.fail(res.msg)
          }
        })
    }
    const getRankAwdInfo = () => {
      http
        .post(
          '/hbSeller/seller/fansRankAct/rankAwdInfo',
          { actCode: props.actCode },
          false
        )
        .then((res) => {
          if (res.code === '200') {
            const { joinEnd, resultFlag, userAward } = res.data.awdInfo
            // 是否已经过了参与结束时间, true: 参与时间已过, false: 参与时间未过
            if (joinEnd) {
              //  当 joinEnd 为 true的时，本字段是一个 1 到6 的数字，分六种情况
              switch (resultFlag) {
                // 1: 参与时间已结束，请耐心等待统计排名…;
                // 2: 排名更新后，未在排名内的用户: 抱歉，未开排名奖励内，请下次再接再厉！;
                // 3: 在排名内用户，提示“恭喜在排名内，开奖中，请耐心等待…”
                // 4: 在排名内用户，已经开奖, 返回奖品
                // 5: 已经领奖的情况.
                // 6: 奖品已过期的情况(用户一直没领取).
                case 1:
                  Dialog.alert({
                    title: '提示',
                    message: '参与时间已结束，请耐心等待统计排名'
                  }).then(() => {
                    // on close
                  })
                  break
                case 2:
                  Dialog.alert({
                    title: '提示',
                    message: '抱歉，未开排名奖励内，请下次再接再厉！'
                  }).then(() => {
                    // on close
                  })
                  break
                case 3:
                  Dialog.alert({
                    title: '提示',
                    message: '恭喜在排名内，开奖中，请耐心等待'
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
            } else {
              return
            }
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
      Toast(`活动奖品已领取\n请进入<我的礼品>中查看～`)
    }
    const handleCloseNoAwardPopup = () => {
      showNoAwardPopup.value = false
    }

    onMounted(() => {
      getActInfo()
      getRankAwdInfo()
    })
    return {
      actTips,
      showTips,
      showAwardPopup,
      showNoAwardPopup,
      rankNum,
      rankList,
      showNoList,
      newFansNum,
      statisTime,
      drawData,
      handleColseTips,
      handleCloseAwardPopup,
      handleCloseNoAwardPopup,
      handleReceive,
      handleClickGiftsBtn
    }
  }
})
</script>

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
      724px,
      'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/act/fansRank/bg.png'
    );
    .btn-tips {
      .bg-img(
        74px,
        31px,
        'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/act/scanCode/btn-tips.png'
      );
      position: absolute;
      top: 12px;
      right: 12px;
    }
    .btn-gift {
      .bg-img(
        74px,
        31px,
        'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/act/scanCode/btn-gift.png'
      );
      position: absolute;
      top: 52px;
      right: 12px;
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
    .rank-data {
      .bg-img(
        366px,
        114px,
        'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/act/fansRank/box-m.png'
      );
      position: absolute;
      top: 239px;
      left: 6px;
      padding: 20px 36px;
      box-sizing: border-box;
      .item {
        width: 180px;
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
          color: #ff9c00;
          text-align: center;
        }
        &.left {
          float: left;
        }
        &.right {
          width: 110px;
          float: right;
        }
      }
    }
    .rank-list {
      .bg-img(
        366px,
        354px,
        'https://qrmkt.oss-cn-beijing.aliyuncs.com/hbseller_client/act/fansRank/box-l.png'
      );
      position: absolute;
      top: 345px;
      left: 6px;
      padding: 60px 28px 40px;
      box-sizing: border-box;
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
          line-height: 254px;
          text-align: center;
          font-size: 13px;
          font-weight: 500;
          color: #555555;
        }
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
