import  axios from '../../src/index'

axios({
  method: 'get',
  url:'/error/get1'
}).then((res)=>{
  console.log('/error/get1: '+res)
}).catch((e)=>{
  console.log('/error/get1: '+e)
})

axios({
  method: 'get',
  url:'/error/get'
}).then((res)=>{
  console.log('/error/get'+res)
}).catch((e)=>{
  console.log('/error/get'+e)
})


setTimeout(() => {
  axios({
    method: 'get',
    url: '/error/get'
  }).then((res) => {
    console.log('setTimeout'+res)
  }).catch((e) => {
    console.log('setTimeout'+e)
  })
}, 5000)


axios({
  method: 'get',
  url: '/error/timeout',
  timeout: 2000
}).then((res) => {
  console.log('timeout'+res)
}).catch((e) => {
  console.log('timeout'+e.message)
})