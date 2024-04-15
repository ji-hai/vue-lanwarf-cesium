<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import CesiumComponent from '@/components/Cesium/Cesium.component.vue'

import { useCesium } from "@/hooks/web/useCesium";
import * as Cesium from "cesium";

import {
  CustomMaterialLine,
  WaveCircleMaterial
} from "@/components/Cesium/CesiumMaterialProperty";

const { mapRegister, mapMethods } = useCesium()

const {
  getMap,
  cesiumNavigation,
  reverseCesiumBoundary,
  addCesiumCluster
} = mapMethods


let viewer1
const cesiumLoadCB = (viewer) => {
  viewer1 = viewer
  // ====================   将三维球定位到中国   =============================
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(120.84, 30.15, 17850000 * 0.01),
    orientation: {
      heading :  Cesium.Math.toRadians(350.4202942851978),
      pitch : Cesium.Math.toRadians(-89.74026687972041),
      roll : Cesium.Math.toRadians(0.1)
    },
    complete: ()=> {
      // 定位完成之后的回调函数
      // 聚合
      // addCesiumCluster(earthquakes)
    }
  });
  // ========================================================================


  // 添加实体线
  let glowingLine = null
  glowingLine = viewer.entities.add({
    polyline: {
      positions: [
        Cesium.Cartesian3.fromDegrees(120, 30, 0),
        Cesium.Cartesian3.fromDegrees(110, 30, 0),
      ],
      width: 5,
      material: new CustomMaterialLine({
        image: '/src/assets/image/line3.png',
        color: Cesium.Color.RED,
        duration: 2000
      }),
    }
  });

  viewer.flyTo(glowingLine)
}
</script>

<template>
  <ContentWrap title="CesiumDemo">
    <div class="w-[100%] h-[100%]">
      <cesium-component
          @register="mapRegister"
          :config="{

          // homeButton: true
        }"
          tiandituTk="80cd3c8ae46ae32fa0ac19f6d739d310"
          :cesiumLoadCB="cesiumLoadCB"
      >
      </cesium-component>
    </div>
  </ContentWrap>
</template>
