<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import CesiumComponent from '@/components/Cesium/Cesium.component.vue'

import { useCesium } from '@/hooks/web/useCesium'
import * as Cesium from 'cesium'

const { mapRegister, mapMethods } = useCesium()

const { getMap } = mapMethods

defineOptions({
  name: 'Water'
})

const cesiumLoadCB = (viewer) => {
  // ====================   将三维球定位到中国   =============================
  // 相机飞行
  viewer.camera.setView({
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
  // 流动水面效果
  viewer.scene.primitives.add(
    new Cesium.Primitive({
      geometryInstances: new Cesium.GeometryInstance({
        geometry: new Cesium.RectangleGeometry({
          rectangle: Cesium.Rectangle.fromDegrees(120, 30, 120.1, 30.10),
          vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT
        })
      }),
      appearance: new Cesium.EllipsoidSurfaceAppearance({
        material: new Cesium.Material({
          fabric: {
            type: 'Water',
            uniforms: {
              baseWaterColor: new Cesium.Color(64 / 255.0, 157 / 255.0, 253 / 255.0, 0.5),
              normalMap: 'src/assets/image/water.jpg',
              frequency: 1000.0,
              animationSpeed: 0.1,
              amplitude: 10,
              specularIntensity: 10
            }
          }
        })
      })
    })
  )
}
</script>

<template>
  <ContentWrap title="Water">
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
