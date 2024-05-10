<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import CesiumComponent from '@/components/Cesium/Cesium.component.vue'

import { useCesium } from '@/hooks/web/useCesium'
import * as Cesium from 'cesium'

import { ElButton } from 'element-plus'

const { mapRegister, mapMethods } = useCesium()

const { getMap } = mapMethods

defineOptions({
  name: 'Points'
})

import CesiumGraphics from '@/components/Cesium/CesiumGraphics'
import { onBeforeMount, onBeforeUnmount } from 'vue'

let cesiumGraphics
const cesiumLoadCB = (viewer) => {
  // 相机定位
  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(120.84, 30.15, 17850000 * 0.01),
    orientation: {
      heading: Cesium.Math.toRadians(350.4202942851978),
      pitch: Cesium.Math.toRadians(-89.74026687972041),
      roll: Cesium.Math.toRadians(0.0)
    }
  })

  cesiumGraphics = new CesiumGraphics(viewer)

  //  点
  cesiumGraphics.createPointsGraphics({
    positions: [Cesium.Cartesian3.fromDegrees(120.84, 30.15, 0)],
    point: {
      pixelSize: 10,
      color: Cesium.Color.RED
    },
    billboard: {
      image: '/src/assets/image/img.png'
    },
    label: {
      text: '我是一个点',
      font: '20px sans-serif',
      fillColor: Cesium.Color.RED,
      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      outlineWidth: 2,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      pixelOffset: new Cesium.Cartesian2(0, -9)
    }
  })

  // 线
  cesiumGraphics.createLineGraphics({
    positions: [
      Cesium.Cartesian3.fromDegrees(120.84, 30.15, 0),
      Cesium.Cartesian3.fromDegrees(120.34, 30.25, 0)
    ],
    width: 10,
    material: Cesium.Color.BLUE,
    clampToGround: true
  })

  // 面
  cesiumGraphics.createPolygonGraphics({
    positions: Cesium.Cartesian3.fromDegreesArray([120.0, 30.0, 121.0, 30.0, 120.0, 31.0]),
    material: Cesium.Color.BLUE,
    clampToGround: true
  })

  // 模型
  cesiumGraphics.createModelGraphics({
    position: Cesium.Cartesian3.fromDegrees(120.84, 30.15, 5000),
    // orientation: Cesium.Transforms.headingPitchRollQuaternion(
    //   Cesium.Cartesian3.fromDegrees(120.84, 30.15, 5000),
    //   new Cesium.HeadingPitchRoll(
    //     Cesium.Math.toRadians(180), // 方向
    //     Cesium.Math.toRadians(0),
    //     Cesium.Math.toRadians(100)
    //   )
    // ),
    model: {
      uri: '//data.mars3d.cn/gltf/mars/jingche/jingche.gltf',
      minimumPixelSize: 500,
      maximumScale: 10000,
      scale: 0.1
    }
  })

  // 圆柱
  cesiumGraphics.createFadeCylinderGraphics({
    position: Cesium.Cartesian3.fromDegrees(120.84, 30.15, 0)
  })

  // 旋转圆柱
  cesiumGraphics.craeteRotateCylinderGraphics({
    position: Cesium.Cartesian3.fromDegrees(120.84, 30.15, 0)
  })

  // 默认自定义标牌气泡框
  cesiumGraphics.createCustomDefBillboardGraphics({
    position: Cesium.Cartesian3.fromDegrees(120.84, 30.15, 0),
    text: '测试文本',
    img: 'src/assets/image/div2.png',
    callback: (e) => {
      // console.log(e)
    }
  })
}

onBeforeUnmount(() => {
  // getMap().entities.removeAll()
})
</script>

<template>
  <ContentWrap title="Points">
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
