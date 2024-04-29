<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import CesiumComponent from '@/components/Cesium/Cesium.component.vue'

import { useCesium } from '@/hooks/web/useCesium'
import * as Cesium from 'cesium'

import Prompt from '@/components/Cesium/CesiumPrompt/index'

const { mapRegister, mapMethods } = useCesium()

defineOptions({
  name: 'Popup'
})

const cesiumLoadCB = (viewer) => {
  // ====================   将三维球定位到中国   =============================
  // 相机飞行
  viewer.camera.flyTo({
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
  // ========================================================================

  new Prompt(viewer, {
    type: 2,
    content: '<div style="width: 100px;height: 100px;background: red;">222</div>',
    position: [120.84, 30.15, 0], // 支持多种形式传参 cartesian3 || array || object
    close: function () {
      return false
    } // 点击关闭按钮的回调函数
  })
}
</script>

<template>
  <ContentWrap title="Popup">
    <div class="w-[100%] h-[100%]">
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
