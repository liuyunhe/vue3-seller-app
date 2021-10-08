import { useRouter } from 'vue-router'

const router = useRouter()
export const handleClickJumpBtn = (path: string) => {
  router.push(path)
}
