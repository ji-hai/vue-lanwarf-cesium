import * as Cesium from 'cesium'
import {
  transformCartesianToWGS84,
  transformWGS84ArrayToCartesianArray,
  transformWGS84ToCartesian,
  transformCartesianArrayToWGS84Array
} from '../CesiumBase'

import { CircleFadeMaterial } from '../CesiumMaterialProperty'

class CesiumGraphics {
  declare viewer: any

  constructor(viewer) {
    this.viewer = viewer
  }

  // 创建一个实体图形
  createGraphics() {
    return new Cesium.Entity()
  }

  //点
  private getPointGraphics({
    color = Cesium.Color.GREEN,
    pixelSize = 5,
    outlineColor = Cesium.Color.WHITE,
    outlineWidth = 1,
    ...args
  } = {}) {
    return new Cesium.PointGraphics(
      Object.assign({ color, pixelSize, outlineColor, outlineWidth }, args)
    )
  }

  //线
  private getLineGraphics({
    show = true,
    material = Cesium.Color.YELLOW,
    width = 1,
    clampToGround = false,
    ...args
  } = {}) {
    return new Cesium.PolylineGraphics(
      Object.assign({ show, material, width, clampToGround }, args)
    )
  }

  // 面
  private getPolygonGraphics({
    material = Cesium.Color.RED.withAlpha(0.2),
    clampToGround = false,
    positions = [],
    ...args
  } = {}) {
    return new Cesium.PolygonGraphics(
      Object.assign({ material, clampToGround, hierarchy: positions }, args)
    )
  }

  //标签
  private getLabelGraphics({
    text = '',
    font = '14px sans-serif',
    fillColor = Cesium.Color.GOLD,
    style = Cesium.LabelStyle.FILL_AND_OUTLINE,
    outlineWidth = 2,
    showBackground = false,
    backgroundColor = new Cesium.Color(0.165, 0.165, 0.165, 0.8),
    verticalOrigin = Cesium.VerticalOrigin.BOTTOM,
    pixelOffset = new Cesium.Cartesian2(0, -30),
    ...args
  } = {}) {
    return new Cesium.LabelGraphics(
      Object.assign(
        {
          text,
          font,
          fillColor,
          style,
          outlineWidth,
          showBackground,
          backgroundColor,
          verticalOrigin,
          pixelOffset
        },
        args
      )
    )
  }

  //广告牌
  private getBillboardGraphics({
    width = 35,
    height = 35,
    clampToGround = true,
    scale = 1,
    pixelOffset = new Cesium.Cartesian2(0, -20),
    scaleByDistance = undefined,
    ...args
  } = {}) {
    return new Cesium.BillboardGraphics(
      Object.assign(
        {
          width,
          height,
          clampToGround,
          scale,
          pixelOffset,
          scaleByDistance
        },
        args
      )
    )
  }

  //路径
  private getPathGraphics({
    resolution = 1,
    glowPower = 0.1,
    color = Cesium.Color.YELLOW,
    width = 30,
    ...args
  } = {}) {
    return new Cesium.PathGraphics(
      Object.assign(
        {
          resolution,
          material: new Cesium.PolylineGlowMaterialProperty({
            glowPower,
            color
          }),
          width
        },
        args
      )
    )
  }

  //模型
  private getModelGraphics({
    show = true,
    uri = '',
    scale = 1,
    minimumPixelSize = 1,
    maximumScale = 10000,
    color = Cesium.Color.WHITE,
    ...args
  } = {}) {
    return new Cesium.ModelGraphics(
      Object.assign(
        {
          show,
          uri,
          scale,
          minimumPixelSize,
          maximumScale,
          color
        },
        args
      )
    )
  }

  //椭圆
  private getEllipseGraphics({
    semiMajorAxis = 1000000.0, //单位 米
    semiMinorAxis = 1000000.0, //单位 米
    metarial = Cesium.Color.RED.withAlpha(0.5),
    outline = true,
    ...args
  } = {}) {
    return new Cesium.EllipseGraphics(
      Object.assign({ semiMajorAxis, semiMinorAxis, metarial, outline }, args)
    )
  }

