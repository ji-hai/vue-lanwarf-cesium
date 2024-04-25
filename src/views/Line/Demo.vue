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
  name: 'Demo'
})

let entityModel
const cesiumLoadCB = (viewer) => {
  entityModel = new Cesium.Entity({
    position: Cesium.Cartesian3.fromDegrees(120.16907205003166, 30.175928962346774, 0),
    orientation: Cesium.Transforms.headingPitchRollQuaternion(
      Cesium.Cartesian3.fromDegrees(120.16907205003166, 30.175928962346774, 0),
      new Cesium.HeadingPitchRoll(
        Cesium.Math.toRadians(90), // 方向
        Cesium.Math.toRadians(0),
        Cesium.Math.toRadians(0)
      )
    ),
    heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
    model: {
      uri: '//data.mars3d.cn/gltf/mars/jingche/jingche.gltf',
      minimumPixelSize: 100,
      maximumScale: 500,
      scale: 0.05,
      show: true
      // 设置显示和隐藏的距离范围
      // distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 5000.0)
    },
    path: {
      material: Cesium.Color.YELLOW,
      leadTime: 0,
      trailTime: 360,
      width: 3
    }
  })

  viewer.entities.add(entityModel)
  viewer.trackedEntity = entityModel

  animation(viewer)

  setTimeout(() => {
    viewer.entities.remove(entityModel)

    viewer.entities.add({
      polyline: {
        positions: [
          Cesium.Cartesian3.fromDegrees(120.19232557663305, 30.17517782709273, 0),
          Cesium.Cartesian3.fromDegrees(120.18232557663305, 30.17537782709273, 0),
          Cesium.Cartesian3.fromDegrees(120.16907205003166, 30.175928962346774, 0)
        ],
        width: 10,
        material: new PolylineTrailLinkMaterialProperty(
          3000,
          new Cesium.Color(1, 36, 46),
          new Cesium.Cartesian2(6.0, 1.0),
          'src/assets/image/line5.png'
        )
      }
    })
  }, 1000 * 10)
}

const computeFlight = (start, source) => {
  // 取样位置 相当于一个集合
  let property = new Cesium.SampledPositionProperty()
  for (let i = 0; i < source.length; i++) {
    let time = Cesium.JulianDate.addSeconds(start, source[i].time, new Cesium.JulianDate())
    let position = Cesium.Cartesian3.fromDegrees(
      source[i].longitude,
      source[i].latitude,
      source[i].height
    )
    // 添加位置，和时间对应
    property.addSample(time, position)
  }
  return property
}

const animation = (viewer) => {
  // 起始时间
  let start = Cesium.JulianDate.fromDate(new Date())
  // 结束时间
  let stop = Cesium.JulianDate.addSeconds(start, 360, new Cesium.JulianDate())
  // 设置始时钟始时间
  viewer.clock.startTime = start.clone()
  // 设置时钟当前时间
  viewer.clock.currentTime = start.clone()
  // 设置始终停止时间
  viewer.clock.stopTime = stop.clone()
  // 时间速率，数字越大时间过的越快
  viewer.clock.multiplier = 20
  // 时间轴
  viewer.timeline.zoomTo(start, stop)
  // 循环执行,即为2，到达终止时间，重新从起点时间开始
  // CLAMPED：达到终止时间后停止
  // LOOP_STOP：达到终止时间后重新循环
  // UNBOUNDED：达到终止时间后继续读秒（默认）
  viewer.clock.clockRange = Cesium.ClockRange.CLAMPED

  let availability = new Cesium.TimeIntervalCollection([
    new Cesium.TimeInterval({
      start: start,
      stop: stop
    })
  ])

  let property = computeFlight(start, [
    {
      longitude: 120.16907205003166,
      latitude: 30.175928962346774,
      height: 0,
      time: 0
    },
    {
      longitude: 120.18232557663305,
      latitude: 30.17537782709273,
      height: 0,
      time: 200
    }
  ])

  entityModel.availability = availability
  entityModel.position = property
}
</script>

<template>
  <ContentWrap title="Demo">
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
