<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import CesiumComponent from '@/components/Cesium/Cesium.component.vue'

import { useCesium } from '@/hooks/web/useCesium'
import * as Cesium from 'cesium'

import {
  WaveCircleMaterial,
  PolylineTrailLinkMaterialProperty
} from '@/components/Cesium/CesiumMaterialProperty'

const { mapRegister, mapMethods } = useCesium()

const { getMap } = mapMethods

import CesiumGraphics from '@/components/Cesium/CesiumGraphics'

defineOptions({
  name: 'Demo1'
})

let entityModel
const cesiumLoadCB = (viewer) => {
  const Graphics = new CesiumGraphics(viewer)
  //  模型
  let hpr = new Cesium.HeadingPitchRoll(
    Cesium.Math.toRadians(0),
    Cesium.Math.toRadians(0), //0朝下 180朝上
    Cesium.Math.toRadians(0)
  )
  let r = Cesium.Math.toRadians(2)
  let lon = 120.16907205003166,
    lat = 30.175928962346774,
    height = 0,
    isUp = true
  Graphics.createModelGraphics({
    position: new Cesium.CallbackProperty((e) => {
      // if (height > 400) {
      //   height = 400
      //   isUp = false
      // } else if (height < 350) {
      //   height = 350
      //   isUp = true
      // }
      // if (isUp) {
      //   height += 1.0
      // } else {
      //   height -= 1.0
      // }

      return Cesium.Cartesian3.fromDegrees(lon, lat, height)
    }, false),
    orientation: new Cesium.CallbackProperty((e) => {
      hpr.heading += r

      let position = Cesium.Cartesian3.fromDegrees(lon, lat, height)
      return Cesium.Transforms.headingPitchRollQuaternion(position, hpr)
    }, false),
    model: {
      uri: '/src/assets/SampleData/glb/pyramid.glb',
      minimumPixelSize: 30,
      // maximumScale: 200,
      scale: 0.0001
    }
  })

  viewer.entities.add({
    name: 'ellipse',
    position: Cesium.Cartesian3.fromDegrees(lon, lat, 5),
    ellipse: {
      semiMajorAxis: 30,
      semiMinorAxis: 30,
      material: WaveCircleMaterial({
        duration: 2e3,

        gradient: 0,

        color: new Cesium.Color(1.0, 0.0, 0.0, 1.0),

        count: 3
      })
    }
  })

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
      minimumPixelSize: 30,
      // maximumScale: 200,
      scale: 0.001,
      show: true
      // 设置显示和隐藏的距离范围
      // distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 5000.0)
    },
    path: {
      material: Cesium.Color.YELLOW,
      leadTime: 0,
      trailTime: 200,
      width: 3
    }
  })

  viewer.entities.add(entityModel)
  viewer.zoomTo(entityModel)
  // viewer.trackedEntity = entityModel

  animation(viewer)

  viewer.entities.add({
    polyline: {
      positions: [
        Cesium.Cartesian3.fromDegrees(120.19332557663305, 30.18517782709273, 0),
        Cesium.Cartesian3.fromDegrees(120.18332557663305, 30.18537782709273, 0),
        Cesium.Cartesian3.fromDegrees(120.17007205003166, 30.185928962346774, 0)
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

  viewer.scene.screenSpaceCameraController.minimumZoomDistance = 600
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
  let stop = Cesium.JulianDate.addSeconds(start, 200, new Cesium.JulianDate())
  // 设置始时钟始时间
  viewer.clock.startTime = start.clone()
  // 设置时钟当前时间
  viewer.clock.currentTime = start.clone()
  // 设置始终停止时间
  viewer.clock.stopTime = stop.clone()
  // 时间速率，数字越大时间过的越快
  viewer.clock.multiplier = 10
  // 时间轴
  viewer.timeline.zoomTo(start, stop)
  // 循环执行,即为2，到达终止时间，重新从起点时间开始
  // CLAMPED：达到终止时间后停止
  // LOOP_STOP：达到终止时间后重新循环
  // UNBOUNDED：达到终止时间后继续读秒（默认）
  viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP

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
  <ContentWrap title="溯源演示">
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
