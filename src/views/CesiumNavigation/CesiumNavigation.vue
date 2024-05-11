<style scoped>
::v-deep(.compass){
  /* right: 450px; */
}
::v-deep(.compass-outer-ring){
  fill: #04abc2
}
::v-deep(.compass-outer-ring-background){
  border: 12px solid #135764;
}
::v-deep(.compass-gyro-background){
  border: 1px solid #04abc2;
  background-color: #135764;
}

::v-deep(.navigation-controls){
  /* right: 480px; */
  background-color: #135764;
  border-radius: 4px;
}

::v-deep(.navigation-control-icon-zoom-in){
  color: #04abc2;
  font-size: 24px;
  font-weight: bold;
}

::v-deep(.navigation-control-icon-zoom-out){
  color: #04abc2;
  font-size: 24px;
  font-weight: bold;
}

::v-deep(.navigation-control-icon-reset){
  fill: #04abc2;
  font-size: 24px;
}
</style>
<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import CesiumComponent from '@/components/Cesium/Cesium.component.vue'
import { useCesium } from '@/hooks/web/useCesium'

import { cesiumNavigation } from '@/components/Cesium/CesiumNavigation/index.ts'

import * as Cesium from 'cesium'

const { mapRegister, mapMethods } = useCesium()

const { getMap } = mapMethods

defineOptions({
  name: 'CesiumNavigation'
})

const cesiumLoadCB = async (viewer) => {
  cesiumNavigation(viewer)
  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(119.858963, 30.801224, 5000.0)
  })
}
</script>

<template>
  <ContentWrap title="导航插件">
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