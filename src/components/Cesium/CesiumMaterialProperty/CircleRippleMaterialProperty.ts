import * as Cesium from "cesium";

const CircleRippleMaterialSource = `
          uniform vec4 color;
          uniform float speed;
          uniform float count;
          uniform float gradient;
          czm_material czm_getMaterial(czm_materialInput materialInput)
          {
          czm_material material = czm_getDefaultMaterial(materialInput);
          material.diffuse = 1.5 * color.rgb;
          vec2 st = materialInput.st;
          float dis = distance(st, vec2(0.5, 0.5));
          float per = fract(czm_frameNumber * speed / 1000.0);
          if(count == 1.0){
              if(dis > per * 0.5){
              discard;
              }else {
              material.alpha = color.a  * dis / per / 2.0;
              }
          } else {
              vec3 str = materialInput.str;
              if(abs(str.z)  > 0.001){
              discard;
              }
              if(dis > 0.5){
              discard;
              } else {
              float perDis = 0.5 / count;
              float disNum;
              float bl = 0.0;
              for(int i = 0; i <= 999; i++){
                  if(float(i) <= count){
                  disNum = perDis * float(i) - dis + per / count;
                  if(disNum > 0.0){
                      if(disNum < perDis){
                      bl = 1.0 - disNum / perDis;
                      }
                      else if(disNum - perDis < perDis){
                      bl = 1.0 - abs(1.0 - disNum / perDis);
                      }
                      material.alpha = pow(bl,(1.0 + 10.0 * (1.0 - gradient)));
                  }
                  }
              }
              }
          }
          return material;
          }`;


/**
 * 圆形扫描以及圆形扩散的类对象
 * @alias EV_CircleScan
 * @constructor
 * @param options
 */

function CircleRippleMaterialProperty(options:any) {
	
	//@ts-ignore
	this._definitionChanged = new Cesium.Event();
	//@ts-ignore
	this._color = options.color;
	//@ts-ignore
	this._speed = options.speed;
	//@ts-ignore
	this.color = options.color;
	//@ts-ignore
	this.speed = options.speed;
	//@ts-ignore
	this.count = options.count;
	//@ts-ignore
	this.gradient = options.gradient;
	//@ts-ignore
	Cesium.Material.CircleRippleMaterialProperty = "CircleRippleMaterialProperty";
	//@ts-ignore
	Cesium.Material.CircleRippleMaterialType = "CircleRippleMaterialType";
	//@ts-ignore
	Cesium.Material.CircleRippleMaterialSource = CircleRippleMaterialSource;
//@ts-ignore
	Cesium.Material._materialCache.addMaterial(
		//@ts-ignore
		Cesium.Material.CircleRippleMaterialType,
		{
			fabric: {
				//@ts-ignore
				type: Cesium.Material.CircleRippleMaterialType,
				uniforms: {
					color: new Cesium.Color(1.0, 1.0, 0.0, 1.0),
					speed: 3.0,
					count: 4,
					gradient: 0.2,
				},
				//@ts-ignore
				source: Cesium.Material.CircleRippleMaterialSource,
			},
			translucent: function (material:any) {
				return true;
			},
		}
	);
}

Object.defineProperties(CircleRippleMaterialProperty.prototype, {
	isConstant: {
		get: function () {
			return false;
		},
	},
	definitionChanged: {
		get: function () {
			return this._definitionChanged;
		},
	},
	//@ts-ignore
	color: Cesium.createPropertyDescriptor("color"),
	//@ts-ignore
	speed: Cesium.createPropertyDescriptor("speed"),
	//@ts-ignore
	count: Cesium.createPropertyDescriptor("count"),
	//@ts-ignore
	gradient: Cesium.createPropertyDescriptor("gradient"),
	
});

CircleRippleMaterialProperty.prototype.getType = function (time:any) {
	//@ts-ignore
	return Cesium.Material.CircleRippleMaterialType;
};

CircleRippleMaterialProperty.prototype.getValue = function (time:any, result:any) {
	if (!Cesium.defined(result)) {
		result = {};
	}
	//@ts-ignore
	result.color = Cesium.Property.getValueOrDefault(
		this._color,
		time,
		Cesium.Color.RED,
		result.color
	);
	//@ts-ignore
	result.speed = Cesium.Property.getValueOrDefault(
		this._speed,
		time,
		10,
		result.speed
	);
	
	result.count = this.count;
	result.gradient = this.gradient;
	return result;
};

CircleRippleMaterialProperty.prototype.equals = function (other:any) {
	return (
		this === other ||
		(other instanceof CircleRippleMaterialProperty &&
			//@ts-ignore
			Cesium.Property.equals(this._color, other._color) &&
			//@ts-ignore
			Cesium.Property.equals(this._speed, other._speed) &&
			//@ts-ignore
			Cesium.Property.equals(this.count, other.count) &&
			//@ts-ignore
			Cesium.Property.equals(this.gradient, other.gradient))
	);
	
};

export default CircleRippleMaterialProperty;
