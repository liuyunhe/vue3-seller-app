import { http } from '@/http'
import { Dialog } from 'vant'

interface DrawParams {
  actCode: string
  ticket: string
}

// export interface Award {

// }

export const Draw = (params: DrawParams) => {
  return new Promise((resolve) => {
    http.post('/hbSeller/act/hbsDraw', params, false).then((res) => {
      if (res.code === '200') {
        resolve(res.data)
      } else {
        Dialog.alert({
          title: '提示',
          message: res.msg
        }).then(() => {
          // on close
        })
      }
    })
  })
}