  // 球
  private getEllipsoidGraphics({
    radii = new Cesium.Cartesian3(1000000.0, 1000000.0, 1000000.0), //单位 米 默认100公里
    material = Cesium.Color.RED.withAlpha(0.1),
    outline = true,
    maximumCone = Cesium.Math.PI_OVER_TWO,
    stackPartitions = 56,
    slicePartitions = 56,
    outlineWidth = 2.0,
    outlineColor = Cesium.Color.YELLOW,
    fill = true,
    ...args
  } = {}) {
    return new Cesium.EllipsoidGraphics(
      Object.assign(
        {
          radii,
          material,
          outline,
          maximumCone,
          stackPartitions,
          slicePartitions,
          outlineWidth,
          outlineColor,
          fill
        },
        args
      )
    )
  }

  // 面
  private getPlaneGraphics({
    plane = new Cesium.Plane(Cesium.Cartesian3.UNIT_Y, 0.0), //面
    dimensions = new Cesium.Cartesian2(1000000.0, 1000000.0), //面宽高
    material = Cesium.Color.BLUE.withAlpha(0.5), //面颜色
    outline = true, //是否显示外边框
    outlineColor = Cesium.Color.YELLOW, //外边框颜色
    ...args
  } = {}) {
    return new Cesium.PlaneGraphics(
      Object.assign(
        {
          plane,
          dimensions,
          material,
          outline,
          outlineColor
        },
        args
      )
    )
  }

  // 锥体
  private getCylinderGraphics({
    HeightReference = Cesium.HeightReference.RELATIVE_TO_GROUND,
    length = 500.0,
    topRadius = 500.0,
    bottomRadius = 0.0,
    material = new Cesium.Color(0, 1, 1, 0.4),
    slices = 128,
    ...args
  } = {}) {
    return new Cesium.CylinderGraphics(
      Object.assign(
        {
          heightReference: HeightReference,
          length,
          topRadius,
          bottomRadius,
          material,
          slices
        },
        args
      )
    )
  }

  // 1. 创建点信息
  public createPointsGraphics({
    positions = [],
    name = '',
    oid = 'point',
    point = {},
    billboard = {},
    label = {}
  } = {}) {
    const points = []
    for (const i in positions) {
      const position = positions[i]
      const entity = this.createGraphics()
      entity.name = name
      entity.oid = oid
      entity.position = position
      if (point) entity.point = this.getPointGraphics(point)
      if (billboard) entity.billboard = this.getBillboardGraphics(billboard)
      if (label) entity.label = this.getLabelGraphics(label)
      points.push(this.viewer.entities.add(entity))
    }
    return points
  }

  // 2. 创建线
  public createLineGraphics({ name = '', oid = 'line', positions = [], ...args } = {}) {
    const entity = this.createGraphics()
    entity.name = name
    entity.oid = oid
    entity.position = positions
    entity.polyline = this.getLineGraphics(Object.assign({ name, oid, positions }, args))

    return this.viewer.entities.add(entity)
  }

  // 3. 创建面
  public createPolygonGraphics({ clampToS3M = false, ...args } = {}) {
    const entity = this.createGraphics()
    entity.polygon = this.getPolygonGraphics(args)
    entity.clampToS3M = clampToS3M

    return this.viewer.entities.add(entity)
  }

  // 4. 创建模型
  public createModelGraphics({ model, position, orientation }) {
    const entity = this.createGraphics()
    entity.model = this.getModelGraphics(model)
    entity.position = position
    entity.orientation = orientation
    return this.viewer.entities.add(entity)
  }

  // 创建地面指示
  public craeteCorridorGraphics(options) {
    if (options && options.positions) {
      const entity = this.createGraphics()
      entity.corridor = {
        positions: options.positions,
        height: options.height || 6.0,
        width: options.width || 15.0,
        material:
          options.material ||
          new Cesium.WarnLinkMaterialProperty({
            freely: 'cross',
            color: Cesium.Color.YELLOW,
            duration: 1000,
            count: 1.0,
            direction: '+'
          })
      }

      return this.viewer.entities.add(entity)
    }
  }

