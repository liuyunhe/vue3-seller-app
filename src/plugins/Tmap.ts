// eslint-disable-next-line
declare const TMap: any
const MapKey = 'XA6BZ-LXHKS-424O2-6IBRS-FP4Q2-5EFTW'
export function TMapGL() {
  // console.log(TMap == undefined)
  // const TMap = window.TMap || null
  let r
  try {
    if (TMap) r = Promise.resolve()
  } catch {
    r = new Promise<void>(function(resolve, reject) {
      console.log(11111)
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
