import {
  createRouter,
  createWebHistory,
  Router,
  RouteRecordRaw
} from 'vue-router'
import store from '@/store'
import axios from '@/http'
import { initWxOnReady, wxGetLocation, wxHideMenu } from '@/plugins/Wx'

const COMMON_ROUTES: Array<RouteRecordRaw> = [
  // 平台页面
  // 首页
  {
    path: '/',
    name: 'Home',
    redirect: '/common/signIn',
    meta: {
      title: ''
    }
  },
  {
    path: '/common/transform',
    name: 'Transform',
    meta: {
      title: ''
    },
    props: (route) => ({
      token: route.query.token,
      target: route.query.target,
      shopCode: route.query.shopCode,
      bindChannel: route.query.bindChannel
    }),
    component: () =>
      import(
        /* webpackChunkName: "Transform" */ '../views/common/Transform.vue'
      )
  },
  {
    path: '/common/signIn',
    name: 'SignIn',
    meta: {
      title: ''
    },
    component: () =>
      import(/* webpackChunkName: "SignIn" */ '../views/common/SignIn.vue')
  },
  {
    path: '/common/feedback',
    name: 'Feedback',
    meta: {
      title: '意见反馈'
    },
    props: (route) => ({
      feedFrom: route.query.feedFrom
    }),
    component: () =>
      import(/* webpackChunkName: "Feedback" */ '../views/common/Feedback.vue')
  },
  {
    path: '/common/myGifts',
    name: 'MyGifts',
    meta: {
      title: '我的礼品'
    },
    component: () =>
      import(/* webpackChunkName: "MyGifts" */ '../views/common/MyGifts.vue')
  },
  {
    path: '/common/myPoints',
    name: 'MyPoints',
    meta: {
      title: '我的积分'
    },
    props: (route) => ({
      shopName: route.query.shopName
    }),
    component: () =>
      import(/* webpackChunkName: "MyGifts" */ '../views/common/MyPoints.vue')
  }
]

