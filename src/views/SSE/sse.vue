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
  <ContentWrap title="SSE"> {{ currentData }} </ContentWrap>
</template>
