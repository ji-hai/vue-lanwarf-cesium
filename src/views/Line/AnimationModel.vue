<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import CesiumComponent from '@/components/Cesium/Cesium.component.vue'

import { useCesium } from '@/hooks/web/useCesium'
import * as Cesium from 'cesium'

import {
  CustomMaterial,
  CustomMaterialWall,
  DynamicWallMaterialProperty,
  PolylineTrailLinkMaterialProperty
} from '@/components/Cesium/CesiumMaterialProperty'

const { mapRegister, mapMethods } = useCesium()

const { getMap } = mapMethods

defineOptions({
  name: 'AnimationModel'
})

const cesiumLoadCB = (viewer) => {
  let startPosition = new Cesium.Cartesian3.fromDegrees(120.14046454, 30.27415039)
  let endPosition = new Cesium.Cartesian3.fromDegrees(120.16701991, 30.27648221)
  let factor = 0
  // 添加模型
  const vehicleEntity = viewer.entities.add({
    position: new Cesium.CallbackProperty(function () {
      if (factor > 5000) {
        factor = 0
      }
      factor++
      // 动态更新位置
      return Cesium.Cartesian3.lerp(
        startPosition,
        endPosition,
        factor / 5000.0,
        new Cesium.Cartesian3()
      )
    }, false),
    // orientation: Cesium.Transforms.headingPitchRollQuaternion(
    //   Cesium.Cartesian3.fromDegrees(120.16907205003166, 30.175928962346774, 0),
    //   new Cesium.HeadingPitchRoll(
    //     Cesium.Math.toRadians(90), // 方向
    //     Cesium.Math.toRadians(0),
    //     Cesium.Math.toRadians(0)
    //   )
    // ),
    model: {
      uri: 'src/assets/SampleData/glb/redCar.glb',
      scale: 0.1
    },
    path: {
      resolution: 60,
      width: 100,
      material: Cesium.Color.RED,
      leadTime: 0,
      trailTime: 0
    }
  })

  // 聚焦模型
  viewer.trackedEntity = vehicleEntity
}
</script>

<template>
  <ContentWrap title="动态更新位置">
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
