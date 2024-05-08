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
  name: 'VideoProjection'
})

const cesiumLoadCB = async (viewer) => {
  function videoWall() {
    //获取Video标签
    const videoElement = document.getElementById('myVideo')
    //将视频元素与模拟时钟同步
    let synchronizer = new Cesium.VideoSynchronizer({
      clock: viewer.clock,
      element: videoElement
    })
    //自动播放
    viewer.clock.shouldAnimate = true
    const rectangle = viewer.entities.add({
      // 创建矩形
      // rectangle: {
      //   coordinates: Cesium.Rectangle.fromDegrees(120.0, 30.0, 121.0, 31.0),
      //   material: videoElement
      // },
      // 创建多边形
      // polygon: {
      //   hierarchy: new Cesium.PolygonHierarchy(
      //     Cesium.Cartesian3.fromDegreesArray([
      //       120.39344518569266, 30.525768035404223, 120.3961071839177, 30.52566180691624,
      //       120.3960458511302, 30.524014906984178, 120.39344432117545, 30.52402876336925
      //     ])
      //   ),
      //   classificationType: Cesium.ClassificationType.BOTH,
      //   material: videoElement,
      //   stRotation: -45
      // },
      // 创建wall
      wall: {
        positions: Cesium.Cartesian3.fromDegreesArrayHeights([
          120.391418, 30.524281, 120.0, 120.391918, 30.524281, 120.0
        ]),
        minimumHeights: [90, 90],
        material: videoElement,
        outline: true,
        shadows: Cesium.ShadowMode.ENABLED
      }
    })
    viewer.zoomTo(rectangle)
  }

  videoWall()
}
</script>

<template>
  <video id="myVideo" muted="true" autoplay="true" loop="true" style="display: none">
    <source src="/src/assets/video/lc.mp4" type="video/mp4" />
  </video>
  <ContentWrap title="视频投影">
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
