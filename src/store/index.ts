import { createStore } from 'vuex'

export interface GlobalDataProps {
  error: GlobalErrorProps
  token: string
  loading: boolean
  name: string
  age: number
  github: string
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
    name: 'VUE3.0快速入门',
    age: 18,
    github: 'https://github.com/weizhanzhan'
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setLoading(state, status) {
      state.loading = status
    },
    setError(state, e: GlobalErrorProps) {
      state.error = e
    }
  }
})

export default store
