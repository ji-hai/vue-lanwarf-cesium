<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import CesiumComponent from '@/components/Cesium/Cesium.component.vue'
import { useCesium } from '@/hooks/web/useCesium'
import { ElLink, ElButton } from 'element-plus'
import * as Cesium from 'cesium'

import CesiumDraw from '@/components/Cesium/CesiumDraw'

const { mapRegister, mapMethods } = useCesium()

const { getMap } = mapMethods

defineOptions({
  name: 'SubmergedAnalysis'
})

let cesiumDraw
const cesiumLoadCB = async (viewer) => {
  let tileset = await Cesium.Cesium3DTileset.fromUrl('src/assets/file/保利b3dm/tileset.json', {
    skipLevelOfDetail: true,
    baseScreenSpaceError: 1024,
    skipScreenSpaceErrorFactor: 16,
    skipLevels: 2,
    immediatelyLoadDesiredLevelOfDetail: false,
    loadSiblings: false,
    cullWithChildrenBounds: true
  })
  viewer.scene.primitives.add(tileset)
  viewer.zoomTo(tileset)
  viewer.scene.globe.translucency.enabled = true
  // viewer.scene.globe.depthTestAgainstTerrain = true

  //根据地形设置调整高度
  let height = -65 //设置高度调整参数
  var cartographic = Cesium.Cartographic.fromCartesian(tileset.boundingSphere.center)
  var surface = Cesium.Cartesian3.fromRadians(
    cartographic.longitude,
    cartographic.latitude,
    cartographic.height
  )
  var offset = Cesium.Cartesian3.fromRadians(
    cartographic.longitude,
    cartographic.latitude,
    cartographic.height + height
  )
  var translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3())
  tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation)

  let targetHeight = 100,
    speed = 0.1,
    waterHeight = 10
  cesiumDraw = new CesiumDraw(viewer)
  cesiumDraw.drawPolygonGraphics({
    height: 1,
    callback: (polygon, polygonObj) => {
      if (viewer.scene.globe.depthTestAgainstTerrain) {
        alert('请开启深度检测')
        return false
      }
      if (polygonObj) {
        polygonObj.polygon.perPositionHeight = true
        polygonObj.polygon.extrudedHeight = new Cesium.CallbackProperty(() => {
          waterHeight = waterHeight + speed
          if (waterHeight > targetHeight) {
            waterHeight = targetHeight
          }
          return waterHeight
        }, false)
        polygonObj.polygon.material = 'src/assets/image/water.jpg'
      }
    }
  })
}

const clear = () => {
  cesiumDraw.drawLayer.entities.removeAll()
}
</script>

<template>
  <ContentWrap title="淹没分析">
    <ElButton type="primary" @click="clear">清除</ElButton>
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
