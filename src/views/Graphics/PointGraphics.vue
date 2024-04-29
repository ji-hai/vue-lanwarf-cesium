<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import CesiumComponent from '@/components/Cesium/Cesium.component.vue'

import { useCesium } from '@/hooks/web/useCesium'
import * as Cesium from 'cesium'

import { ElButton } from 'element-plus'

const { mapRegister, mapMethods } = useCesium()

const { getMap } = mapMethods

defineOptions({
  name: 'PointGraphics'
})

import CesiumGraphics from '@/components/Cesium/CesiumGraphics'
import { onBeforeMount, onBeforeUnmount } from 'vue'

let cesiumGraphics
const cesiumLoadCB = (viewer) => {
  // 相机定位
  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(120.84, 30.15, 17850000 * 0.01),
    orientation: {
      heading: Cesium.Math.toRadians(350.4202942851978),
      pitch: Cesium.Math.toRadians(-89.74026687972041),
      roll: Cesium.Math.toRadians(0.0)
    }
  })

  cesiumGraphics = new CesiumGraphics(viewer)

  //  点
  cesiumGraphics.createPointsGraphics({
    positions: [
      Cesium.Cartesian3.fromDegrees(120.84, 30.15, 0),
      Cesium.Cartesian3.fromDegrees(120.85, 30.15, 0)
    ],
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
  <ContentWrap title="PointGraphics">
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
