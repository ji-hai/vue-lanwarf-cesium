import * as Cesium from "cesium";
// 激光材质类
function LaserPolylineTrailLinkMaterialProperty(duration, color) {
	this._definitionChanged = new Cesium.Event();
	this._color = undefined;
	this._colorSubscription = undefined;
	this.color = color;
	this.duration = duration;
	this._time = new Date().getTime();
}

Object.defineProperties(LaserPolylineTrailLinkMaterialProperty.prototype, {
	isConstant: {
		get: function() {
			return false;
		},
	},
	definitionChanged: {
		get: function() {
			return this._definitionChanged;
		},
	},
	color: Cesium.createPropertyDescriptor("color"),
});

LaserPolylineTrailLinkMaterialProperty.prototype.getType = function(time) {
	return "PolylineTrailLink";
};

LaserPolylineTrailLinkMaterialProperty.prototype.getValue = function(
	time,
	result
) {
	if (!Cesium.defined(result)) {
		result = {};
	}
	result.color = Cesium.Property.getValueOrClonedDefault(
		this._color,
		time,
		Cesium.Color.WHITE,
		result.color
	);
	result.image = Cesium.Material.PolylineTrailLinkImage;
	result.time =
		((new Date().getTime() - this._time) % this.duration) / this.duration;
	return result;
};

LaserPolylineTrailLinkMaterialProperty.prototype.equals = function(other) {
	return (
		this === other ||
		(other instanceof LaserPolylineTrailLinkMaterialProperty &&
			Cesium.Property.equals(this._color, other._color))
	);
};

Cesium.Material.LaserPolylineTrailLinkMaterialProperty = LaserPolylineTrailLinkMaterialProperty;
Cesium.Material.PolylineTrailLinkType = "PolylineTrailLink";
Cesium.Material.PolylineTrailLinkImage = "/src/assets/image/img.png";
Cesium.Material.PolylineTrailLinkSource =
	"czm_material czm_getMaterial(czm_materialInput materialInput)\n\
   { czm_material material = czm_getDefaultMaterial(materialInput); vec2 st = materialInput.st;\n\
	  vec4 colorImage = texture2D(image, vec2(fract(st.s - time), st.t));\n\
	   material.alpha = colorImage.a * color.a;\n\
	   material.diffuse = (colorImage.rgb + color.rgb) / 2.0;\n\
	   return material;}";
Cesium.Material._materialCache.addMaterial(
	Cesium.Material.PolylineTrailLinkType,
	{
		fabric: {
			type: Cesium.Material.PolylineTrailLinkType,
			uniforms: {
				color: new Cesium.Color(0, 0.0, 0.0, 0.5),
				image: Cesium.Material.PolylineTrailLinkImage,
				time: 20,
			},
			source: Cesium.Material.PolylineTrailLinkSource,
		},
		translucent: function(material) {
			return true;
		},
	}
);

export default LaserPolylineTrailLinkMaterialProperty;