  //构建动态线
  public craeteDynamicPolyLineGraphics(options) {
    if (options && options.positions) {
      const entity = this.createGraphics()
      entity.polyline = {
        show: true,
        positions: [],
        material: options.material || Cesium.Color.CHARTREUSE,
        width: options.width || 5,
        clampToGround: options.clampToGround || false
      }

      entity.polyline.positions = new Cesium.CallbackProperty(function () {
        return options.positions
      }, false)

      return this.viewer.entities.add(entity)
    }
  }

  //动态椎体
  public craeteDynamicCylinderGraphics(options) {
    if (options) {
      const entity = this.createGraphics({})
      // $this = this
      entity.cylinder = this.getCylinderGraphics({})
      entity.position = options.position
      //   new Cesium.CallbackProperty(function () {
      //   const positions = entity.position.getValue($this._viewer.clock.currentTime)
      //   const cartographic = $this._viewer.scene.globe.ellipsoid.cartesianToCartographic(positions)
      //   const lat = Cesium.Math.toDegrees(cartographic.latitude),
      //     lng = Cesium.Math.toDegrees(cartographic.longitude),
      //     hei = parseFloat(cartographic.height / 4)
      //   return Cesium.Cartesian3.fromDegrees(lng, lat, 0)
      // }, false)

      // entity.cylinder.length = new Cesium.CallbackProperty(function () {
      //   const positions = entity.position.getValue($this._viewer.clock.currentTime)
      //   const cartographic = $this._viewer.scene.globe.ellipsoid.cartesianToCartographic(positions)
      //   return cartographic.height * 2
      // }, false)

      return this.viewer.entities.add(entity)
    }
  }

  // 创建渐变锥体
  public createFadeCylinderGraphics(options) {
    options = options || {}
    if (options && options.position) {
      const entity = this.createGraphics()
      entity.position = options.position
      options.material = CircleFadeMaterial({
        color: options.color || Cesium.Color.fromCssColorString('#02ff00'),
        duration: options.duration || 2000
      })
      entity.cylinder = this.getCylinderGraphics(options)

      return this.viewer.entities.add(entity)
    }
  }

  // 创建旋转圆柱
  public craeteRotateCylinderGraphics(options) {
    if (options && options.position) {
      const cylinderEntity = this.createGraphics()
      cylinderEntity.cylinder = {
        HeightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
        length: options.length || 500,
        topRadius: options.topRadius || 500,
        bottomRadius: options.bottomRadius || 500,
        material:
          options.material ||
          new Cesium.ImageMaterialProperty({
            image: 'src/assets/image/cc2.jpg',
            transparent: true,
            repeat: {
              x: 1,
              y: -1
            }
          }),
        slices: options.slices || 128
      }
      cylinderEntity.position = options.position

      this.setGraphicsRotate({
        entity: cylinderEntity,
        position: transformCartesianToWGS84(options.position),
        rotateAmount: 4
      })
      return this.viewer.entities.add(cylinderEntity)
    }
  }

  //闪烁圆
  public craeteDynamicBlinkCircleGraphics(options) {
    if (options && options.position) {
      let entity = this.createGraphics(),
        alp = options.alp || 1,
        flog = options.flog || true
      entity.position = options.position
      entity.ellipse = {
        semiMinorAxis: options.semiMinorAxis || 2000.0,
        semiMajorAxis: options.semiMajorAxis || 2000.0,
        height: options.height || 10,
        material: new Cesium.ColorMaterialProperty(
          new Cesium.CallbackProperty(function () {
            if (flog) {
              alp = alp - 0.05
              if (alp <= 0) {
                flog = false // hide
              }
            } else {
              alp = alp + 0.05
              if (alp >= 1) {
                flog = true // show
              }
            }
            return Cesium.Color.RED.withAlpha(alp)
          }, false)
        )
      }
      return this.viewer.entities.add(entity)
    }
  }

