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
  name: 'Test'
})

let polygon1 = []
const cesiumLoadCB = (viewer) => {
  const cesiumGraphics = new CesiumDraw(viewer)
  // let demo = cesiumGraphics.craeteCorridorGraphics({
  //   positions: Cesium.Cartesian3.fromDegreesArray([
  //     120.073204, 30.929314, 120.085957, 30.928574, 120.086901, 30.920896
  //   ]),
  //   width: 100,
  //   extrudedHeight: 200,
  //   heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
  //   cornerType: Cesium.CornerType.ROUNDED,
  //   material: new DynamicWallMaterialProperty({
  //     viewer: viewer,
  //     image: '/src/assets/image/colors.png',
  //     color: Cesium.Color.RED,
  //     duration: 18000
  //   })
  // })

  // viewer.flyTo(demo)

  cesiumGraphics.drawPolygonGraphics({
    callback: (polygon, polygonObj) => {
      polygon1 = polygon
      // terrainClipPlan.updateData(polygon)
    }
  })

  // let terrainClipPlan = new Cesium.TerrainClipPlan($this._viewer, {
  //   height: 30,
  //   splitNum: 50,
  //   wallImg: 'src/assets/images/excavate_side_min.jpg',
  //   bottomImg: 'src/assets/images/excavate_bottom_min.jpg'
  // })
  // terrainClipPlan.updateData($this.transformWGS84ArrayToCartesianArray(polygon))
}

const getClip = () => {
  let terrainClipPlan = new TerrainClipPlan({
    viewer: getMap(),
    // positions: transformWGS84ArrayToCartesianArray(polygon1),
    height: 200,
    splitNum: 1000,
    wallImg: 'src/assets/image/excavate_side_min.jpg',
    bottomImg: 'src/assets/image/excavate_bottom_min.jpg'
  })
  terrainClipPlan.updateData(transformWGS84ArrayToCartesianArray(polygon1, 500))
}
</script>

<template>
  <ElButton @click="getClip"> 111 </ElButton>
  <ContentWrap title="Test">
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
