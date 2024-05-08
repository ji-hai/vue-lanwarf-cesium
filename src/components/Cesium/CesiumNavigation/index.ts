import CesiumNavigation from 'cesium-navigation-es6'

import * as Cesium from 'cesium'
/**
 * @description: 导航插件
 * @param {*} options 导航配置
 * @return {*}
 */
const options = {
  // 默认视角
  defaultResetView: Cesium.Cartographic.fromDegrees(120.318977, 30.114155, 2000),
  //相机方向
  orientation: { pitch: Cesium.Math.toRadians(-45) },
  //相机延时
  // duration = 4, //默认为3s
  // 用于启用或禁用罗盘。true是启用罗盘，false是禁用罗盘。默认值为true。如果将选项设置为false，则罗盘将不会添加到地图中。
  enableCompass: true,
  // 用于启用或禁用缩放控件。true是启用，false是禁用。默认值为true。如果将选项设置为false，则缩放控件将不会添加到地图中。
  enableZoomControls: true,
  // 用于启用或禁用距离图例。true是启用，false是禁用。默认值为true。如果将选项设置为false，距离图例将不会添加到地图中。
  enableDistanceLegend: false,
  // 用于启用或禁用指南针外环。true是启用，false是禁用。默认值为true。如果将选项设置为false，则该环将可见但无效。
  enableCompassOuterRing: true, //修改重置视图的tooltip
  resetTooltip: '重置视图',
  // 修改放大按钮的tooltip
  zoomInTooltip: '放大',
  // 修改缩小按钮的tooltip
  zoomOutTooltip: '缩小'
}

let camera
export const cesiumNavigation = (viewer: any) => {
  // @ts-ignore
  if (camera) {
    camera.destroy()
  }
  camera = new CesiumNavigation(viewer, options)
}
