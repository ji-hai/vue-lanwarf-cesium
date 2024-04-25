<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import CesiumComponent from '@/components/Cesium/Cesium.component.vue'

import { useCesium } from '@/hooks/web/useCesium'
import * as Cesium from 'cesium'

import {
  CustomMaterial,
  CustomMaterialWall,
  DynamicWallMaterialProperty,
  PolylineTrailLinkMaterialProperty
} from '@/components/Cesium/CesiumMaterialProperty'

const { mapRegister, mapMethods } = useCesium()

const { getMap } = mapMethods

defineOptions({
  name: 'ModifyMap'
})

const modifyMap = (viewer, options) => {
  const baseLayer = viewer.imageryLayers.get(1)
  //以下几个参数根据实际情况修改,目前我是参照火星科技的参数,个人感觉效果还不错
  baseLayer.brightness = options.brightness || 0.6
  baseLayer.contrast = options.contrast || 1.8
  baseLayer.gamma = options.gamma || 0.3
  baseLayer.hue = options.hue || 1
  baseLayer.saturation = options.saturation || 0
  const baseFragShader = viewer.scene.globe._surfaceShaderSet.baseFragmentShaderSource.sources
  for (let i = 0; i < baseFragShader.length; i++) {
    const strS = 'color = czm_saturation(color, textureSaturation);\n#endif\n'
    let strT = 'color = czm_saturation(color, textureSaturation);\n#endif\n'
    if (options.invertColor) {
      strT += `
      color.r = 1.0 - color.r;
      color.g = 1.0 - color.g;
      color.b = 1.0 - color.b;
      `
    }
    if (options.filterRGB.length > 0) {
      strT += `
      color.r = color.r * ${options.filterRGB[0]}.0/255.0;
      color.g = color.g * ${options.filterRGB[1]}.0/255.0;
      color.b = color.b * ${options.filterRGB[2]}.0/255.0;
      `
    }
    baseFragShader[i] = baseFragShader[i].replace(strS, strT)
  }
}

const cesiumLoadCB = (viewer) => {
  let startPosition = new Cesium.Cartesian3.fromDegrees(120.14046454, 30.27415039)
  let endPosition = new Cesium.Cartesian3.fromDegrees(120.16701991, 30.27648221)
  let factor = 0
  // 添加模型
  const vehicleEntity = viewer.entities.add({
    position: new Cesium.CallbackProperty(function () {
      if (factor > 5000) {
        factor = 0
      }
      factor++
      // 动态更新位置
      return Cesium.Cartesian3.lerp(
        startPosition,
        endPosition,
        factor / 5000.0,
        new Cesium.Cartesian3()
      )
    }, false),
    // orientation: Cesium.Transforms.headingPitchRollQuaternion(
    //   Cesium.Cartesian3.fromDegrees(120.16907205003166, 30.175928962346774, 0),
    //   new Cesium.HeadingPitchRoll(
    //     Cesium.Math.toRadians(90), // 方向
    //     Cesium.Math.toRadians(0),
    //     Cesium.Math.toRadians(0)
    //   )
    // ),
    model: {
      uri: 'src/assets/SampleData/glb/redCar.glb',
      scale: 0.1
    },
    path: {
      resolution: 60,
      width: 100,
      material: Cesium.Color.RED,
      leadTime: 0,
      trailTime: 0
    }
  })
  viewer.trackedEntity = vehicleEntity

  modifyMap(viewer, {
    invertColor: true,
    filterRGB: [125, 125, 125]
  })
}
</script>

<template>
  <ContentWrap title="反色滤镜">
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
