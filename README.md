# ts-axios
# 处理响应 header
```bash
 "connection: keep-alive\r\ncontent-length: 13\r\ncontent-type: application/json; charset=utf-8\r\ndate: Thu, 07 Apr 2022 02:33:10 GMT\r\netag: W/\"d-Ssxx4FRxEutDLwo2+xkkxKc4y0k\"\r\nx-powered-by: Express\r\n"
```
问题一  分割 key和value的时候不严谨
```js
export function parseHeaders(headers: string) : any {
  let parsed = Object.create(null)
  if(!headers){
    return 
  }
  headers.split('\r\n').forEach((line)=>{
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()
    if(!key){
      return
    }
    if(val){
      val = val.trim()
    }
    parsed[key] = val
  })
  return parsed
}
```
# 接口扩展 [2022年4月12日]

# axios函数重载-需求分析+ 重载实现 + demo 编写 [2022年4月13日] 

# axios响应式数据支持泛型: 需求分析 + 接口添加泛型参数 + demo编写[2022年4月13]

# axios拦截器实现: 需求分析 + 整体设计 + 拦截器管理类实现 + 拦截器类调用实现 + demo编写 [2022年4月13]

# axios配置化实现: 需求分析 + 默认配置 + 配置合并及策略 + flatten headers + demo编写 [2022年05月16]

# axios





