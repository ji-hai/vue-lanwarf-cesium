<script setup lang="ts">
defineOptions({
  name: 'ScaleCom'
})

import useDraw from './useDraw'
import { onBeforeMount, onMounted } from 'vue'
import { useDesign } from '@/hooks/web/useDesign'
// * 适配处理
const { appRef, calcRate, windowDraw, unWindowDraw } = useDraw()

const { getPrefixCls } = useDesign()
onMounted(() => {
  calcRate()
  windowDraw()
})

onBeforeMount(() => {
  unWindowDraw()
})
</script>

<template>
  <div ref="appRef" :class="getPrefixCls('autofit')" class="autofit">
    <slot></slot>
  </div>
</template>

<style scoped>
.autofit {
  color: #d3d6dd;
  /*根据设计稿的宽高进行修改*/
  width: 1920px;
  height: 1080px;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transform-origin: left top;
}
</style>
