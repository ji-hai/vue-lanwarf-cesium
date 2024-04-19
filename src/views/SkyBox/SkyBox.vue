<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import CesiumComponent from '@/components/Cesium/Cesium.component.vue'

import { useCesium } from "@/hooks/web/useCesium";

import {
  CesiumBase
} from "@/components/Cesium/CesiumBase";

const { mapRegister, mapMethods } = useCesium()

const {
  getMap,
} = mapMethods

defineOptions({
  name: 'SkyBox'
})

const cesiumLoadCB = (viewer) => {
  viewer.scene.skyBox = CesiumBase.setTwoSkyBox()
  viewer.scene.postProcessStages.add(CesiumBase.setDarkEffect()) 
}
</script>

<template>
  <ContentWrap title="圆形波纹材质">
    <div class="w-[100%] h-[100%]">
      <cesium-component
          @register="mapRegister"
          :config="{

          // homeButton: true
        }"
          tiandituTk="80cd3c8ae46ae32fa0ac19f6d739d310"
          :cesiumLoadCB="cesiumLoadCB"
      >
      </cesium-component>
    </div>
  </ContentWrap>
</template>
