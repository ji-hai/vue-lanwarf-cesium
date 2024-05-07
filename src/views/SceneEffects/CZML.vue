<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import CesiumComponent from '@/components/Cesium/Cesium.component.vue'
import { useCesium } from '@/hooks/web/useCesium'
import { ElLink } from 'element-plus'
import * as Cesium from 'cesium'

const { mapRegister, mapMethods } = useCesium()

const { getMap } = mapMethods

defineOptions({
  name: 'CZML'
})

const cesiumLoadCB = async (viewer) => {
  viewer.dataSources.add(Cesium.CzmlDataSource.load('src/assets/file/beidou.czml'))
}
</script>

<template>
  <ContentWrap title="CZML">
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
