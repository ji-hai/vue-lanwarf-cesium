<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { ElButton } from 'element-plus'
import CesiumComponent from '@/components/Cesium/Cesium.component.vue'

import { useCesium } from '@/hooks/web/useCesium'
import * as Cesium from 'cesium'

import {
  CustomMaterial,
  CustomMaterialWall,
  DynamicWallMaterialProperty,
  PolylineTrailLinkMaterialProperty,
  Spriteline1MaterialProperty,
  LineFlickerMaterialProperty,
  LineFlowMaterialProperty
} from '@/components/Cesium/CesiumMaterialProperty'

const { mapRegister, mapMethods } = useCesium()

const { getMap } = mapMethods

defineOptions({
  name: 'SimapleLine'
})

/**
 * @description: 抛物飞线效果初始化
 * @param {*} _viewer
 * @param {*} _num :每条线上的飞线数量
 * @return {*}
 */
const parabolaFlowInit = (_viewer, _num) => {
  let _center = [120.9236839, 30.528061]
  let _positions = [
    [120.8236839, 30.528061],
    [121.0236839, 30.528061],
    [120.9236839, 30.428061],
    [120.9236839, 30.628061],
    [120.8236839, 30.428061],
    [121.0236839, 30.628061],
    [120.8236839, 30.628061],
    [121.0236839, 30.428061]
  ]
  _positions.forEach((item) => {
    let _siglePositions = parabola(_center, item, 5000)
    // 创建飞线
    for (let i = 0; i < _num; i++) {
      _viewer.entities.add({
        polyline: {
          positions: _siglePositions,
          material: new LineFlowMaterialProperty({
            color: new Cesium.Color(1.0, 1.0, 0.0, 0.8),
            speed: 15 * Math.random(),
            percent: 0.1,
            gradient: 0.01
          })
        }
      })
    }
    // 创建轨迹线
    _viewer.entities.add({
      polyline: {
        positions: _siglePositions,
        material: new Cesium.Color(1.0, 1.0, 0.0, 0.2)
      }
    })
  })

  /**
   * @description: 抛物线构造函数（参考开源代码）
   * @param {*}
   * @return {*}
   */
  function parabola(startPosition, endPosition, height = 0, count = 50) {
    //方程 y=-(4h/L^2)*x^2+h h:顶点高度 L：横纵间距较大者
    let result = []
    height = Math.max(+height, 100)
    count = Math.max(+count, 50)
    let diffLon = Math.abs(startPosition[0] - endPosition[0])
    let diffLat = Math.abs(startPosition[1] - endPosition[1])
    let L = Math.max(diffLon, diffLat)
    let dlt = L / count
    if (diffLon > diffLat) {
      //base on lon
      let delLat = (endPosition[1] - startPosition[1]) / count
      if (startPosition[0] - endPosition[0] > 0) {
        dlt = -dlt
      }
      for (let i = 0; i < count; i++) {
        let h = height - (Math.pow(-0.5 * L + Math.abs(dlt) * i, 2) * 4 * height) / Math.pow(L, 2)
        let lon = startPosition[0] + dlt * i
        let lat = startPosition[1] + delLat * i
        let point = new Cesium.Cartesian3.fromDegrees(lon, lat, h)
        result.push(point)
      }
    } else {
      //base on lat
      let delLon = (endPosition[0] - startPosition[0]) / count
      if (startPosition[1] - endPosition[1] > 0) {
        dlt = -dlt
      }
      for (let i = 0; i < count; i++) {
        let h = height - (Math.pow(-0.5 * L + Math.abs(dlt) * i, 2) * 4 * height) / Math.pow(L, 2)
        let lon = startPosition[0] + delLon * i
        let lat = startPosition[1] + dlt * i
        let point = new Cesium.Cartesian3.fromDegrees(lon, lat, h)
        result.push(point)
      }
    }
    return result
  }
}

/**
 * @description: 产生随机点
 * @param {*} position：中心点坐标
 * @param {*} num：随机点数量
 * @return {*}
 */
const generateRandomPosition = (position, num) => {
  let list = []
  for (let i = 0; i < num; i++) {
    // random产生的随机数范围是0-1，需要加上正负模拟
    let lon = position[0] + Math.random() * 0.04 * (i % 2 == 0 ? 1 : -1)
    let lat = position[1] + Math.random() * 0.04 * (i % 2 == 0 ? 1 : -1)
    list.push([lon, lat])
  }
  return list
}

