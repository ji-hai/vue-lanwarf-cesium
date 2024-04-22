<script setup lang="ts">
import { onBeforeUnmount, onMounted, reactive } from 'vue'
import { ContentWrap } from '@/components/ContentWrap'

const netWork = reactive({
  downlink: '',
  effectiveType: '',
  rtt: ''
})

const getNetwork = () => {
  netWork.downlink = navigator.connection.downlink
  netWork.effectiveType = navigator.connection.effectiveType
  netWork.rtt = navigator.connection.rtt
}
onMounted(() => {
  window.addEventListener('online', getNetwork)

  navigator.connection.addEventListener('change', getNetwork)

  window.addEventListener('offline', getNetwork)
  getNetwork()
})

onBeforeUnmount(() => {
  window.removeEventListener('online', getNetwork)

  navigator.connection.removeEventListener('change', getNetwork)

  window.removeEventListener('offline', getNetwork)
})
</script>

<template>
  <ContentWrap title="网络状态判断">
    <div :style="{ color: netWork.rtt == '' ? 'red' : '' }">
      <p> 网络状态:{{ netWork.effectiveType }} </p>
      <p> 延迟:{{ netWork.rtt }}ms </p>
      <p> 带宽:{{ netWork.downlink }}m/s </p>
    </div>
  </ContentWrap>
</template>
