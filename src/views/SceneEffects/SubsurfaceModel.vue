<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import CesiumComponent from '@/components/Cesium/Cesium.component.vue'
import { useCesium } from '@/hooks/web/useCesium'
import { ElLink } from 'element-plus'
import * as Cesium from 'cesium'

import CesiumDraw from '@/components/Cesium/CesiumDraw'

const { mapRegister, mapMethods } = useCesium()

const { getMap } = mapMethods

defineOptions({
  name: 'SubsurfaceModel'
})

const cesiumLoadCB = async (viewer) => {
  let modelEntity = viewer.entities.add({
    name: '教室',
    position: new Cesium.Cartesian3.fromDegrees(120.14046454, 30.27415039, 0),
    model: {
      uri: 'src/assets/SampleData/models/crane.gltf',
      /* uri: './3D格式数据/教室/scene.gltf', */
      scale: 1
    }
  })
  viewer.zoomTo(modelEntity)

  //设置鼠标进去地下
  viewer.scene.screenSpaceCameraController.enableCollisionDetection = false
  //设置地球透明
  viewer.scene.globe.translucency.enabled = true
  viewer.scene.globe.translucency.frontFaceAlphaByDistance = new Cesium.NearFarScalar(
    400.0,
    0.5,
    8000,
    0.9
  )
}
</script>

<template>
  <ContentWrap title="地下模式">
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
