import { http } from '@/http'
import { Dialog, Toast } from 'vant'

interface DrawParams {
  actCode: string
  ticket: string
}

export interface DrawData {
  id: number
  uaId: string
  orgId: 'hebeihehua' | 'heibeizhongyuan'
  actCode: string
  actName: string
  sn: null | string
  code: null | string
  awdStatus: number
  expireTime: string
  drawTime: string
  rcvTime: null | string
  awardId: number
  awardCode: string
  prizeName: string
  awdType: number // awardType: 1实物  3红包  6积分
  awdName: string
  awdPrice: null | number | string
  awdPic: string
  awdJumpurl: null | string
  redMoney: number
  integral: number
}

export const Draw = (params: DrawParams) => {
  return new Promise((resolve) => {
    http.post('/hbSeller/act/hbsDraw', params, false).then((res) => {
      if (res.code === '200') {
        resolve(res.data)
      } else {
        Dialog.alert({
          title: '提示',
          message: res.msg
        }).then(() => {
          // on close
        })
      }
    })
  })
}
const getGift = (params: DrawData, cb: (code?: string) => void) => {
  if (params.awdType == 1) {
    window.location.href = '/yx/views/general/order-preview.html'
  } else {
    http
      .post(
        '/syx/awd/rcv/virtual',
        {
          uaId: params.uaId
        },
        false
      )
      .then((res) => {
        //code 为701时需要绑定手机号
        if (res.code === '701') {
          return
        }

        //code为700时需要关注公号
        if (res.code === '700') {
          Dialog.alert({
            title: '提示',
            message:
              '领取此奖励需要您绑定手机号，点击“立即绑定”按钮前往公众号-个人中心-会员权益中绑定，绑定后您重新进入私域平台-我的礼品中进行领取即可'
          })
            .then(() => {
              // on confirm
              window.location.href = '/scoremall/html/member.html'
            })
            .catch(() => {
              // on cancel
              cb()
            })
          return
        }
        const tipsObj = {
          '200': '领取成功',
          '4001':
            '每日最多可领取"10"个红包，您已达到领取上限，次日0点之后可在个人中心->我的礼品中领取~<br />红包在中奖24小时之后过期。',
          '4002':
            '您还未进行微信实名认证，请先进行微信实名认证再领取红包！<br />奖品可在个人中心->我的礼品中领取~<br />红包在中奖24小时之后过期。',
          '4003':
            '系统异常，请稍后重试<br />领取失败可在个人中心->我的礼品中领取~<br />红包在中奖24小时之后过期。'
        }

        let msg = ''

        switch (res.code) {
          case '200':
            msg = tipsObj[res.code as '200']
            Toast.success({
              message: msg,
              onClose: () => {
                cb(res.code)
              }
            })
            break
          case '4001':
            msg = tipsObj[res.code as '4001']
            Dialog.alert({
              title: '提示',
              message: msg
            }).then(() => {
              // on close
              cb()
            })
            break
          case '4002':
            msg = tipsObj[res.code as '4002']
            Dialog.alert({
              title: '提示',
              message: msg
            }).then(() => {
              // on close
              cb()
            })
            break
          case '4003':
            msg = tipsObj[res.code as '4003']
            Dialog.alert({
              title: '提示',
              message: msg
            }).then(() => {
              // on close
              cb()
            })
            break
          default:
            msg = res.msg
            Dialog.alert({
              title: '提示',
              message: msg
            }).then(() => {
              // on close
              cb()
            })
            break
        }
      })
  }
}

export const handleReceive = (
  params: DrawData | null,
  cb: (code?: string) => void
) => {
  if (params == null) return
  if (params.awdStatus === 0) {
    if (params.awdType != 1) {
      getGift(params, cb)
    } else {
      // 私域跳转
      window.location.href = `/yx/views/general/order-preview.html?uaId=${params.uaId}&hbSeller=1`
    }
    return
  }
  if (params.awdStatus === 1 || params.awdStatus === 0) {
    if (params.awdType == 2 && params.awdJumpurl) {
      window.location.href = params.awdJumpurl
      return
    }
    window.location.href =
      '/yx/views/general/gift-detail.html?uaId=' + params.uaId
    return
  }
}

export const getActRules = (actCode: string): Promise<string> => {
  return new Promise((resolve) => {
    http.post('/hbSeller/act/ruleDesc', { actCode }, false).then((res) => {
      if (res.code === '200') {
        resolve((res.data.actRuleDesc as string) || '')
      } else {
        Dialog.alert({
          title: '提示',
          message: res.msg
        }).then(() => {
          // on close
        })
      }
    })
  })
}
