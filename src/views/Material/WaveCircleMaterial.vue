<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import CesiumComponent from '@/components/Cesium/Cesium.component.vue'

import { useCesium } from "@/hooks/web/useCesium";
import * as Cesium from "cesium";

import {
  WaveCircleMaterial
} from "@/components/Cesium/CesiumMaterialProperty";

const { mapRegister, mapMethods } = useCesium()

const {
  getMap,
  cesiumNavigation,
} = mapMethods

defineOptions({
  name: 'WaveCircleMaterial'
})

const cesiumLoadCB = (viewer) => {
  cesiumNavigation(viewer)
  // 添加实体线
  let waveCircle = null
  waveCircle = viewer.entities.add({
    name: 'ellipse',
    position: Cesium.Cartesian3.fromDegrees(120, 30, 5),
    ellipse: {
      semiMajorAxis: 500,
      semiMinorAxis: 500,
      material: WaveCircleMaterial({
        duration: 2e3,

        gradient: 0,

        color: new Cesium.Color(1.0, 0.0, 0.0, 1.0),

        count: 3
      })
    }
  })

  viewer.flyTo(waveCircle)

   viewer.entities.add({
    name: 'ellipse',
    position: Cesium.Cartesian3.fromDegrees(120.01, 30.01, 5),
    ellipse: {
      semiMajorAxis: 500,
      semiMinorAxis: 500,
      material: WaveCircleMaterial({
        duration: 2e3,

        gradient: 0,

        color: new Cesium.Color(1.0, 1.0, 0.0, 1.0),

        count: 2
      })
    }
  })
}
</script>

<template>
  <ContentWrap title="圆形波纹材质">
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
