import { createStore } from 'vuex'

export interface GlobalDataProps {
  error: GlobalErrorProps
  token: string
  loading: boolean
  lat: number | null
  lng: number | null
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
    token: sessionStorage.getItem('token') || '',
    lat: null,
    lng: null
  },
  getters: {},
  mutations: {
    setLat(state, lat) {
      state.lat = lat
    },
    setLng(state, lng) {
      state.lng = lng
    },
    setToken(state, token) {
      state.token = token
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
