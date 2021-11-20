// eslint-disable-next-line
declare const TMap: any
export const MapKey = 'LMLBZ-V4CCP-OJEDJ-LETNS-PT7IS-HDFR6'
export function TMapGL() {
  let r
  try {
    if (TMap) r = Promise.resolve()
  } catch {
    r = new Promise<void>(function(resolve, reject) {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src =
        'https://map.qq.com/api/gljs?v=1.exp&libraries=tools&key=' + MapKey
      script.onerror = () => reject()
      script.onload = () => resolve()
      document.head.appendChild(script)
    })
  }

  return r as Promise<void>
}