const SELLER_ROUTES: Array<RouteRecordRaw> = [
  // 零售户
  {
    path: '/seller',
    name: 'SellerLayout',
    redirect: '/seller/sellerFans',
    component: () =>
      import(
        /* webpackChunkName: "SellerLayout" */ '../components/SellerLayout/index.vue'
      ),
    children: [
      {
        path: 'sellerActs',
        name: 'SellerActs',
        meta: {
          title: '专属活动'
        },
        component: () =>
          import(
            /* webpackChunkName: "SellerActs" */ '../views/seller/SellerActs.vue'
          )
      },
      {
        path: 'sellerFans',
        name: 'SellerFans',
        meta: {
          title: '我的粉丝'
        },
        component: () =>
          import(
            /* webpackChunkName: "SellerFans" */ '../views/seller/Fans.vue'
          )
      },
      {
        path: 'sellerMessage',
        name: 'SellerMessage',
        meta: {
          title: '消息通知'
        },
        component: () =>
          import(
            /* webpackChunkName: "SellerMessage" */ '../views/seller/Message.vue'
          )
      },

      {
        path: 'sellerInfo',
        name: 'SellerInfo',
        meta: {
          title: '个人中心'
        },
        component: () =>
          import(
            /* webpackChunkName: "SellerInfo" */ '../views/seller/PersonalInfo.vue'
          )
      }
    ]
  },
  {
    path: '/seller/register',
    name: 'Register',
    meta: {
      title: '注册零售户',
      keepAlive: true
    },
    component: () =>
      import(/* webpackChunkName: "Register" */ '../views/seller/Register.vue')
  },
  {
    path: '/seller/actDetail',
    name: 'SellerActDetail',
    meta: {
      title: '活动详情',
      keepAlive: true
    },
    component: () =>
      import(/* webpackChunkName: "Register" */ '../views/seller/ActDetail.vue')
  },
  {
    path: '/seller/inviteFans',
    name: 'InviteFans',
    meta: {
      title: '粉丝邀约',
      keepAlive: true
    },
    component: () =>
      import(
        /* webpackChunkName: "InviteFans" */ '../views/seller/InviteFans.vue'
      )
  },
  {
    path: '/seller/fansBind',
    name: 'FansBind',
    meta: {
      title: '粉丝邀约',
      keepAlive: true
    },
    component: () =>
      import(/* webpackChunkName: "FansBind" */ '../views/seller/FansBind.vue')
  },
  {
    path: '/seller/sellerRebateDetail',
    name: 'SellerRebateDetail',
    meta: {
      title: '扫码返佣'
    },
    props: (route) => ({
      actCode: route.query.actCode
    }),
    component: () =>
      import(
        /* webpackChunkName: "SellerMessage" */ '../views/seller/RebateDetail.vue'
      )
  },
  {
    path: '/seller/myRebate',
    name: 'SellerMyRebate',
    meta: {
      title: '我的返佣'
    },
    component: () =>
      import(
        /* webpackChunkName: "SellerMessage" */ '../views/seller/MyRebate.vue'
      )
  },
  {
    path: '/seller/fansRank',
    name: 'SellerFansRank',
    meta: {
      title: '零售店排行榜'
    },
    props: (route) => ({
      actCode: route.query.actCode
    }),
    component: () =>
      import(
        /* webpackChunkName: "SellerMessage" */ '../views/seller/Acts/FansRank.vue'
      )
  },
  {
    path: '/seller/bindFansQrcode',
    name: 'BindFansQrcode',
    meta: {
      title: '我的邀请码',
      keepAlive: true
    },
    component: () =>
      import(
        /* webpackChunkName: "BindFansQrcode" */ '../views/seller/BindFansQrcode.vue'
      )
  },
  {
    path: '/seller/messageDetail',
    name: 'SelllerMessageDetail',
    props: (route) => ({
      id: route.query.id
    }),
    meta: {
      title: '消息详情'
    },
    component: () =>
      import(
        /* webpackChunkName: "SelllerMessageDetail" */ '../views/seller/MessageDetail.vue'
      )
  },
  {
    path: '/seller/memberInfo',
    name: 'SellerMemberInfo',
    meta: {
      title: '会员等级'
    },
    component: () =>
      import(
        /* webpackChunkName: "SellerMemberInfo" */ '../views/seller/MemberInfo.vue'
      )
  },
  {
    path: '/seller/myInvite',
    name: 'SellerMyInvite',
    meta: {
      title: '我的邀约'
    },
    component: () =>
      import(
        /* webpackChunkName: "SellerMyInvite" */ '../views/seller/MyInvite.vue'
      )
  },
  {
    path: '/seller/editInvition',
    name: 'SellerEditInvition',
    meta: {
      title: '活动邀约'
    },
    props: (route) => ({
      titleP: route.query.title,
      subTitleP: route.query.subTitle,
      contentP: route.query.content
    }),
    component: () =>
      import(
        /* webpackChunkName: "SellerEditInvition" */ '../views/seller/EditInvition.vue'
      )
  },
  {
    path: '/seller/inviteDetail',
    name: 'SelllerInviteDetail',
    props: (route) => ({
      id: route.query.id
    }),
    meta: {
      title: '消息详情'
    },
    component: () =>
      import(
        /* webpackChunkName: "SelllerMessageDetail" */ '../views/seller/InviteDetail.vue'
      )
  }
]

