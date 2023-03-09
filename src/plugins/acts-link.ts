// 活动对应路径

interface ActLink {
  [key: string]: string
}

export const CUSTOMER_ACT_LINK: ActLink = {
  scanDraw: '/customer/scanCode',
  signDraw: '/customer/sign'
}
export const SELLER_ACT_LINK: ActLink = {
  newFansRank: '/seller/fansRank',
  coreFan: '/seller/scanFansRank'
}
