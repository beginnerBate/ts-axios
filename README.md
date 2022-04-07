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


