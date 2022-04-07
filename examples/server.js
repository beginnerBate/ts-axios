const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('./webpack.config')

const app = express()
const complier = webpack(webpackConfig)

app.use(webpackDevMiddleware(complier,{
  publicPath:'/__build__/',
  stats:{
    color: true,
    chunks: false
  }
}))

app.use(webpackHotMiddleware(complier))

app.use(express.static(__dirname))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

// // 添加路由
const router = express.Router()


router.get('/simple/get', function(req, res){
  res.json({
    msg:"Heoll miss liu"
  })
})
//  添加base 路由
router.get('/base/get', function(req, res){
  res.json(req.query)
})


// 添加base post 相关路由

router.post('/base/post', function(req, res){
  res.json(req.body)
})

router.post('/base/buffer', function(req, res){
  let msg = []
  req.on('data',(chunk)=>{
    if(chunk){
      msg.push(chunk)
    }
  })
  req.on('end', ()=>{
    let buf = Buffer.concat(msg)
    res.json(buf.toJSON())
  })
})

app.use(router)

const port = process.env.PORT || 8080
module.exports = app.listen(port, ()=>{
  console.log(`Serve listening on http://localhost:${port}, Ctrl + C to stop`)
})

