<script setup lang="ts">
import { ref } from 'vue'
import { ElButton } from 'element-plus'
import { ContentWrap } from '@/components/ContentWrap'
import CesiumComponent from '@/components/Cesium/Cesium.component.vue'

import { useCesium } from '@/hooks/web/useCesium'

import { CesiumBase } from '@/components/Cesium/CesiumBase'

const { mapRegister, mapMethods } = useCesium()

const { getMap } = mapMethods

defineOptions({
  name: 'SkyBox'
})

const cesiumLoadCB = (viewer) => {
  // viewer.scene.skyBox = CesiumBase.setTwoSkyBox()
  // viewer.scene.postProcessStages.add(CesiumBase.setDarkEffect())
}

const BtnType = ref(0)
const getStage = (name) => {
  let stage = null,
    stages = getMap().scene.postProcessStages
  for (let i = 0; i < stages._stages.length; i++) {
    let tmp = stages.get(i)
    if (tmp.name == name) {
      stage = tmp
      break
    }
  }
  return stage
}

const removePostProcessStage = (name) => {
  let stage = getStage(name)
  if (stage) {
    getMap().scene.postProcessStages.remove(stage)
  }
}

const changeSkyBox = (type: number) => {
  removePostProcessStage('darkEffect')
  removePostProcessStage('rainEffect')
  removePostProcessStage('snowEffect')
  removePostProcessStage('fogEffect')
  removePostProcessStage('blur_x_direction')
  BtnType.value = type
  switch (type) {
    case 1:
      getMap().scene.skyBox = CesiumBase.setOneSkyBox()
      break
    case 2:
      getMap().scene.skyBox = CesiumBase.setTwoSkyBox()
      break
    case 3:
      getMap().scene.skyBox = CesiumBase.setThreeSkyBox()
      break
    case 4:
      getMap().scene.postProcessStages.add(CesiumBase.setDarkEffect())
      break
    case 5:
      getMap().scene.postProcessStages.add(CesiumBase.setBlurBloom({ width: 0.5, height: 0.5 }))
      break
    case 6:
      getMap().scene.postProcessStages.add(CesiumBase.setRainEffect())
      break
    case 7:
      getMap().scene.postProcessStages.add(CesiumBase.setSnowEffect())
      break
    case 8:
      getMap().scene.postProcessStages.add(CesiumBase.setFogEffect())
      break  
    default:
      break
  }
}
</script>

<template>
  <ContentWrap title="天空盒">
    <div class="w-[100%] h-[50px]">
      <ElButton :type="BtnType === 1 ? 'primary' : ''" @click="changeSkyBox(1)">天空盒1</ElButton>
      <ElButton :type="BtnType === 2 ? 'primary' : ''" @click="changeSkyBox(2)">天空盒2</ElButton>
      <ElButton :type="BtnType === 3 ? 'primary' : ''" @click="changeSkyBox(3)">天空盒3</ElButton>
      <ElButton :type="BtnType === 4 ? 'primary' : ''" @click="changeSkyBox(4)">黑夜特效</ElButton>
      <ElButton :type="BtnType === 5 ? 'primary' : ''" @click="changeSkyBox(5)">场景蓝光</ElButton>
      <ElButton :type="BtnType === 6 ? 'primary' : ''" @click="changeSkyBox(6)">雨天特效</ElButton>
      <ElButton :type="BtnType === 7 ? 'primary' : ''" @click="changeSkyBox(7)">雪天特效</ElButton>
      <ElButton :type="BtnType === 8 ? 'primary' : ''" @click="changeSkyBox(8)">雾天特效</ElButton>
    </div>
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
