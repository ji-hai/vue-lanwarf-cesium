<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import CesiumComponent from '@/components/Cesium/Cesium.component.vue'

import { useCesium } from '@/hooks/web/useCesium'
import * as Cesium from 'cesium'

const { mapRegister } = useCesium()

defineOptions({
  name: 'CesiumDemo'
})

import CesiumGraphics from '@/components/Cesium/CesiumGraphics'

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

  const Graphics = CesiumGraphics.getInstance(viewer)

  Graphics.createPointsGraphics({
    positions: [Cesium.Cartesian3.fromDegrees(120.84, 30.15, 0)],
    point: {
      pixelSize: 10,
      color: Cesium.Color.RED
    },
    billboard: {
      image: '/src/assets/image/img.png'
    },
    label: {
      text: '我是一个点',
      font: '20px sans-serif',
      fillColor: Cesium.Color.RED,
      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      outlineWidth: 2,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      pixelOffset: new Cesium.Cartesian2(0, -9)
    }
  })
}
</script>

<template>
  <ContentWrap title="CesiumDemo">
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
