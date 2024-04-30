<script setup lang="ts">
import { onMounted, defineOptions } from 'vue'
import { ContentWrap } from '@/components/ContentWrap'
import CesiumComponent from '@/components/Cesium/Cesium.component.vue'

import { useCesium } from '@/hooks/web/useCesium'

import CesiumEagleEye from '@/components/Cesium/CesiumEagleEye'
const { mapRegister, mapMethods } = useCesium()

const { getMap } = mapMethods

defineOptions({
  name: 'EagleEye'
})

const cesiumLoadCB = (viewer) => {
  new CesiumEagleEye(getMap(), 'eye')
}

// onMounted(() => {
//   setTimeout(() => {
//     new CesiumEagleEye(getMap(), 'eye')
//   }, 2000)
// })
</script>

<template>
  <ContentWrap title="地球自转">
    <div class="w-100px h-100px" id="eye"></div>
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