  //动态旋转圆
  public craeteDynamicCricleGraphics(options) {
    if (options && options.center) {
      let entity = this.createGraphics(),
        $this = this,
        _center = options.center,
        _radius = options.radius || 800,
        _rotateAmount = options.rotateAmount || 0.05,
        _stRotation = 0,
        _height = options.height || 1,
        heading = 0,
        pitch = 0,
        roll = 0,
        _scale = options.scale || null,
        _scale2 = options.scale2 || null,
        _material =
          options.material ||
          new Cesium.ImageMaterialProperty({
            image: options.imge || 'data/images/Textures/circle_bg.png',
            transparent: true
          })

      entity.position = new Cesium.CallbackProperty(function () {
        return transformWGS84ToCartesian(_center)
      }, false)

      entity.orientation = new Cesium.CallbackProperty(function () {
        return Cesium.Transforms.headingPitchRollQuaternion(
          transformWGS84ToCartesian(_center),
          new Cesium.HeadingPitchRoll(
            Cesium.Math.toRadians(heading),
            Cesium.Math.toRadians(pitch),
            Cesium.Math.toRadians(roll)
          )
        )
      }, false)
      let bg_scale = _radius,
        flag = false
      const updateScalerAxis = () => {
        if (_radius >= _scale || _radius <= bg_scale) {
          flag = !flag
        }
        flag ? (_radius += 2) : (_radius -= 2)
      }
      const updateScalerAxis2 = () => {
        _scale2 >= _radius ? (_radius += 2) : (_radius = bg_scale)
      }
      entity.ellipse = {
        material: _material,
        height: _height,
        semiMajorAxis: new Cesium.CallbackProperty(function () {
          return _radius
        }, false),
        semiMinorAxis: new Cesium.CallbackProperty(function () {
          return _radius
        }, false),
        stRotation: new Cesium.CallbackProperty(function () {
          if (_rotateAmount > 0) {
            _stRotation += _rotateAmount
            if (_stRotation >= 360) {
              _stRotation = 0
            }
          }
          if (_scale) updateScalerAxis()
          if (_scale2) updateScalerAxis2()
          return _stRotation
        }, false)
      }
      return this.viewer.entities.add(entity)
    }
  }

  //动态渐变墙
  public craeteDynamicShadeWallGraphics(options) {
    if (options && options.positions) {
      let alp = options.alp || 1,
        num = options.num || 20,
        color = options.color || Cesium.Color.RED,
        speed = options.speed || 0.003

      const wallEntity = this.createGraphics()
      wallEntity.wall = {
        positions: options.positions,
        material: new Cesium.ImageMaterialProperty({
          image: 'data/images/Textures/fence.png',
          transparent: true,
          color: new Cesium.CallbackProperty(function () {
            if (num % 2 === 0) {
              alp -= speed
            } else {
              alp += speed
            }

            if (alp <= 0.1) {
              num++
            } else if (alp >= 1) {
              num++
            }
            return color.withAlpha(alp)
          }, false)
        })
      }
      return this.viewer.entities.add(wallEntity)
    }
  }

  // 默认自定义标牌气泡框
  public createCustomDefBillboardGraphics(options) {
    if (options && options.position) {
      const $this = this,
        img = new Image()
      img.src = options.img || 'src/assets/image/div1.png'
      // 绘制canvas
      function drawCompanyTip(options) {
        if (!options.image) return
        const canvas = document.createElement('canvas')
        canvas.width = options.width || 150
        canvas.height = options.height || 80
        const context = canvas.getContext('2d')
        context.drawImage(options.image, 0, 0)
        const dom = options.text
        context.font = '15px bold 宋体'
        context.fillStyle = '#f4fff0'
        context.fillText(dom, 55, 36)
        return canvas
      }
      img.onload = function () {
        options.image = img
        const entity = $this.viewer.entities.add({
          name: options.name || null,
          id: options.id || null,
          position: options.position,
          billboard: {
            image: drawCompanyTip(options),
            scaleByDistance: new Cesium.NearFarScalar(1.5e2, 0.7, 1.5e7, 0.5),
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            pixelOffset: options.pixelOffset || new Cesium.Cartesian2(80, -35),
            width: 140,
            height: 100,
            scale: options.scale || 1.5,
            disableDepthTestDistance: Number.POSITIVE_INFINITY,
            imageSubRegion: { x: 0, y: 0, width: 200, height: 150 }
          }
        })
        if (typeof options.callback === 'function') {
          options.callback(entity)
        }
      }
    }
  }

