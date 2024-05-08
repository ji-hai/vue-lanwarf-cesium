import * as Cesium from 'cesium'
import './css3.css'

class CesiumDivGraphics {
  declare _viewer: any
  declare _scratch: any
  declare _container: any
  declare _elements: [any]
  declare _scene: any
  declare _camera: any
  declare _isBackHide: boolean
  constructor({ viewer, elements, isBackHide = true }) {
    this._scratch = new Cesium.Cartesian2()
    this._viewer = viewer
    this._scene = viewer.scene
    this._camera = viewer.camera

    this._container = null
    this._elements = elements
    this._isBackHide = isBackHide

    this.init()
  }

  init() {
    const container = document.createElement('div')
    container.className = `lanwarf-css3-container`
    document.body.appendChild(container)
    this._container = container

    this._elements.forEach(function (e) {
      container.insertAdjacentHTML('beforeend', e.element)
    })
    const $this = this
    this._scene.preRender.addEventListener(function () {
      //
      for (let i = 0; i < container.children.length; i++) {
        const p = Cesium.Cartesian3.fromDegrees(
          $this._elements[i].position[0],
          $this._elements[i].position[1],
          $this._elements[i].position[2] || 0
        )
        const canvasPosition = $this._scene.cartesianToCanvasCoordinates(p, $this._scratch)
        if (Cesium.defined(canvasPosition)) {
          container.children[i].style.left =
            parseFloat(canvasPosition.x) + parseFloat($this._elements[i].offset[0]) + 'px'
          container.children[i].style.top =
            parseFloat(canvasPosition.y) + parseFloat($this._elements[i].offset[1]) + 'px'
          if ($this._isBackHide) {
            let j = $this._camera.position,
              n = $this._scene.globe.ellipsoid.cartesianToCartographic(j).height
            if (
              !((n += 1 * $this._scene.globe.ellipsoid.maximumRadius),
              Cesium.Cartesian3.distance(j, p) > n)
            ) {
              container.children[i].style.display = 'block'
            } else {
              container.children[i].style.display = 'none'
            }
          }
        }
      }
    })
  }

  remove(id) {
    this._elements = this._elements.filter(function (e) {
      e.id !== id
    })
    this._container.removeChild(document.getElementById(id))
  }

  append(object) {
    this._elements.push(object)
    this._container.insertAdjacentHTML('beforeend', object.element)
  }

  removeEntityLayer(id) {
    this._viewer.entities.removeById(id + '_1')
    this._viewer.entities.removeById(id + '_2')
    this._viewer.entities.removeById(id + '_3')
    this.remove(id)
  }

  addEntityLayer(object) {
    let lon = object.position[0],
      lat = object.position[1],
      sStartFlog = false,
      $this = this,
      s1 = 0.001,
      s2 = s1,
      s3 = s1,
      s4 = s1
    setTimeout(function (sStartFlog) {
      sStartFlog = true
    }, 300)
    let rotation = Cesium.Math.toRadians(30)
    let rotation2 = Cesium.Math.toRadians(30)

    //构建entity
    let height = object.boxHeight || 300,
      heightMax = object.boxHeightMax || 400,
      heightDif = object.boxHeightDif || 10
    let goflog = true
    //添加正方体
    if (object.boxShow) {
      this._viewer.entities.add({
        id: object.id + '_1',
        name: '立方体盒子',
        position: new Cesium.CallbackProperty(function () {
          height = height + heightDif
          if (height >= heightMax) {
            height = heightMax
          }
          return Cesium.Cartesian3.fromDegrees(lon, lat, height / 2)
        }, false),
        box: {
          dimensions: new Cesium.CallbackProperty(function () {
            height = height + heightDif
            if (height >= heightMax) {
              height = heightMax
              if (goflog) {
                //需要增加判断 不然它会一直执行; 导致对div的dom操作 会一直重复
                goflog = false
                $this.append(object, true)
              }
            }
            return new Cesium.Cartesian3(object.boxSide || 100, object.boxSide || 100, height)
          }, false),
          material: object.boxMaterial || Cesium.Color.DEEPSKYBLUE.withAlpha(0.5)
        }
      })
    } else {
      // 只要弹出框
      setTimeout(function () {
        $this.append(object, true)
      }, 100)
    }
    if (object.circleShow) {
      object.circleSize = object.circleSize || 120
      //添加底座 一 外环
      this._viewer.entities.add({
        id: object.id + '_2',
        name: '椭圆',
        position: Cesium.Cartesian3.fromDegrees(lon, lat),
        ellipse: {
          // semiMinorAxis : object.circleSize, //直接这个大小 会有一个闪白的材质 因为cesium材质默认是白色 所以我们先将大小设置为0
          // semiMajorAxis : object.circleSize,
          semiMinorAxis: new Cesium.CallbackProperty(function () {
            if (sStartFlog) {
              s1 = s1 + object.circleSize / 20
              if (s1 >= object.circleSize) {
                s1 = object.circleSize
              }
            }
            return s1
          }, false),
          semiMajorAxis: new Cesium.CallbackProperty(function () {
            if (sStartFlog) {
              s2 = s2 + object.circleSize / 20
              if (s2 >= object.circleSize) {
                s2 = object.circleSize
              }
            }
            return s2
          }, false),
          material: 'data/images/Textures/circle2.png',
          rotation: new Cesium.CallbackProperty(function () {
            rotation += 0.05
            return rotation
          }, false),
          stRotation: new Cesium.CallbackProperty(function () {
            rotation += 0.05
            return rotation
          }, false),
          zIndex: 2
        }
      })
      //添加底座二 内环
      this._viewer.entities.add({
        id: object.id + '_3',
        name: '椭圆',
        position: Cesium.Cartesian3.fromDegrees(lon, lat),
        ellipse: {
          semiMinorAxis: new Cesium.CallbackProperty(function () {
            if (sStartFlog) {
              s3 = s3 + object.circleSize / 20
              if (s3 >= object.circleSize / 2) {
                s3 = object.circleSize / 2
              }
            }
            return s3
          }, false),
          semiMajorAxis: new Cesium.CallbackProperty(function () {
            if (sStartFlog) {
              s4 = s4 + object.circleSize / 20
              if (s4 >= object.circleSize / 2) {
                s4 = object.circleSize / 2
              }
            }
            return s4
          }, false),
          material: 'data/images/Textures/circle1.png',
          rotation: new Cesium.CallbackProperty(function () {
            rotation2 -= 0.03
            return rotation2
          }, false),
          stRotation: new Cesium.CallbackProperty(function () {
            rotation2 -= 0.03
            return rotation2
          }, false),
          zIndex: 3
        }
      })
    }
  }
}

export default CesiumDivGraphics
