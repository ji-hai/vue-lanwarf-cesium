<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import CesiumComponent from '@/components/Cesium/Cesium.component.vue'

import { useCesium } from "@/hooks/web/useCesium";
import * as Cesium from "cesium";

import {
  CustomMaterial
} from "@/components/Cesium/CesiumMaterialProperty";

const { mapRegister, mapMethods } = useCesium()

const {
  getMap,
} = mapMethods

defineOptions({
  name: 'CustomMaterialLine'
})

const cesiumLoadCB = (viewer) => {
  // 添加实体线
  let glowingLine = null
  glowingLine = viewer.entities.add({
    polyline: {
      positions: [
        Cesium.Cartesian3.fromDegrees(120.5, 30.1, 0),
        Cesium.Cartesian3.fromDegrees(120.8, 30.2, 0),
      ],
      width: 5,
      material: CustomMaterial({
        image: '/src/assets/image/line3.png',
        color: Cesium.Color.RED,
        duration: 2000
      }),
    }
  });

  viewer.flyTo(glowingLine)

  viewer.entities.add({
    polyline: {
      positions: [
        Cesium.Cartesian3.fromDegrees(120.5, 30.1, 0),
        Cesium.Cartesian3.fromDegrees(120.3, 30.4, 0),
      ],
      width: 5,
      material: CustomMaterial({
        image: '/src/assets/image/line2.png',
        color: Cesium.Color.WHITE,
        duration: 2000
      }),
    }
  });

  viewer.entities.add({
    polyline: {
      positions: [
        Cesium.Cartesian3.fromDegrees(120.5, 30.1, 0),
        Cesium.Cartesian3.fromDegrees(120.2, 30.5, 0),
      ],
      width: 10,
      material: CustomMaterial({
        image: '/src/assets/image/line.png',
        color: Cesium.Color.WHITE,
        duration: 2000
      }),
    }
  });

}
</script>

<template>
  <ContentWrap title="流动线条材质">
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
