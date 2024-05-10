<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import CesiumComponent from '@/components/Cesium/Cesium.component.vue'

import { useCesium } from '@/hooks/web/useCesium'
import * as Cesium from 'cesium'

import { ElButton } from 'element-plus'

const { mapRegister, mapMethods } = useCesium()

const { getMap } = mapMethods

defineOptions({
  name: 'Screenshot'
})

/**
 * @description: 场景导出
 * @param {*} _viewer
 * @return {*}
 */

const saveToImage = (_viewer) => {
  // 不写会导出为黑图
  _viewer.render()

  let canvas = _viewer.scene.canvas
  let image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')

  let link = document.createElement('a')
  let blob = dataURLtoBlob(image)
  let objurl = URL.createObjectURL(blob)
  link.download = 'scene.png'
  link.href = objurl
  link.click()
}

const dataURLtoBlob = (dataurl) => {
  let arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], {
    type: mime
  })
}

const cesiumLoadCB = (viewer) => {
  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(120.84, 30.15, 5000),
    orientation: {
      heading: Cesium.Math.toRadians(350.4202942851978),
      pitch: Cesium.Math.toRadians(-89.74026687972041),
      roll: Cesium.Math.toRadians(0.1)
    },
    complete: () => {
      // 定位完成之后的回调函数
      // 聚合
      // addCesiumCluster(earthquakes)
    }
  })
}
</script>

<template>
  <ContentWrap title="场景截图">
    <ElButton class="mb-4" type="primary" @click="saveToImage(getMap())">导出场景</ElButton>
    <div class="h-[calc(100vh-280px)]">
      <cesium-component
        @register="mapRegister"
        :config="{
          // homeButton: true
        }"
        tiandituTk="80cd3c8ae46ae32fa0ac19f6d739d310"
        :cesiumLoadCB="cesiumLoadCB"
      />
    </div>
  </ContentWrap>
</template>
