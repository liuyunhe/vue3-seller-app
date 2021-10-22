import {
  createRouter,
  createWebHistory,
  Router,
  RouteRecordRaw
} from 'vue-router'
import store from '@/store'
import axios from '@/http'
import { initWxOnReady, wxGetLocation, wxHideMenu } from '@/plugins/Wx'

const routes: Array<RouteRecordRaw> = [
  // 首页
  {
    path: '/',
    name: 'Home',
    redirect: '/common/signIn',
    meta: {
      title: ''
    }
  },

  // 平台页面
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
      import(
        /* webpackChunkName: "InviteFans" */ '../views/seller/FansBind.vue'
      )
  },
  {
    path: '/seller/bindFansQrcode',
    name: 'BindFansQrcode',
    meta: {
      title: '粉丝绑定码',
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
        /* webpackChunkName: "SellerMyInvite" */ '../views/seller/EditInvition.vue'
      )
  },
  // 消费者
  {
    path: '/customer',
    name: 'CustomerLayout',
    redirect: '/customer/home',
    component: () =>
      import(
        /* webpackChunkName: "SellerLayout" */ '../components/CustomerLayout/index.vue'
      ),
    children: [
      {
        path: 'home',
        name: 'CustomerHome',
        meta: {
          title: '零售户绑定',
          keepAlive: true
        },
        component: () =>
          import(
            /* webpackChunkName: "CustomerHome" */ '../views/customer/CustomerHome.vue'
          )
      }
    ]
  }
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
