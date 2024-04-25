import * as Cesium from 'cesium'
/**
 *  流动线效果 多段线
 */
function PolylineTrailLinkMaterialProperty(duration: any, color: any, repeat: any, image) {
  //@ts-ignore
  this._definitionChanged = new Cesium.Event()
  //@ts-ignore
  this._color = undefined
  //@ts-ignore
  this._colorSubscription = undefined
  //@ts-ignore
  this.color = color
  //@ts-ignore
  this.duration = duration
  //@ts-ignore
  this._time = new Date().getTime()
  //@ts-ignore
  this._repeat = undefined
  //@ts-ignore
  this.repeat = repeat

  this.image = image
}

Object.defineProperties(PolylineTrailLinkMaterialProperty.prototype, {
  isConstant: {
    get: function () {
      return false
    }
  },
  definitionChanged: {
    get: function () {
      return this._definitionChanged
    }
  },
  //@ts-ignore
  color: Cesium.createPropertyDescriptor('color'),
  repeat: Cesium.createPropertyDescriptor('repeat')
})

PolylineTrailLinkMaterialProperty.prototype.getType = function (time: any) {
  return 'PolylineTrailLink'
}
PolylineTrailLinkMaterialProperty.prototype.getValue = function (
  time: any,
  result: { color?: any; image?: any; time?: any }
) {
  if (!Cesium.defined(result)) {
    result = {}
  }
  //@ts-ignore
  result.color = Cesium.Property.getValueOrClonedDefault(
    this._color,
    time,
    Cesium.Color.WHITE,
    result.color
  )

  result.repeat = Cesium.Property.getValueOrClonedDefault(
    this._repeat,
    time,
    new Cesium.Cartesian2(1.0, 1.0),
    result.repeat
  )

  //@ts-ignore
  result.image = this.image
  result.time = ((new Date().getTime() - this._time) % this.duration) / this.duration
  return result
}
PolylineTrailLinkMaterialProperty.prototype.equals = function (other: any) {
  return (
    this === other ||
    (other instanceof PolylineTrailLinkMaterialProperty &&
      //@ts-ignore
      Cesium.Property.equals(this._color, other._color))
  )
}

//@ts-ignore
Cesium.Material.PolylineTrailLinkMaterialProperty = PolylineTrailLinkMaterialProperty
//@ts-ignore
Cesium.Material.PolylineTrailLinkType = 'PolylineTrailLink'
//@ts-ignore
Cesium.Material.PolylineTrailLinkImage = 'src/assets/image/line8.png'
//@ts-ignore
Cesium.Material.PolylineTrailLinkSource =
  'czm_material czm_getMaterial(czm_materialInput materialInput)\n\
{\n\
  czm_material material = czm_getDefaultMaterial(materialInput);\n\
  vec2 st = repeat * materialInput.st;\n\
  vec4 colorImage = texture2D(image, vec2(fract(st.s - time), st.t));\n\
  material.alpha = colorImage.a * color.a;\n\
  material.diffuse = (colorImage.rgb+color.rgb)/2.0;\n\
  return material;\n\
}'
//@ts-ignore
Cesium.Material._materialCache.addMaterial(
  //@ts-ignore
  Cesium.Material.PolylineTrailLinkType,
  {
    fabric: {
      //@ts-ignore
      type: Cesium.Material.PolylineTrailLinkType,
      uniforms: {
        color: new Cesium.Color(255.0, 255.0, 255.0, 1),
        //@ts-ignore
        image: Cesium.Material.PolylineTrailLinkImage,
        repeat: new Cesium.Cartesian2(1.0, 1.0),
        time: 0
      },
      //@ts-ignore
      source: Cesium.Material.PolylineTrailLinkSource
    },
    translucent: function (material: any) {
      return true
    }
  }
)

export default PolylineTrailLinkMaterialProperty
