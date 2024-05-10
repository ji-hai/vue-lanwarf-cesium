<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import CesiumComponent from '@/components/Cesium/Cesium.component.vue'

import { useCesium } from '@/hooks/web/useCesium'
import * as Cesium from 'cesium'

import { ElButton } from 'element-plus'

const { mapRegister, mapMethods } = useCesium()

const { getMap } = mapMethods

defineOptions({
  name: 'ModelGraphics'
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

  // 模型
  cesiumGraphics.createModelGraphics({
    position: Cesium.Cartesian3.fromDegrees(120.84, 30.15, 5000),
    // orientation: Cesium.Transforms.headingPitchRollQuaternion(
    //   Cesium.Cartesian3.fromDegrees(120.84, 30.15, 5000),
    //   new Cesium.HeadingPitchRoll(
    //     Cesium.Math.toRadians(180), // 方向
    //     Cesium.Math.toRadians(0),
    //     Cesium.Math.toRadians(100)
    //   )
    // ),
    model: {
      uri: '/src/assets/SampleData/glb/pyramid.glb',
      minimumPixelSize: 500,
      maximumScale: 10000,
      scale: 0.1
    }
  })
}
</script>

<template>
  <ContentWrap title="ModelGraphics">
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
