<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import CesiumComponent from '@/components/Cesium/Cesium.component.vue'

import { useCesium } from '@/hooks/web/useCesium'
import * as Cesium from 'cesium'

import {
  CustomMaterial,
  CustomMaterialWall,
  DynamicWallMaterialProperty
} from '@/components/Cesium/CesiumMaterialProperty'

const { mapRegister, mapMethods } = useCesium()

const { getMap } = mapMethods

defineOptions({
  name: 'CustomMaterialLine'
})

const cesiumLoadCB = (viewer) => {
  // 添加实体线
  let glowingLine = null
  glowingLine = viewer.entities.add({
    polyline: {
      positions: [
        Cesium.Cartesian3.fromDegrees(120.5, 30.1, 0),
        Cesium.Cartesian3.fromDegrees(120.8, 30.2, 0)
      ],
      width: 5,
      material: CustomMaterial({
        image: '/src/assets/image/line3.png',
        color: Cesium.Color.RED,
        duration: 2000
      })
    }
  })

  viewer.zoomTo(glowingLine)

  // viewer.entities.add({
  //   polyline: {
  //     positions: [
  //       Cesium.Cartesian3.fromDegrees(120.5, 30.1, 0),
  //       Cesium.Cartesian3.fromDegrees(120.3, 30.4, 0)
  //     ],
  //     width: 5,
  //     material: CustomMaterial({
  //       image: '/src/assets/image/line2.png',
  //       color: Cesium.Color.WHITE,
  //       duration: 2000
  //     })
  //   }
  // })

  // viewer.entities.add({
  //   polyline: {
  //     positions: [
  //       Cesium.Cartesian3.fromDegrees(120.5, 30.1, 0),
  //       Cesium.Cartesian3.fromDegrees(120.2, 30.5, 0)
  //     ],
  //     width: 10,
  //     material: CustomMaterial({
  //       image: '/src/assets/image/line.png',
  //       color: Cesium.Color.WHITE,
  //       duration: 2000
  //     })
  //   }
  // })

  // viewer.entities.add({
  //   wall: {
  //     positions: Cesium.Cartesian3.fromDegreesArray([
  //       120.0, 30.0, 121.0, 30.0, 120.0, 31.0, 121.0, 31.0
  //     ]),
  //     width: 10,
  //     // 设置高度
  //     minimumHeights: [12000, 12000, 12000, 12000],
  //     maximumHeights: [50, 50, 50, 50],
  //     material: new CustomMaterialWall({
  //       viewer: viewer,
  //       image: '/src/assets/image/colors.png',
  //       color: Cesium.Color.RED,
  //       duration: 18000
  //     })
  //   }
  // })

  // viewer.entities.add({
  //   wall: {
  //     positions: Cesium.Cartesian3.fromDegreesArray([
  //       120.0, 30.0, 121.0, 30.0, 120.0, 31.0, 121.0, 31.0
  //     ]),
  //     minimumHeights: [12000, 12000, 12000, 12000],
  //     maximumHeights: [50, 50, 50, 50],
  //     material: new DynamicWallMaterialProperty({
  //       viewer: viewer,
  //       image: '/src/assets/image/colors.png',
  //       color: Cesium.Color.RED,
  //       duration: 18000
  //     })
  //   }
  // })
}
</script>

<template>
  <ContentWrap title="流动线条材质">
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
