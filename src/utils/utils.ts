export const getRandomAvatar = (identicon: HTMLElement) => {
  if (identicon.children.length) return
  const colors = ['#8473C6', '#DBBB9A', '#84BED4', '#6F99D2', '#9EDB90']
  let data = []
  for (let i = 0; i < 5; i++) {
    data.push([
      Math.floor(Math.random() * 2),
      Math.floor(Math.random() * 2),
      Math.floor(Math.random() * 2)
    ])
  }
  data = data.map(function(d) {
    d.push(d[1], d[0])
    return d
  })
  identicon.innerHTML = ''
  const color = colors[Math.floor(Math.random() * colors.length)]
  data.forEach(function(d) {
    d.forEach(function(_d) {
      const el = document.createElement('div')
      el.setAttribute('data', _d.toString())
      el.style.background = color
      identicon.appendChild(el)
    })
  })
}

export const getBeforeNowCount = (date: string) => {
  const diffDate = Date.parse(date)
  const now = Date.parse(new Date().toString())
  let diffDay = Math.abs(diffDate - now)
  diffDay = Math.floor(diffDay / (24 * 3600 * 1000))
  if (diffDay > 0) {
    return diffDay + '天前'
  } else {
    const diffHour = new Date(date).getHours()
    const nowHour = new Date().getHours()
    const diffed = Math.abs(diffHour - nowHour)
    if (diffed > 0) return diffed + '小时前'
    const diffSecond = new Date(date).getSeconds()
    const nowSecond = new Date().getSeconds()
    const diffedSecond = Math.abs(diffSecond - nowSecond)
    return diffedSecond + '秒前'
  }
}
