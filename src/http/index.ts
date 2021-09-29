import axios, { AxiosRequestConfig } from 'axios'
import { Toast } from 'vant'
import { nextTick } from 'vue'
import qs from 'qs'

axios.interceptors.request.use((config) => {
  console.log(config)
  if (config.url !== '/api/upload') {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0
    })
  }
  return config
})
axios.interceptors.response.use(
  (response) => {
    nextTick(() => {
      Toast.clear()
    })
    return response
  },
  (e) => {
    const { error } = e.response.data
    nextTick(() => {
      Toast.clear()
      Toast.fail({
        message: error,
        forbidClick: true,
        duration: 3000
      })
    })
    return Promise.reject(error)
  }
)

const send = async (config: AxiosRequestConfig) => {
  try {
    const { data: res } = await axios(config)
    return Promise.resolve(res)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const http = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get: async (url: string, params: any) => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url,
      params
    }
    return send(config)
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post: async (url: string, data: any, jsonFlag: boolean): Promise<any> => {
    const config: AxiosRequestConfig = {
      method: 'POST',
      url,
      data
    }
    if (jsonFlag) {
      config.headers = {
        'Content-type': 'application/json;charset=UTF-8'
      }
      config.data = JSON.stringify(data)
    } else {
      config.data = qs.stringify(data)
    }
    return send(config)
  }
}

export default axios
