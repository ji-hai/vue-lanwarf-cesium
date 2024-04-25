<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import CesiumComponent from '@/components/Cesium/Cesium.component.vue'

import { useCesium } from '@/hooks/web/useCesium'
import * as Cesium from 'cesium'

import {
  CustomMaterial,
  CustomMaterialWall,
  DynamicWallMaterialProperty,
  PolylineTrailLinkMaterialProperty,
  HexagonSpread
} from '@/components/Cesium/CesiumMaterialProperty'

const { mapRegister, mapMethods } = useCesium()

const { getMap } = mapMethods

defineOptions({
  name: 'Hexagon'
})

const cesiumLoadCB = (viewer) => {
  // ====================   将三维球定位到中国   =============================
  // 相机飞行
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(120, 30, 5000),
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
  // 六边形扩散
  const hexagonSpread1 = new HexagonSpread(viewer, 'hexagonSpred1')
  hexagonSpread1.add([120, 30, 0], '#0099BF', 1000, 7500)
}
</script>

<template>
  <ContentWrap title="Hexagon">
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
