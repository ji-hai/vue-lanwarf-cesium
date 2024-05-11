<script setup lang="ts">
import { ref } from 'vue'
import { ContentWrap } from '@/components/ContentWrap'
defineOptions({
  name: 'SSE'
})

const es = new EventSource('http://127.0.0.1:3000/sse')

const currentData = ref('')
// 监听 message 事件
es.onmessage = (event) => {
  // 挂到载体上面
  currentData.value = event.data
}

es.onopen = function (event) {
  console.log('连接成功', event)
}

es.onerror = function (error) {
  // 监听错误
  console.log('错误', error)
}
</script>

<template>
  <ContentWrap title="SSE">
    <i>本例子使用node搭建服务</i>
    <h1>
      什么是sse（Server-Sent Events）
    </h1>
    <p>
      SSE（Server-Sent Events）是一种用于实现服务器主动向客户端推送数据的技术，也被称为“事件流”（Event Stream）。
      它基于 HTTP 协议，利用了其长连接特性，在客户端与服务器之间建立一条持久化连接，
      并通过这条连接实现服务器向客户端的实时数据推送。
    </p>
    <h1>
      SSE技术的基本原理
    </h1>
    <p>
      <ol>
        <li>
          客户端向服务器发送一个GET请求，带有指定的header，表示可以接收事件流类型，并禁用任何的事件缓存。
        </li>
        <li>
          服务器返回一个响应，带有指定的header，表示事件的媒体类型和编码，
          以及使用分块传输编码（chunked）来流式传输动态生成的内容。
        </li>
        <li>
          服务器在有数据更新时，向客户端发送一个或多个名称：值字段组成的事件，由单个换行符分隔。事件之间由两个换行符分隔。
          服务器可以发送事件数据、事件类型、事件ID和重试时间等字段。
        </li>
        <li>
          客户端使用EventSource接口来创建一个对象，打开连接，并订阅onopen、
          onmessage和onerror等事件处理程序来处理连接状态和接收消息。
        </li>
        <li>
          客户端可以使用GET查询参数来传递数据给服务器，也可以使用close方法来关闭连接。
        </li>
      </ol>
    </p>
    <h1>
      数据格式
    </h1>
    <p>
      SSE 可以传输文本和二进制格式的数据，但只支持单向数据流，即只能由服务器向客户端推送数据。
      WebSocket 支持双向数据流，客户端和服务器可以互相发送消息，并且没有消息大小限制。
    </p>
    <h1>
      代码实现
    </h1>
    <p>
      前端：
      <pre style="backgroundColor: #111;color: #fff">

        const es = new EventSource('http://127.0.0.1:3000/sse')
        
        const currentData = ref('')

        // 监听 message 事件
        es.onmessage = (event) => {

        // 挂到载体上面
        currentData.value = event.data

        }

        es.onopen = function (event) {

          console.log('连接成功', event)

        } 

        es.onerror = function (error) {

        // 监听错误
        console.log('错误', error)

        }
      </pre>
      node:
      <pre style="backgroundColor: #111;color: #fff">

        // 挂载路由
         router.get('/sse', function(req, res, next) {

           // 如果需要返回跨域头
           res.setHeader('Content-Type', 'text/event-stream');

           res.setHeader('Cache-Control', 'no-cache');

           res.setHeader('Connection', 'keep-alive');

           res.setHeader('Access-Control-Allow-Origin', '*'); // 这里修改允许跨域访问的网站

           // 及时发送刷新响应头
           res.flushHeaders();

           setInterval(()=>{

             const data = {

               message: `Current time is ${new Date().toLocaleTimeString()}`

             };

             res.write(`data: ${JSON.stringify(data)}\n\n`);

           }, 2000)

         })
      </pre>
    </p>
  </ContentWrap>
</template>
