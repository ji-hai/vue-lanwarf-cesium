<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import CesiumComponent from '@/components/Cesium/Cesium.component.vue'

import { ElButton } from 'element-plus'
import { useCesium } from '@/hooks/web/useCesium'
import * as Cesium from 'cesium'

import CesiumDraw from '@/components/Cesium/CesiumDraw/index'
const { mapRegister, mapMethods } = useCesium()

const { getMap } = mapMethods

defineOptions({
  name: 'DrawEntity'
})

let cesiumDraw
const cesiumLoadCB = (viewer) => {
  cesiumDraw = new CesiumDraw(viewer)
}

const drawPoint = () => {
  cesiumDraw.drawPointGraphics()
}

const drawLine = () => {
  cesiumDraw.drawLineGraphics({
    measure: true
  })
}

const drawPolygon = () => {
  cesiumDraw.drawPolygonGraphics({
    measure: true
  })
}

const drawRectangle = () => {
  cesiumDraw.drawRectangleGraphics({
    measure: true
  })
}

const drawCircle = () => {
  cesiumDraw.drawCircleGraphics({
    measure: true
  })
}

const drawTriangles = () => {
  cesiumDraw.drawTrianglesGraphics({
    measure: true
  })
}

const drawWall = () => {
  cesiumDraw.drawWallGraphics({
    measure: true
  })
}

const drawEllipsoid = () => {
  cesiumDraw.drawEllipsoidGraphics({
    measure: true
  })
}
</script>

<template>
  <ContentWrap title="DrawEntity">
    <ElButton class="mb-4" type="primary" @click="drawPoint">画点</ElButton>
    <ElButton class="mb-4" type="primary" @click="drawLine">画线</ElButton>
    <ElButton class="mb-4" type="primary" @click="drawPolygon">画面</ElButton>
    <ElButton class="mb-4" type="primary" @click="drawRectangle">画矩形</ElButton>
    <ElButton class="mb-4" type="primary" @click="drawCircle">画圆</ElButton>
    <ElButton class="mb-4" type="primary" @click="drawTriangles">画三角量测</ElButton>
    <ElButton class="mb-4" type="primary" @click="drawWall">画围栏</ElButton>
    <ElButton class="mb-4" type="primary" @click="drawEllipsoid">画球体</ElButton>
    <ElButton class="mb-4" type="primary" @click="drawRectangle">画圆柱</ElButton>
    <ElButton class="mb-4" type="primary" @click="drawRectangle">画走廊</ElButton>
    <ElButton class="mb-4" type="primary" @click="drawRectangle">画管道</ElButton>
    <div class="w-[100%] h-[100%]"></div>
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
