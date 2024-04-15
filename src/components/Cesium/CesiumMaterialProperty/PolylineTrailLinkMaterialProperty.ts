import * as Cesium from "cesium";

function PolylineTrailLinkMaterialProperty(duration: any, color: any, repeat: any) {
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
	
	this._repeat = undefined;
	this.repeat = repeat
}

Object.defineProperties(PolylineTrailLinkMaterialProperty.prototype, {
	isConstant: {
		get: function () {
			return false
		},
	},
	definitionChanged: {
		get: function () {
			return this._definitionChanged
		},
	},
	//@ts-ignore
	color: Cesium.createPropertyDescriptor('color'),
	repeat: Cesium.createPropertyDescriptor('repeat')

})

PolylineTrailLinkMaterialProperty.prototype.getType = function (time:any) {
	return 'PolylineTrailLink'
}
PolylineTrailLinkMaterialProperty.prototype.getValue = function (
	time: any,
	result: { color?: any; image?: any; time?: any; }
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
		new Cesium.Cartesian2(1.0,1.0),
		result.repeat);
	
	//@ts-ignore
	result.image = Cesium.Material.PolylineTrailLinkImage
	result.time =
		((new Date().getTime() - this._time) % this.duration) /
		this.duration
	return result
}
PolylineTrailLinkMaterialProperty.prototype.equals = function (other:any) {
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
Cesium.Material.PolylineTrailLinkImage =
	'data:image/png;base64,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' //图片 图片为箭头
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
				repeat: new Cesium.Cartesian2(1.0,1.0),
				time: 0,
			},
			//@ts-ignore
			source: Cesium.Material.PolylineTrailLinkSource,
		},
		translucent: function (material:any) {
			return true
		},
	}
)

export default PolylineTrailLinkMaterialProperty;
