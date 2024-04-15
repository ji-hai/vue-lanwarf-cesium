import * as Cesium from "cesium";

const TrailLinkMaterialSource = `
     czm_material czm_getMaterial(czm_materialInput materialInput){
	    czm_material material = czm_getDefaultMaterial(materialInput);
        vec2 st = materialInput.st;
	    vec4 colorImage = texture2D(image, vec2(fract(st.s - time), st.t));
	    material.alpha = colorImage.a * color.a;
	    material.diffuse = (colorImage.rgb + color.rgb) / 2.0;
	    return material;
	    }`;

// 激光材质类
function LaserPolylineTrailLinkMaterialProperty(this: any, duration: any, color: any, image: any) {
	this._definitionChanged = new Cesium.Event();
	this._color = undefined;
	this._colorSubscription = undefined;
	this.color = color;
	this.image = image
	this.duration = duration;
	this._time = new Date().getTime();
	
	//@ts-ignore
	Cesium.Material.LaserPolylineTrailLinkMaterialProperty = 'LaserPolylineTrailLinkMaterialProperty';
	//@ts-ignore
	Cesium.Material.PolylineTrailLinkType = "PolylineTrailLink";
	//@ts-ignore
	Cesium.Material.TrailLinkMaterialSource = TrailLinkMaterialSource
	//@ts-ignore
	Cesium.Material._materialCache.addMaterial(
		//@ts-ignore
		Cesium.Material.PolylineTrailLinkType,
		{
			fabric: {
				//@ts-ignore
				type: Cesium.Material.PolylineTrailLinkType,
				uniforms: {
					color: new Cesium.Color(1.0, 0.0, 0.0, 0.5),
					image: '',
					time: 20,
				},
				//@ts-ignore
				source: Cesium.Material.TrailLinkMaterialSource,
			},
			translucent: function(material:any) {
				return true;
			},
		}
	);
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
	//@ts-ignore
	color: Cesium.createPropertyDescriptor("color"),
});

LaserPolylineTrailLinkMaterialProperty.prototype.getType = function(time:any) {
	return "PolylineTrailLink";
};

LaserPolylineTrailLinkMaterialProperty.prototype.getValue = function(time: any, result: { color?: any; image?: any; time?: any; }) {
	if (!Cesium.defined(result)) {
		result = {};
	}
	//@ts-ignore
	result.color = Cesium.Property.getValueOrClonedDefault(
		this._color,
		time,
		Cesium.Color.WHITE,
		result.color
	);
	result.image = this.image;
	result.time =
		((new Date().getTime() - this._time) % this.duration) / this.duration;
	return result;
};

LaserPolylineTrailLinkMaterialProperty.prototype.equals = function(other: { _color: any; }) {
	return (
		this === other ||
		(other instanceof LaserPolylineTrailLinkMaterialProperty &&
			//@ts-ignore
			Cesium.Property.equals(this._color, other._color))
	);
};

export default LaserPolylineTrailLinkMaterialProperty;



