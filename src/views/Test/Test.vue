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
  name: 'Test'
})

const cesiumLoadCB = async (viewer) => {
  viewer.scene.postProcessStages.bloom.enabled = true
  viewer.scene.postProcessStages.bloom.uniforms.contrast = 119
  viewer.scene.postProcessStages.bloom.uniforms.brightness = -0.4
  viewer.scene.postProcessStages.bloom.uniforms.glowOnly = false
  viewer.scene.postProcessStages.bloom.uniforms.delta = 0.9
  viewer.scene.postProcessStages.bloom.uniforms.sigma = 3.78
  viewer.scene.postProcessStages.bloom.uniforms.stepSize = 5
  viewer.scene.postProcessStages.bloom.uniforms.isSelected = false
}
</script>

<template>
  <ContentWrap title="Test">
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
