import { createStore } from 'vuex'

export interface GlobalDataProps {
  error: GlobalErrorProps
  token: string
  shopCode: string
  loading: boolean
  bindShopFlag: boolean
  hasMsg: boolean | null
  lat: number | null
  lng: number | null
  wxUrl: string | null
  bindChannel: string
}

export interface GlobalErrorProps {
  status: boolean
  message?: string
}

const store = createStore<GlobalDataProps>({
  state: {
    loading: false,
    error: {
      status: false
    },
    shopCode: sessionStorage.getItem('shopCode') || '',
    token: sessionStorage.getItem('token') || '',
    lat: null,
    lng: null,
    wxUrl: null,
    bindChannel: sessionStorage.getItem('bindChannel') || '',
    bindShopFlag: true,
    hasMsg: null
  },
  getters: {},
  mutations: {
    setLat(state, lat) {
      state.lat = lat
    },
    setLng(state, lng) {
      state.lng = lng
    },
    setWxUrl(state, url) {
      state.wxUrl = url
    },
    setToken(state, token) {
      state.token = token
    },
    setShopCode(state, shopCode) {
      state.shopCode = shopCode
    },
    setBindChannel(state, bindChannel) {
      state.bindChannel = bindChannel
    },
    setLoading(state, status) {
      state.loading = status
    },
    setHasMsg(state, status) {
      state.hasMsg = status
    },
    setError(state, e: GlobalErrorProps) {
      state.error = e
    },
    setBindShopFlag(state, bindShopFlag: boolean) {
      state.bindShopFlag = bindShopFlag
    }
  },
  actions: {}
})

export default store
