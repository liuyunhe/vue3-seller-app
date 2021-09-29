export default {
  state: {
    loading: false,
    error: {
      status: false
    },
    token: localStorage.getItem('token') || '',
    name: 'VUE3.0快速入门',
    age: 18,
    github: 'https://github.com/weizhanzhan'
  }
}