/**
 * @description: 竖直随机飞线初始化
 * @param {*} _viewer
 * @param {*} _center ：中心点
 * @param {*} _num ：数量
 * @return {*}
 */
const lineFlowInit = (_viewer, _center, _num) => {
  let _positions = generateRandomPosition(_center, _num)
  _positions.forEach((item) => {
    // 经纬度
    let start_lon = item[0]
    let start_lat = item[1]

    let startPoint = new Cesium.Cartesian3.fromDegrees(start_lon, start_lat, 0)

    // 随机高度
    let height = 5000 * Math.random()
    let endPoint = new Cesium.Cartesian3.fromDegrees(start_lon, start_lat, height)
    let linePositions = []
    linePositions.push(startPoint)
    linePositions.push(endPoint)
    _viewer.entities.add({
      polyline: {
        width: 1,
        positions: linePositions,
        material: new LineFlowMaterialProperty({
          color: Cesium.Color.fromCssColorString('#00FFFF'),
          speed: 6 * Math.random(),
          percent: 0.1,
          gradient: 0.001
        })
      }
    })
  })
}

const addPolygon = (viewer) => {
  new Cesium.GeoJsonDataSource()
    .load('/src/assets/data/re_polygon.json', {
      stroke: Cesium.Color.RED,
      fill: Cesium.Color.fromCssColorString('#caca1345'),
      strokeWidth: 3,
      clampToGround: true //贴地
    })
    .then((geoJsonDataSource) => {
      viewer.dataSources.add(geoJsonDataSource)
    })
}

const cesiumLoadCB = (viewer) => {
  // 添加实体线
  let glowingLine = null
  glowingLine = viewer.entities.add({
    polyline: {
      positions: [
        Cesium.Cartesian3.fromDegrees(120.5, 30.1, 0),
        Cesium.Cartesian3.fromDegrees(120.8, 30.2, 0)
      ],
      width: 20,
      material: CustomMaterial({
        image: '/src/assets/image/line4.png',
        color: Cesium.Color.RED,
        duration: 10000
      })
    }
  })

  viewer.flyTo(glowingLine)

  viewer.entities.add({
    polyline: {
      positions: [
        Cesium.Cartesian3.fromDegrees(120.5, 30.15, 0),
        Cesium.Cartesian3.fromDegrees(120.8, 30.25, 0)
      ],
      width: 10,
      material: new PolylineTrailLinkMaterialProperty(
        3000,
        new Cesium.Color(1, 36, 46),
        new Cesium.Cartesian2(3.0, 1.0),
        'src/assets/image/line5.png'
      )
    }
  })

  viewer.entities.add({
    polyline: {
      positions: [
        Cesium.Cartesian3.fromDegrees(120.5, 30.16, 0),
        Cesium.Cartesian3.fromDegrees(120.8, 30.26, 0)
      ],
      width: 1,
      material: new Spriteline1MaterialProperty(1000, 'src/assets/image/line11.png')
    }
  })

  viewer.entities.add({
    polyline: {
      positions: [
        Cesium.Cartesian3.fromDegrees(120.5, 30.17, 0),
        Cesium.Cartesian3.fromDegrees(120.8, 30.27, 0)
      ],
      width: 5,
      material: new LineFlickerMaterialProperty({
        color: Cesium.Color.YELLOW,
        speed: 30
      })
    }
  })

  // 抛物飞线效果
  parabolaFlowInit(viewer, 3)

  // 随机竖直飞线
  lineFlowInit(viewer, [120.5, 30.1], 120)

  addPolygon(viewer)

  viewer.scene.debugShowFramesPerSecond = true

  //   viewer.entities.add({
  //     wall: {
  //       positions: Cesium.Cartesian3.fromDegreesArray([
  //         120.0, 30.0, 121.0, 30.0, 120.0, 31.0, 121.0, 31.0
  //       ]),
  //       minimumHeights: [12000, 12000, 12000, 12000],
  //       maximumHeights: [50, 50, 50, 50],
  //       material: new DynamicWallMaterialProperty({
  //         viewer: viewer,
  //         image: '/src/assets/image/colors.png',
  //         color: Cesium.Color.RED,
  //         duration: 18000
  //       })
  //     }
  //   })
}
</script>

<template>
  <ContentWrap title="简单线">
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
