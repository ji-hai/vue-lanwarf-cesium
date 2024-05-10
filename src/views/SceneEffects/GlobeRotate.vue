<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import CesiumComponent from '@/components/Cesium/Cesium.component.vue'

import { useCesium } from '@/hooks/web/useCesium'

import { GlobeRotate } from '@/components/Cesium/CesiumBase'
const { mapRegister, mapMethods } = useCesium()

const { getMap } = mapMethods

defineOptions({
  name: 'GlobeRotate'
})

const cesiumLoadCB = (viewer) => {
  // 地球球体自转
  let globeRotate = new GlobeRotate(viewer)
  globeRotate.start()
}
</script>

<template>
  <ContentWrap title="地球自转">
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
