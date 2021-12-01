import store from '@/store'
import { http } from './../http/index'
// eslint-disable-next-line
declare const wx: any

// 微信jssdk
export const initWx = (callback: () => void) => {
  const init = (callback: () => void) => {
    const src = 'https://res.wx.qq.com/open/js/jweixin-1.6.0.js' //微信JSDK
    const doc = window.document
    const scr = doc.getElementsByTagName('script')[0]
    const v = doc.createElement('script')
    v.type = 'text/javascript'
    v.async = true
    v.src = src
    v.onload = function() {
      callback()
    }
    // eslint-disable-next-line
    scr.parentNode!.insertBefore(v, scr)
  }
  typeof wx === 'undefined' ? init(callback) : callback()
  return Promise.resolve()
}

// 微信配置
const wxConfig = (res: {
  appId: string
  timestamp: number
  nonceStr: string
  signature: string
}) => {
  const appId = res.appId //分享appid
  const timestamp = res.timestamp //分享时间戳
  const nonceStr = res.nonceStr //分享签名的随机串
  const signature = res.signature //分享
  wx.config({
    debug: false, //
    appId: appId, // 必填，公众号的唯一标识
    timestamp: timestamp, // 必填，生成签名的时间戳
    nonceStr: nonceStr, // 必填，生成签名的随机串
    signature: signature, // 必填，签名，见附录1
    jsApiList: [
      'updateAppMessageShareData',
      'updateTimelineShareData',
      'showOptionMenu',
      'scanQRCode',
      'getLocation',
      'hideMenuItems'
      // "hideMenuItems",
      // "hideAllNonBaseMenuItem"
    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    // openTagList: ['wx-open-launch-weapp']
  })
}

const wxOnReady = (url: string, cb: () => void) => {
  http
    .post('/syx/wx/jsapi', { url }, false)
    // eslint-disable-next-line
    .then((result: any) => {
      if (sessionStorage.getItem('prefix')) {
        wxConfig(result)
        wx.ready(function() {
          cb()
        })
      } else {
        http.get('/syx/org/property/commonList', {}).then((res) => {
          if (res.code == 200) {
            const DATA = res.data
            DATA.forEach((item: { propKey: string; propValue: string }) => {
              if (item.propKey == 'orgDomain') {
                sessionStorage.setItem('prefix', item.propValue)
                wxConfig(result)
                wx.ready(function() {
                  cb()
                })
              }
              if (item.propKey == 'score_valid_time') {
                sessionStorage.setItem('score_valid_time', item.propValue)
              }
            })
          }
        })
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

export const initWxOnReady = (url: string, cb: () => void) => {
  initWx(() => {
    wxOnReady(url, () => {
      cb()
    })
  })
}

// 微信分享
interface ShareParams {
  shareUrl: string
  shareTitle: string
  shareDesc: string
  shareImg: string
}
export const wxShare = (params: ShareParams) => {
  const { shareUrl, shareTitle, shareDesc, shareImg } = params
  const shareLink = `http://${sessionStorage.getItem('prefix')}${shareUrl}`
  wx.showOptionMenu()
  wx.updateTimelineShareData({
    title: shareTitle, // 分享标题
    link: shareLink, // 分享链接
    imgUrl: shareImg,
    success: function() {
      console.log('success')
    },
    error: function() {
      console.log('error')
    }
  })
  wx.updateAppMessageShareData({
    title: shareTitle, // 分享标题
    link: shareLink, // 分享链接
    imgUrl: shareImg,
    desc: shareDesc, // 分享描述
    success: function() {
      console.log('success')
    },
    cancel: function() {
      console.log('cancel')
    },
    fail: function() {
      console.log('error')
    }
  })
}

// 扫一扫
interface ScanQRCodeParams {
  needResult: number
  scanType: ('qrCode' | 'barCode')[]
  successCb?: Function
}
export const wxScanQRCode = (params: ScanQRCodeParams) => {
  let conf: ScanQRCodeParams = {
    needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
    scanType: ['qrCode', 'barCode'] // 可以指定扫二维码还是一维码，默认二者都有
  }
  conf = Object.assign({}, conf, params)
  console.log(conf)
  wx.scanQRCode({
    needResult: conf.needResult, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
    scanType: conf.scanType, // 可以指定扫二维码还是一维码，默认二者都有
    // eslint-disable-next-line
    success: function(res: any) {
      // var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
      if (conf.successCb) {
        conf.successCb(res)
      }
    }
  })
}

// 获取当前位置
export const wxGetLocation = (toUrl?: string) => {
  wx.getLocation({
    type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
    success: function(res: { latitude: number; longitude: number }) {
      const latitude = res.latitude // 纬度，浮点数，范围为90 ~ -90
      const longitude = res.longitude // 经度，浮点数，范围为180 ~ -180。
      // var speed = res.speed; // 速度，以米/每秒计
      // var accuracy = res.accuracy; // 位置精度
      store.commit('setLat', latitude)
      store.commit('setLng', longitude)
      return
      if (toUrl) {
        const token = sessionStorage.getItem('token')
        window.location.replace(
          `/syx/loct/common/selfLoct?lon=${longitude}&lat=${latitude}&tUrl=${toUrl}&token=${token}`
        )
      }
    },
    error: function() {
      return
      if (toUrl) {
        const token = sessionStorage.getItem('token')
        window.location.replace(
          `/syx/loct/common/selfLoct?lon=&lat=&tUrl=${toUrl}&token=${token}`
        )
      }
    }
  })
}

//隐藏菜单
export const wxHideMenu = () => {
  wx.hideMenuItems({
    menuList: [
      'menuItem:share:appMessage',
      'menuItem:share:timeline',
      'menuItem:share:qq',
      'menuItem:share:QZone',
      'menuItem:share:email',
      'menuItem:openWithSafari',
      'menuItem:openWithQQBrowser',
      'menuItem:favorite',
      'menuItem:copyUrl'
    ] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
  })
}
