<script setup lang="ts">
import { onBeforeUnmount } from 'vue'
import { ContentWrap } from '@/components/ContentWrap'
import CesiumComponent from '@/components/Cesium/Cesium.component.vue'

import { useCesium } from '@/hooks/web/useCesium'
import * as Cesium from 'cesium'

import { ElButton } from 'element-plus'

const { mapRegister, mapMethods } = useCesium()

const { getMap } = mapMethods

defineOptions({
  name: 'DivGraphics'
})

import CesiumDivGraphics from '@/components/Cesium/CesiumDivGraphics'

let css3Renderer
const cesiumLoadCB = (viewer) => {
  // 相机定位
  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(120, 30, 17850000 * 0.01),
    orientation: {
      heading: Cesium.Math.toRadians(350.4202942851978),
      pitch: Cesium.Math.toRadians(-89.74026687972041),
      roll: Cesium.Math.toRadians(0.0)
    }
  })

  css3Renderer = new CesiumDivGraphics({
    viewer: viewer,
    elements: [
      {
        id: 'box4',
        position: [120, 30, 50.0],
        element: `<div style="position: fixed;top: 0;left: 0;color: red" id="box4">我是自定义div</div>`,
        offset: [200, 160]
      }
    ],
    isBackHide: false
  })

  // let css3Renderer = new Css3Renderer(viewer, [], true)
  // css3Renderer.addEntityLayer({
  //   id: '',
  //   position: [120, 30, 30.0], //高度为 boxHeightMax
  //   element: `<div style="position: fixed;top: 0;" id='div1'>
  //              <div class='line'></div>
  //              <h1>22222</h1>
  //              <div class='main' style="font-size:20px">
  //                       <div class="" style="color:#ff9800">信息点</div>
  //                      <div class=""> xx大厦 </div>
  //               </div>
  //          </div>`,
  //   offset: [200, 160],
  //   boxShow: false,
  //   circleShow: false
  // })
}

onBeforeUnmount(() => {
  // 清除自定义div
  css3Renderer?.remove('box4')
})
</script>

<template>
  <ContentWrap title="DivGraphics">
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
