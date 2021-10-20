import { createStore } from 'vuex'

export interface GlobalDataProps {
  error: GlobalErrorProps
  token: string
  shopCode: string
  loading: boolean
  lat: number | null
  lng: number | null
  wxUrl: string | null
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
    wxUrl: null
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
    setLoading(state, status) {
      state.loading = status
    },
    setError(state, e: GlobalErrorProps) {
      state.error = e
    }
  },
  actions: {}
})

export default store