  // 旋转面
  public craeteRotatePlaneGraphics(options) {
    if (options && options.center && options.positions) {
      let entity = this.createGraphics(),
        index = 0,
        _center = options.center,
        _plane,
        positions = options.positions,
        _position = positions[0]
      entity.position = new Cesium.CallbackProperty(function () {
        if (index == 0) {
          ;(_position = positions[0]), (index += 1)
        } else if (index < positions.length - 1) {
          ;(_position = positions[index]), (index += 1)
        } else if (index == positions.length - 1) {
          ;(_position = positions[index]), (index = 0)
        }
        return _position
      }, false)
      entity.plane = {
        // plane: new Cesium.CallbackProperty(function () {
        //     var normaB = Cesium.Cartesian3.normalize(Cesium.Cartesian3.subtract(_center, _position, new Cesium.Cartesian3()), new Cesium.Cartesian3())
        //     _plane = new Cesium.Plane(Cesium.Cartesian3.normalize(Cesium.Cartesian3.add(normaB, _center, new Cesium.Cartesian3()), new Cesium.Cartesian3()), 0.0)

        //     _plane = Cesium.Plane.fromPointNormal(coefficients, result)
        //     return _plane;
        // }, false),
        plane: new Cesium.Plane(Cesium.Cartesian3.UNIT_Y, 0.0),
        dimensions: options.dimensions || new Cesium.Cartesian2(200.0, 150.0),
        material: new Cesium.ImageMaterialProperty({
          image: options.image
        })
      }

      return this.viewer.entities.add(entity)
    }
  }

  // 视频投放
  public createVideoPlaneGraphics(options) {
    if (options && options.position) {
      const entity = this.createGraphics()
      entity.position = options.position
      entity.plane = {
        plane: new Cesium.Plane(options.normal || Cesium.Cartesian3.UNIT_Y, 0.0),
        dimensions: options.dimensions || new Cesium.Cartesian2(200.0, 150.0),
        material: new Cesium.ImageMaterialProperty({
          image: options.videoElement
        })
      }
      return this.viewer.entities.add(entity)
    }
  }

  //gif 图片投影
  public createGifBillboardGraphics(options) {
    if (SuperGif && options && options.position) {
      let gif = [],
        url = options.url,
        i = 0,
        speed = 6

      // 遍历gif的每一帧
      function parseGifImages(url, imageArr) {
        const img = document.createElement('img')
        img.src = url
        img.setAttribute('rel:animated_src', url) // gif库需要img标签配置下面两个属性
        img.setAttribute('rel:auto_play', '0')
        document.body.appendChild(img)
        // 新建gif实例
        const rub = new SuperGif({ gif: img })
        return new Promise((resolve) => {
          rub.load(() => {
            for (let i = 1; i <= rub.get_length(); i++) {
              rub.move_to(i) // 遍历gif实例的每一帧
              imageArr.push(rub.get_canvas().toDataURL())
            }
            resolve(imageArr)
            // document.body.removeChild(img)
          })
        })
      }

      parseGifImages(url, gif)
      return this.viewer.entities.add({
        position: options.position,
        billboard: {
          verticalOrigin: Cesium.VerticalOrigin.BASELINE,
          image: new Cesium.CallbackProperty(function () {
            if (gif.length) {
              // 解析每一帧
              if (i < speed * (gif.length - 1)) {
                i++
              } else {
                i = 0
              }
              return gif[Math.floor(i / speed)]
            } else {
              return url //因为loadGif是异步的，在解析完成之前先使用原图
            }
          }, false),
          scale: 0.2
        }
      })
    }
  }

