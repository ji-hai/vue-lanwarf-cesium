<template>
  <div
      id="cesiumContainer"
      class="h-[100%] w-[100%]">
  </div>
</template>

<script setup lang="ts" name="Cesium.component">
import { onMounted, markRaw, onBeforeUnmount } from "vue";
import * as Cesium from 'cesium'

import { cesiumProps } from "./props";
import {setEventHandler} from "@/components/Cesium/CesiumEventHandler";

const emit = defineEmits(['register'])

const props = defineProps(cesiumProps)

let viewer:any = markRaw({})
onMounted(()=>{
  // 服务负载子域
  const subdomains = ['0','1','2','3','4','5','6','7'];
  // Cesium.Ion.defaultAccessToken = props.cesiumAsset;

  viewer = new Cesium.Viewer('cesiumContainer',Object.assign({
    // 指定上下文
    // 类型：Object，默认值：无，传递给场景（scene）的与options相对应的上下文和WebGL创建属性。
    // 这个设置需要一些webGL相关知识，默认值是：
    // { webgl : { alpha : false, depth : true,
    // stencil : false, antialias : true,
    // powerPreference: ‘high-performance’,
    // premultipliedAlpha : true,
    // preserveDrawingBuffer : false,
    // failIfMajorPerformanceCaveat : false },
    // allowTextureFilterAnisotropic : true }。
    // 其中， webgl.alpha 默认是false，之所以跟webGL默认的false不一样是因为这样可以提升性能，如果应用程序需要在其他HTML元素之上使用alpha混合，
    // 设置 webgl.alpha 为true。
    // allowTextureFilterAnisotropic 默认设置为true，当支持WebGL扩展时启用各向异性纹理过滤。
    // 将此设置为false会提高性能，但会损害视觉质量，尤其是对于地平线视图。其他用默认就好。
    contextOptions: {
      requestWebgl1: true,
    },
    shouldAnimate: true,
    //类型：Boolean，默认值：true，是否创建左下角动画（Anaimation）小部件，可以在此小部件中方便的操作动画播放/暂停，
    // 修改动画播放倍率。如果设置为false，则不会创建动画小部件。
    animation: true,
    homeButton:false,       //home键
    geocoder:false,         //地址编码
    baseLayerPicker:false, //图层选择控件
    timeline:true,        //时间轴
    fullscreenButton:false, //全屏显示
    infoBox:false,         //点击要素之后浮窗
    sceneModePicker:true,  //投影方式  三维/二维
    // sceneMode: 3, // 初始场景模式 1 2D模式 2 2D循环模式 3 3D模式  Cesium.SceneMode
    navigationInstructionsInitiallyVisible:false, //导航指令
    navigationHelpButton:false,     //帮助信息
    selectionIndicator:false, // 选择
    imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
      //影像标注
      url: "http://t{s}.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img" +
          "&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk="+props.tiandituTk,
      subdomains: subdomains,
      layer: "tdtCiaLayer",
      style: "default",
      format: "image/jpeg",
      tileMatrixSetID: "GoogleMapsCompatible",
      show: true
    })
  },props.config));

  viewer._cesiumWidget._creditContainer.style.display = "none";  // 隐藏cesium ion
  // viewer.timeline.container.style.display = 'none'; // 隐藏时间线
  // viewer.animation.container.style.visibility = 'hidden' // 隐藏动画控件

  viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
    //影像标注
    url: "http://t{s}.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img" +
        "&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk="+props.tiandituTk,
    subdomains: subdomains,
    layer: "tdtCiaLayer",
    style: "default",
    format: "image/jpeg",
    tileMatrixSetID: "GoogleMapsCompatible",
    show: true
  }));
  viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
    //影像底图
    url: "http://t{s}.tianditu.com/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w" +
        "&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk="+props.tiandituTk,
    subdomains: subdomains,
    layer: "tdtCiaLayer",
    style: "default",
    format: "image/jpeg",
    tileMatrixSetID: "GoogleMapsCompatible",
    show: true
  }));
  // 最小缩放高度（米）
  // viewer.scene.screenSpaceCameraController.minimumZoomDistance = 200;
  // 最大缩放高度（米）
  // viewer.scene.screenSpaceCameraController.maximumZoomDistance = 500;


  // 地球球体透明
  // viewer.scene.skyAtmosphere.show = false;
  // viewer.scene.globe.showGroundAtmosphere = false;
  // viewer.scene.globe.baseColor = Cesium.Color.TRANSPARENT;
  // viewer.scene.globe.translucency.enabled = true;
  // viewer.scene.globe.undergroundColor = undefined;

  // Enable depth testing so things behind the terrain disappear.
  // viewer.scene.globe.depthTestAgainstTerrain = true;


  // viewer.terrainProvider = new Cesium.CesiumTerrainProvider({
  //   url: 'https://data.marsgis.cn/terrain'
  // })

  // 北京时间
  // viewer.clock.currentTime = Cesium.JulianDate.addHours(Cesium.JulianDate.now(new Date()), 8, new Cesium.JulianDate());

  emit('register', viewer)
  props.cesiumLoadCB(viewer)
})

onBeforeUnmount(()=> {
  viewer.value?.destroy();
  console.log('已销毁')
})

</script>