const CUSTOMRT_ROUTES: Array<RouteRecordRaw> = [
  // 消费者
  {
    path: '/customer',
    name: 'CustomerLayout',
    redirect: '/customer/home',
    component: () =>
      import(
        /* webpackChunkName: "CustomerLayout" */ '../components/CustomerLayout/index.vue'
      ),
    children: [
      {
        path: 'home',
        name: 'CustomerHome',
        meta: {
          title: '零售户店铺',
          keepAlive: true
        },
        component: () =>
          import(
            /* webpackChunkName: "CustomerHome" */ '../views/customer/CustomerHome.vue'
          )
      },
      {
        path: 'customerActs',
        name: 'CustomerActs',
        meta: {
          title: '专属活动',
          keepAlive: true
        },
        component: () =>
          import(
            /* webpackChunkName: "CustomerActs" */ '../views/customer/CustomerActs.vue'
          )
      },
      {
        path: 'customerMessage',
        name: 'CustomerMessage',
        meta: {
          title: '我的消息',
          keepAlive: true
        },
        component: () =>
          import(
            /* webpackChunkName: "CustomerMessage" */ '../views/customer/Message.vue'
          )
      },
      {
        path: 'customerInfo',
        name: 'CustomerInfo',
        meta: {
          title: '个人中心'
        },
        component: () =>
          import(
            /* webpackChunkName: "CustomerInfo" */ '../views/customer/PersonalInfo.vue'
          )
      }
    ]
  },
  {
    path: '/customer/actDetail',
    name: 'CustomerActDetail',
    meta: {
      title: '活动详情',
      keepAlive: true
    },
    component: () =>
      import(
        /* webpackChunkName: "Register" */ '../views/customer/ActDetail.vue'
      )
  },
  {
    path: '/customer/scanCode',
    name: 'CustomerScanCode',
    meta: {
      title: '扫码验真抽奖',
      keepAlive: false
    },
    component: () =>
      import(
        /* webpackChunkName: "Register" */ '../views/customer/Acts/ScanCode.vue'
      )
  },
  {
    path: '/customer/messageDetail',
    name: 'CustomerMessageDetail',
    props: (route) => ({
      id: route.query.id,
      type: route.query.type
    }),
    meta: {
      title: '消息详情'
    },
    component: () =>
      import(
        /* webpackChunkName: "CustomerMessageDetail" */ '../views/customer/MessageDetail.vue'
      )
  },
  {
    path: '/customer/userInfo',
    name: 'CustomerUserInfo',
    meta: {
      title: '个人资料'
    },
    component: () =>
      import(
        /* webpackChunkName: "CustomerUserInfo" */ '../views/customer/UserInfo.vue'
      )
  }
]

const routes: Array<RouteRecordRaw> = [
  ...COMMON_ROUTES,
  ...CUSTOMRT_ROUTES,
  ...SELLER_ROUTES
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// const routerPush = router.push;
// router.push = function(to) {
//   console.log("路由拦截push");
//   return routerPush.call(this, to).catch(error => error);
// };

// router.back = function() {
//   console.log("路由拦截back");
//   return router.go(-1);
// };

// import provideStore from '@/utils/provideStore'
function RouterStack(router: Router) {
  // const stack = []
  router.afterEach((to, from) => {
    console.log(to, from)

    // console.log(provideStore.planList.value)
  })
  return router
}

router.beforeEach((to, from, next) => {
  const { token, wxUrl } = store.state
  // 刷新的情况下重新配置wxjssdk
  if (!wxUrl) {
    store.commit('setWxUrl', `${location.origin}/HbsClient${to.fullPath}`)
    if (sessionStorage.getItem('token')) {
      axios.defaults.headers.token = sessionStorage.getItem('token')
      const url: string = /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)
        ? `${location.origin}/HbsClient${to.fullPath}`
        : location.href.split('#')[0]

      initWxOnReady(url, () => {
        wxGetLocation()
        wxHideMenu()
      })
    }
  }
  if (token) {
    if (to.meta.title) {
      /* 路由发生变化修改页面title */
      document.title = to.meta.title as string
    }
    if (!axios.defaults.headers.token) {
      axios.defaults.headers.token = token
    }
  } else {
    if (to.path !== '/common/transform') {
      alert('no token!')
    }
  }
  next()
})

RouterStack(router)

export default router