  //图形旋转
  public setGraphicsRotate(options) {
    if (options && options.entity && options.rotateAmount) {
      const entity = options.entity,
        rotateAmount = options.rotateAmount,
        _position = options.position,
        $this = this
      ;(_position.heading = 0), (_position.pitch = 0), (_position.roll = 0)
      entity.position = new Cesium.CallbackProperty(function () {
        return transformWGS84ToCartesian(_position)
      }, false)

      entity.orientation = new Cesium.CallbackProperty(function () {
        if (rotateAmount > 0) {
          _position.heading += rotateAmount
          if (_position.heading === 360) {
            _position.heading = 0
          }
        }
        return Cesium.Transforms.headingPitchRollQuaternion(
          transformWGS84ToCartesian(_position),
          new Cesium.HeadingPitchRoll(
            Cesium.Math.toRadians(_position.heading),
            Cesium.Math.toRadians(_position.pitch),
            Cesium.Math.toRadians(_position.roll)
          )
        )
      }, false)
    }
  }

  // 图形浮动
  public setGraphicsFloat(options) {
    if (options && options.entity && options.maxHeiht) {
      let entity = options.entity,
        minHeiht = options.minHeiht || 5,
        maxHeiht = options.maxHeiht || 100,
        cartesians = options.cartesians,
        speed = options.speed || 0.06,
        $this = this,
        bg_minHeiht = minHeiht,
        flag = false
      if (cartesians.length) {
        entity.positions = new Cesium.CallbackProperty(function () {
          const positions = transformCartesianArrayToWGS84Array(cartesians)
          for (const i in positions) {
            const position = positions[i]
            if (minHeiht >= maxHeiht || minHeiht <= bg_minHeiht) {
              flag = !flag
            }
            flag ? (minHeiht += speed) : (minHeiht -= speed)
            position.alt = minHeiht
          }
          return transformWGS84ArrayToCartesianArray(positions)
        }, false)
      } else {
        entity.position = new Cesium.CallbackProperty(function () {
          const position = transformCartesianToWGS84(cartesians)
          if (minHeiht >= maxHeiht || minHeiht <= bg_minHeiht) {
            flag = !flag
          }
          flag ? (minHeiht += speed) : (minHeiht -= speed)
          position.alt = minHeiht
          return transformWGS84ToCartesian(position)
        }, false)
      }
    }
  }

  //canvas 贴图
  public createCanvasGraphics(options) {
    if (options && options.positions) {
      function drawCanvasImage() {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        const img = new Image()
        img.src = options.img || '../../images/ysCesium/logo.png'
        ctx.clearRect(0, 0, options.cwidth, options.cheight)
        if (i <= cwidth) {
          ctx.drawImage(img, i, 0)
        } else i = 0
        i += 3
        curCanvas = curCanvas === 'c' ? 'd' : 'c'
        return canvas
      }

      this.viewer.entities.add({
        rectangle: {
          coordinates: options.positions,
          material: new Cesium.ImageMaterialProperty({
            image: new Cesium.CallbackProperty(drawCanvasImage, false),
            transparent: true
          })
        }
      })

      if (typeof options.callback === 'function') {
        options.callback()
      }
    }
  }

  // 报警点位闪烁
  public createAlarmPoint = (options) => {
    let x = 1
    let flog = true
    this.viewer.entities.add({
      position: options.position,
      point: {
        show: true, // default
        color: new Cesium.CallbackProperty(function () {
          if (flog) {
            x = x - 0.05
            if (x <= 0) {
              flog = false
            }
          } else {
            x = x + 0.05
            if (x >= 1) {
              flog = true
            }
          }
          return Cesium.Color.RED.withAlpha(x)
        }, false),
        pixelSize: 10, // default: 1
        outlineWidth: 0
      }
    })
  }

  // 报警区域闪烁（圆）
  public createAlarmCircle = (options) => {
    let x = 1
    let flog = true
    this.viewer.entities.add({
      position: options.position,
      ellipse: {
        semiMinorAxis: options.semiMinorAxis || 100,
        semiMajorAxis: options.semiMajorAxis || 100,
        height: 0,
        material: new Cesium.ColorMaterialProperty(
          new Cesium.CallbackProperty(function () {
            if (flog) {
              x = x - 0.05
              if (x <= 0) {
                flog = false
              }
            } else {
              x = x + 0.05
              if (x >= 1) {
                flog = true
              }
            }
            return Cesium.Color.RED.withAlpha(x)
          }, false)
        )
      }
    })
  }
}

export default CesiumGraphics
