<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import CesiumComponent from '@/components/Cesium/Cesium.component.vue'
import { useCesium } from '@/hooks/web/useCesium'
import { ElLink } from 'element-plus'
import * as Cesium from 'cesium'

import CesiumGraphics from '@/components/Cesium/CesiumGraphics'
import Service from '@/axios'

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
  name: 'Demo2'
})

//  实心圆
const computeCircleFill = (a) => {
  a = Number(a) / 1000
  a = a / 2
  var b = []
  for (var i = 0; i < 360; i++) {
    var c = Cesium.Math.toRadians(i)
    b.push(new Cesium.Cartesian2(a * Math.cos(c), a * Math.sin(c)))
  }
  return b
}
//  空心圆
const computeCircle = (a) => {
  a = Number(a) / 1000
  a = a / 2
  var startAngle = 0
  var endAngle = 360
  var hd = a / 3
  var b = []
  for (var i = startAngle; i <= endAngle; i++) {
    var c = Cesium.Math.toRadians(i)
    b.push(new Cesium.Cartesian2(a * Math.cos(c), a * Math.sin(c)))
  }
  for (var i = endAngle; i >= startAngle; i--) {
    var radians = Cesium.Math.toRadians(i)
    b.push(new Cesium.Cartesian2((a - hd) * Math.cos(radians), (a - hd) * Math.sin(radians)))
  }
  return b
}

const getData = async (type: number = 2) => {
  return await Service.post({
    url: 'http://42.192.73.101:7933/api/sewage/SewageMapScreen/outWellSiteList',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      outWellType: type
    },
    params: {
      token: '0263563941e58bfa562f22e1776ffbd6'
    }
  })
}

const getNetWorkSiteList = async (type: number = 2) => {
  return await Service.post({
    url: 'http://42.192.73.101:7933/api/sewage/SewageMapScreen/netWorkSiteList',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      pipeNetworkType: type
    },
    params: {
      token: '0263563941e58bfa562f22e1776ffbd6'
    }
  })
}

const cesiumLoadCB = async (viewer) => {
  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(119.858963, 30.801224, 5000.0)
  })
  let cesiumGraphics = new CesiumGraphics(viewer)
  const data = await getData(2) // 雨水窨井
  const data1 = await getData(1) // 污水窨井
  const data2 = await getNetWorkSiteList(2) // 雨水管网
  const data3 = await getNetWorkSiteList(1) // 污水管网

  data.data.forEach((item) => {
    // 模型
    // cesiumGraphics.createModelGraphics({
    //   position: Cesium.Cartesian3.fromDegrees(Number(item.lon), Number(item.lat), 0),
    //   orientation: Cesium.Transforms.headingPitchRollQuaternion(
    //     Cesium.Cartesian3.fromDegrees(120.84, 30.15, 5000),
    //     new Cesium.HeadingPitchRoll(
    //       Cesium.Math.toRadians(0), // 方向
    //       Cesium.Math.toRadians(0),
    //       Cesium.Math.toRadians(0)
    //     )
    //   ),
    //   model: {
    //     uri: 'src/assets/SampleData/glb/NoLod_0.glb',
    //     minimumPixelSize: 20,
    //     maximumScale: 1000,
    //     scale: 0.05
    //   }
    // })
    viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(Number(item.lon), Number(item.lat), 0), // 点的经纬度坐标
      cylinder: {
        length: 10,
        topRadius: 5.0,
        bottomRadius: 5.0,
        material: Cesium.Color.fromCssColorString('#0bbabb'),
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        outline: false,
        outlineColor: Cesium.Color.WHITE,
        numberOfVerticalLines: 1
        // distanceDisplayCondition: new Cesium.DistanceDisplayCondition(100.0, 2000.0)
      }
    })
  })

  data1.data.forEach((item) => {
    viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(Number(item.lon), Number(item.lat), 0), // 点的经纬度坐标
      cylinder: {
        length: 10,
        topRadius: 5.0,
        bottomRadius: 5.0,
        material: Cesium.Color.fromCssColorString('#af15e3'),
        heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        outline: false,
        outlineColor: Cesium.Color.WHITE,
        numberOfVerticalLines: 1
        // distanceDisplayCondition: new Cesium.DistanceDisplayCondition(100.0, 2000.0)
      }
    })
  })
  // 管网数据
  data2.data.forEach((item) => {
    fetch(decodeURIComponent(item.pipeNetworkUrl).replace(new RegExp('&amp;', 'g'), '&'), {
      method: 'get'
    })
      .then((res) => res.json())
      .then((ress) => {
        ress.features.forEach((item) => {
          let positions = []
          item.geometry.coordinates[0].forEach((item) => {
            positions.push(Cesium.Cartesian3.fromDegrees(item[0], item[1], 0))
          })
          viewer.entities.add({
            polylineVolume: {
              positions: positions,
              cornerType: Cesium.CornerType.ROUNDED,
              shape: computeCircle(3000),
              material: new PolylineTrailLinkMaterialProperty(
                2000,
                new Cesium.Color(1, 36, 46),
                new Cesium.Cartesian2(20.0, 1.0),
                'src/assets/image/line15.png'
              ),
              outline: true,
              outlineColor: Cesium.Color.BLUE.withAlpha(0.3),
            }
          })
        })
      })
  })

  //  透明材质
  // new Cesium.StripeMaterialProperty({
  //   evenColor: Cesium.Color.WHITE.withAlpha(0.5),
  //   oddColor: Cesium.Color.BLUE.withAlpha(0.5),
  //   repeat: 5.0
  // })
  // 管网数据
  data3.data.forEach((item) => {
    fetch(decodeURIComponent(item.pipeNetworkUrl).replace(new RegExp('&amp;', 'g'), '&'), {
      method: 'get'
    })
      .then((res) => res.json())
      .then((ress) => {
        ress.features.forEach((item) => {
          let positions = []
          item.geometry.coordinates[0].forEach((item) => {
            positions.push(Cesium.Cartesian3.fromDegrees(item[0], item[1], 0))
          })
          viewer.entities.add({
            polylineVolume: {
              positions: positions,
              cornerType: Cesium.CornerType.ROUNDED,
              shape: computeCircle(3000),
              material: Cesium.Color.fromCssColorString('#af15e3')
            }
          })
        })
      })
  })
}
</script>

<template>
  <ContentWrap title="和平管网演示">
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
