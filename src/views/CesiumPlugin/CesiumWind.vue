<script setup lang="ts">
import { onMounted, markRaw, onBeforeUnmount } from 'vue'
import { ContentWrap } from '@/components/ContentWrap'
import CesiumComponent from '@/components/Cesium/Cesium.component.vue'

import { useCesium } from '@/hooks/web/useCesium'
import * as Cesium from 'cesium'

import CesiumWind from '/public/js/cesium-wind.esm.js'

import StormField from '/public/js/storm/StormField'

const { mapRegister } = useCesium()

defineOptions({
  name: 'CesiumWind'
})

import CesiumGraphics from '@/components/Cesium/CesiumGraphics'

let windLayer
let stormField
const cesiumLoadCB = (viewer) => {
  // ====================   将三维球定位到中国   =============================
  // 相机飞行
  //   viewer.camera.flyTo({
  //     destination: Cesium.Cartesian3.fromDegrees(120.84, 30.15, 17850000 * 0.01),
  //     orientation: {
  //       heading: Cesium.Math.toRadians(350.4202942851978),
  //       pitch: Cesium.Math.toRadians(-89.74026687972041),
  //       roll: Cesium.Math.toRadians(0.1)
  //     },
  //     complete: () => {
  //       // 定位完成之后的回调函数
  //       // 聚合
  //       // addCesiumCluster(earthquakes)
  //     }
  //   })
  // ========================================================================

  // 相机定位
  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(120.84, 30.15, 17850000 * 0.01),
    orientation: {
      heading: Cesium.Math.toRadians(350.4202942851978),
      pitch: Cesium.Math.toRadians(-89.74026687972041),
      roll: Cesium.Math.toRadians(0.0)
    }
  })

  const windOptions = {
    colorScale: [
      'rgb(36,104, 180)',
      'rgb(60,157, 194)',
      'rgb(128,205,193 )',
      'rgb(151,218,168 )',
      'rgb(198,231,181)',
      'rgb(238,247,217)',
      'rgb(255,238,159)',
      'rgb(252,217,125)',
      'rgb(255,182,100)',
      'rgb(252,150,75)',
      'rgb(250,112,52)',
      'rgb(245,64,32)',
      'rgb(237,45,28)',
      'rgb(220,24,32)',
      'rgb(180,0,35)'
    ],
    frameRate: 16,
    maxAge: 60,
    globalAlpha: 0.9,
    velocityScale: 1 / 30,
    paths: 2000
  }

  fetch('/public/data/uvwind_d01.json')
    .then((res) => res.json())
    .then((res) => {
      windLayer = new CesiumWind(res, { windOptions })
      windLayer.addTo(viewer)
    })

  let data = [
    {
      x: 120.3077,
      y: 30.0539,
      speed: 15,
      direction: 269
    },
    {
      x: 120.3177,
      y: 30.0439,
      speed: 15,
      direction: 269
    }
  ]
  stormField = new StormField(viewer, data, {
    forecastTime: 2
  })

  stormField.animate()
}

onBeforeUnmount(() => {
  // 清除 windLayer
  windLayer?.remove()

  // 清除 stormField
  stormField?.stopAnimate()
  stormField?.clearStorm()
})
</script>

<template>
  <ContentWrap title="CesiumWind">
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
