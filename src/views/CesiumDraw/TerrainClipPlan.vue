<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import CesiumComponent from '@/components/Cesium/Cesium.component.vue'

import { ElButton } from 'element-plus'
import { useCesium } from '@/hooks/web/useCesium'
import * as Cesium from 'cesium'

import CesiumDraw from '@/components/Cesium/CesiumDraw'
import { DynamicWallMaterialProperty } from '@/components/Cesium/CesiumMaterialProperty'
import TerrainClipPlan from '@/components/Cesium/CesiumTerrainClipPlan'
import { transformWGS84ArrayToCartesianArray } from '@/components/Cesium/CesiumBase'

const { mapRegister, mapMethods } = useCesium()

const { getMap } = mapMethods

defineOptions({
  name: 'TerrainClipPlan'
})

let polygon1 = []
const cesiumLoadCB = (viewer) => {
  const cesiumGraphics = new CesiumDraw(viewer)

  cesiumGraphics.drawPolygonGraphics({
    callback: (polygon, polygonObj) => {
      let terrainClipPlan = new TerrainClipPlan({
        viewer: viewer,
        // positions: transformWGS84ArrayToCartesianArray(polygon),
        height: 200,
        splitNum: 1000,
        wallImg: 'src/assets/image/excavate_side_min.jpg',
        bottomImg: 'src/assets/image/excavate_bottom_min.jpg'
      })
      terrainClipPlan.updateData(transformWGS84ArrayToCartesianArray(polygon))
    }
  })
}
</script>

<template>
  <ContentWrap title="TerrainClipPlan">
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
