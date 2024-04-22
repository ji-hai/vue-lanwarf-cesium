import {
  defaultValue,
  defined,
  createPropertyDescriptor,
  Event,
  Material,
  Color,
  Property
} from 'cesium'

/**
 *  @description 自定义流动线条材质
 *  @param {String} options.color 颜色
 *  @param {Number} options.duration 持续时间
 *  @param {String} options.image 图片
 *  @author jh
 *  @date 2024-04-10
 *  @use
 *  CustomMaterial({
        image: '/src/assets/image/line.png',
        color: Cesium.Color.WHITE,
        duration: 2000
      })
 * */

// 完整调用方式
// viewer.entities.add({
// 	polyline: {
// 		positions: [
// 			Cesium.Cartesian3.fromDegrees(120.5, 30.1, 0),
// 			Cesium.Cartesian3.fromDegrees(120.2, 30.5, 0),
// 		],
// 		width: 10,
// 		material: CustomMaterial({
// 			image: '/src/assets/image/line.png',
// 			color: Cesium.Color.WHITE,
// 			duration: 2000
// 		}),
// 	}
// });
class PolylineCustomMaterialProperty {
  declare _definitionChanged: Event

  declare _color: undefined

  declare _colorSubscription: undefined

  declare color: string

  declare duration: number

  declare _time: any

  declare image: string

  constructor(options) {
    //@ts-ignore
    options = defaultValue(options, defaultValue.EMPTY_OBJECT)

    this._definitionChanged = new Event()

    this._color = undefined

    this._colorSubscription = undefined

    this.color = options.color

    this.duration = defaultValue(options.duration, 1000)

    this._time = undefined

    this.image = options.image

    this.init()
  }

  private init() {
    Material.PolylineCustomMaterialType = 'PolylineCustomMaterial'
    // 将定义的材质对象添加到cesium的材质队列中
    Material._materialCache.addMaterial('PolylineCustomMaterial', {
      fabric: {
        type: 'PolylineCustomMaterial',
        uniforms: {
          color: new Color(1, 0.0, 0.0, 1),
          image: this.image,
          time: 20
        },
        // 动态材质shader
        source:
          'czm_material czm_getMaterial(czm_materialInput materialInput)\n\
                    {\n\
                        czm_material material = czm_getDefaultMaterial(materialInput);\n\
                        vec2 st = materialInput.st;\n\
                        \n\
                        if(texture2D(image, vec2(0.0, 0.0)).a == 1.0){\n\
                            discard;\n\
                        }else{\n\
                            material.alpha = texture2D(image, vec2(1.0 - fract(time - st.s), st.t)).a * color.a;\n\
                        }\n\
                        \n\
                        material.diffuse = max(color.rgb * material.alpha * 3.0, color.rgb);\n\
                        \n\
                        return material;\n\
                    }\n\
                    '
      },
      // 透明
      translucent: function (material) {
        return true
      }
    })
  }

  private getType() {
    //@ts-ignore
    return Material.PolylineCustomMaterialType
  }

  private getValue(time, result) {
    if (!defined(result)) {
      result = {}
    }

    //@ts-ignore
    result.color = Property.getValueOrClonedDefault(this._color, time, Color.WHITE, result.color)

    result.image = this.image

    if (this._time === undefined) {
      this._time = time.secondsOfDay
    }
    result.time = ((time.secondsOfDay - this._time) * 1000) / this.duration

    return result
  }

  private equals(other) {
    //@ts-ignore
    return (
      this === other ||
      (other instanceof PolylineCustomMaterialProperty &&
        Property.equals(this._color, other._color))
    )
  }

  get isvarant() {
    return false
  }

  get definitionChanged() {
    return this._definitionChanged
  }
}

Object.defineProperties(PolylineCustomMaterialProperty.prototype, {
  color: createPropertyDescriptor('color')
})

const CustomMaterial = (options: object): PolylineCustomMaterialProperty => {
  return new PolylineCustomMaterialProperty(options)
}

export default CustomMaterial
