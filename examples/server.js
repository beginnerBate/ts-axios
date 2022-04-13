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

// 添加error 相关路由

router.get('/error/get', function(req, res){
  if(Math.random() > 0.5){
    res.json({
      msg: `hello world`
    })
  }else{
    res.status(500)
    res.end
  }
})

router.get('/error/timeout', function(req, res){
  setTimeout(()=>{
    res.json({
      msg:`hello world`
    })
  }, 3000)
})

// 封装接口路由函数
registerExtendRouter()

app.use(router)

const port = process.env.PORT || 8080
module.exports = app.listen(port, ()=>{
  console.log(`Serve listening on http://localhost:${port}, Ctrl + C to stop`)
})


function registerExtendRouter(){

  router.get('/extend/get', function(req, res){
    res.json({
      msg:'hello world'
    })
  })

  router.options('/extend/options', function(req, res){
    res.end()
  })

  router.delete('/extend/delete', function(req, res){
    res.end()
  })

  router.head('/extend/head', function(req, res){
    res.end()
  })

  router.post('/extend/post', function(req, res){
    res.json(req.body)
  })
  router.put('/extend/put', function(req, res){
    res.json(req.body)
  })
  router.patch('/extend/patch', function(req, res){
    res.json(req.body)
  })

}
