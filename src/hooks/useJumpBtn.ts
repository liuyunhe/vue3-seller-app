import { Router } from 'vue-router'

export const handleClickJumpBtn = (router: Router, path: string) => {
  router.push(path)
}
