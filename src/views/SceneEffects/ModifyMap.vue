<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import CesiumComponent from '@/components/Cesium/Cesium.component.vue'

import gui from '@/plugins/gui'

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
  const baseLayer = viewer.imageryLayers.get(0)
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
  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(120.84, 30.15, 5000),
    orientation: {
      heading: Cesium.Math.toRadians(350.4202942851978),
      pitch: Cesium.Math.toRadians(-89.74026687972041),
      roll: Cesium.Math.toRadians(0.1)
    },
    complete: () => {
      // 定位完成之后的回调函数
      // 聚合
      // addCesiumCluster(earthquakes)
    }
  })
  // gui
  //   .addColor(
  //     {
  //       filterRGB: [7, 47, 109]
  //     },
  //     'filterRGB'
  //   )
  //   .onChange((val) => {
  //     modifyMap(viewer, {
  //       invertColor: false,
  //       filterRGB: [parseInt(val[0]), parseInt(val[1]), parseInt(val[2])]
  //     })
  //   })

  // gui
  //   .add(
  //     {
  //       invertColor: false
  //     },
  //     'invertColor'
  //   )
  //   .onChange((val) => {
  //     // modifyMap(viewer, {
  //     //   invertColor: val,
  //     //   filterRGB: [125,125,125]
  //     // })
  //   })

  const subdomains = ['0', '1', '2', '3', '4', '5', '6', '7']
  viewer.imageryLayers.addImageryProvider(
    new Cesium.WebMapTileServiceImageryProvider({
      //影像标注
      url: 'http://t{s}.tianditu.gov.cn/vec_w/wmts?tk=80cd3c8ae46ae32fa0ac19f6d739d310',
      subdomains: subdomains,
      layer: 'vec',
      style: 'default',
      tileMatrixSetID: 'w',
      format: 'tiles',
      maximumLevel: 18
    })
  )
  viewer.imageryLayers.addImageryProvider(
    new Cesium.WebMapTileServiceImageryProvider({
      //影像标注
      url: 'http://t{s}.tianditu.gov.cn/cva_w/wmts?tk=80cd3c8ae46ae32fa0ac19f6d739d310',
      subdomains: subdomains,
      layer: 'cva',
      style: 'default',
      tileMatrixSetID: 'w',
      format: 'tiles',
      maximumLevel: 18
    })
  )

  modifyMap(viewer, {
    invertColor: true,
    filterRGB: [60, 145, 172]
  })
}
</script>

<template>
  <ContentWrap title="反色滤镜">
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
