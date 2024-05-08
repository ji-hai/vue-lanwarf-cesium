<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import CesiumComponent from '@/components/Cesium/Cesium.component.vue'

import { useCesium } from '@/hooks/web/useCesium'
import * as Cesium from 'cesium'

import { CircleFadeMaterial } from '@/components/Cesium/CesiumMaterialProperty'

import CesiumGraphics from '@/components/Cesium/CesiumGraphics'

const { mapRegister, mapMethods } = useCesium()

const { getMap } = mapMethods

defineOptions({
  name: 'CircleFadeMaterial'
})

const cesiumLoadCB = (viewer) => {
  let cesiumGraphics = new CesiumGraphics(viewer)

  // 添加实体
  let waveCircle = null

  waveCircle = cesiumGraphics.createFadeCylinderGraphics({
    position: Cesium.Cartesian3.fromDegrees(120, 30),
    length: 700,
    bottomRadius: 500
  })

  // waveCircle = viewer.entities.add({
  //   name: 'ellipse',
  //   position: Cesium.Cartesian3.fromDegrees(120, 30, 5),
  //   ellipse: {
  //     semiMajorAxis: 1000,
  //     semiMinorAxis: 1000,
  //     material: CircleFadeMaterial({
  //       duration: 2000,

  //       color: new Cesium.Color(1.0, 1.0, 0.0)
  //     })
  //   }
  // })

  viewer.zoomTo(waveCircle)
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
      />
    </div>
  </ContentWrap>
</template>
