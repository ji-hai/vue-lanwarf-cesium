/*
 * @Description: 鹰眼地图效果
 */
import * as Cesium from 'cesium'

class CesiumEagleEye {
  declare _viewer: any
  declare _hawkEyeMap: any
  declare el: Element
  constructor(viewer, el) {
    this._viewer = viewer
    this._hawkEyeMap = null
    this.el = el
    this._init()
  }

  // 初始化函数
  _init() {
    this._hawkEyeMap = new Cesium.Viewer(this.el, {
      geocoder: false,
      homeButton: false,
      sceneModePicker: false,
      baseLayerPicker: false,
      navigationHelpButton: false,
      animation: false,
      timeline: false,
      fullscreenButton: false
    })
    this._hawkEyeMap.cesiumWidget.creditContainer.style.display = 'none'
    this._hawkEyeMap.scene.backgroundColor = Cesium.Color.TRANSPARENT
    this._hawkEyeMap.imageryLayers.removeAll()

    // 鹰眼图中添加高德路网中文注记图
    this._hawkEyeMap.imageryLayers.addImageryProvider(
      new Cesium.UrlTemplateImageryProvider({
        url: 'http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
        minimumLevel: 3,
        maximumLevel: 18
      })
    )

    // 引起事件监听的相机变化幅度
    this._viewer.camera.percentageChanged = 0.01

    this._bindEvent()
  }

  // 绑定事件
  _bindEvent() {
    // 监听主图相机变化
    this._viewer.camera.changed.addEventListener(this._syncMap, this)
    // 第一次刷新渲染时联动（否则第一次鹰眼地图不会联动）
    // this._viewer.scene.preRender.addEventListener(this._syncMap, this)
  }

  // 同步主图与鹰眼地图
  _syncMap() {
    this._hawkEyeMap.camera.flyTo({
      destination: this._viewer.camera.position,
      orientation: {
        heading: this._viewer.camera.heading,
        pitch: this._viewer.camera.pitch,
        roll: this._viewer.camera.roll
      },
      duration: 0.0
    })
  }
}

export default CesiumEagleEye
