import {
  createRouter,
  createWebHistory,
  Router,
  RouteRecordRaw
} from 'vue-router'
import store from '@/store'
import axios from '@/http'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'LAYOUT',
    redirect: '/sellerActs',
    component: () =>
      import(/* webpackChunkName: "layout" */ '../components/Layout/index.vue'),
    children: [
      {
        path: 'sellerActs',
        name: 'SellerActs',
        meta: {
          title: '专属活动'
        },
        component: () =>
          import(
            /* webpackChunkName: "about" */ '../views/seller/SellerActs.vue'
          )
      },
      {
        path: 'sellerFans',
        name: 'SellerFans',
        meta: {
          title: '我的粉丝'
        },
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/seller/Fans.vue')
      },
      {
        path: 'sellerMessage',
        name: 'SellerMessage',
        meta: {
          title: '消息通知'
        },
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/seller/Message.vue')
      },
      {
        path: 'sellerInfo',
        name: 'SellerInfo',
        meta: {
          title: '个人中心'
        },
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/seller/Info.vue')
      }
    ]
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
      target: route.query.target
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
      import(/* webpackChunkName: "Transform" */ '../views/common/SignIn.vue')
  },
  // 零售户
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
  // 消费者
  {
    path: '/customer/home',
    name: 'CustomerHome',
    meta: {
      title: '零售户绑定',
      keepAlive: true
    },
    component: () =>
      import(
        /* webpackChunkName: "Register" */ '../views/customer/CustomerHome.vue'
      )
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
import provideStore from '@/utils/provideStore'
function RouterStack(router: Router) {
  // const stack = [];
  router.afterEach((to, from) => {
    console.log(to, from)
    console.log(provideStore.planList.value)
  })
  return router
}

router.beforeEach((to, from, next) => {
  const { token } = store.state
  if (token) {
    if (to.meta.title) {
      /* 路由发生变化修改页面title */
      document.title = to.meta.title as string
    }
    axios.defaults.headers.token = token
  } else {
    if (to.path !== '/common/transform') {
      alert('no token!')
    }
  }
  next()
})

RouterStack(router)

export default router
