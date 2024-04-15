import { defaultValue,defined,createPropertyDescriptor, Event, Material, Color, Property } from "cesium";
/**
 *  @description 自定义圆形波纹材质
 *  @param {String} options.color 颜色
 *  @param {Number} options.duration 持续时间
 *  @param {Number} options.count 环数（>0）
 *  @param {Number} options.gradient 倾斜度（0-1）
 *  @author jh
 *  @date 2024-04-10
 *  @use new WaveCircleMaterial({
        duration: 2e3,

        gradient: 0,

        color: new Cesium.Color(1.0, 0.0, 0.0, 1.0),

        count: 3
      })
 * */

// 完整调用方式
// viewer.entities.add({
// 	name: 'ellipse',
// 	position: Cesium.Cartesian3.fromDegrees(120, 30, 5),
// 	ellipse: {
// 		semiMajorAxis: 500,
// 		semiMinorAxis: 500,
// 		material: WaveCircleMaterial({
// 			duration: 2e3,
//
// 			gradient: 0,
//
// 			color: new Cesium.Color(1.0, 0.0, 0.0, 1.0),
//
// 			count: 3
// 		})
// 	}
// })

class CircleWaveMaterialProperty {
	
	declare _definitionChanged: Event;
	
	declare _color: undefined;
	
	declare _colorSubscription: undefined;
	
	declare color: string;
	
	declare duration: number;
	
	declare count: number;
	
	declare gradient: number;
	
	declare _time: any;
	
	// 存储单例
	private static instance;
	
	// 单例模式调用方式
	static getInstance(options) {
		if (!defined(CircleWaveMaterialProperty.instance)) {
			CircleWaveMaterialProperty.instance = new CircleWaveMaterialProperty(options)
		}
		return CircleWaveMaterialProperty.instance
	}
	
	constructor(options) {
		//@ts-ignore
		options = defaultValue(options, defaultValue.EMPTY_OBJECT);
		
		this._definitionChanged = new Event();
		
		this._color = undefined;
		
		this._colorSubscription = undefined;
		
		this.color = options.color;
		
		this.duration = defaultValue(options.duration, 1e3);
		
		this.count = defaultValue(options.count, 2);
		
		if (this.count <= 0) this.count = 1;
		
		this.gradient = defaultValue(options.gradient, 0.1);
		
		if (this.gradient < 0) this.gradient = 0;
		
		else if (this.gradient > 1) this.gradient = 1;
		
		this._time = performance.now();
		
		this.init()
	}
	
	private init(){
		//@ts-ignore
		Material.CircleWaveMaterialType = 'CircleWaveMaterial';
		
		//@ts-ignore
		Material._materialCache.addMaterial('CircleWaveMaterial', {
			
			fabric: {
				
				type: "CircleWaveMaterial",
				
				uniforms: {
					
					color: new Color(1.0, 0.0, 0.0, 1.0),
					
					time: 1,
					
					count: 1,
					
					gradient: 0.1
					
				},
				
				source: `czm_material czm_getMaterial(czm_materialInput materialInput)
 
                                        {
 
                                            czm_material material = czm_getDefaultMaterial(materialInput);
 
                                            material.diffuse = 1.5 * color.rgb;
 
                                            vec2 st = materialInput.st;
 
                                            vec3 str = materialInput.str;
 
                                            float dis = distance(st, vec2(0.5, 0.5));
 
                                            float per = fract(time);
 
                                            if (abs(str.z) > 0.001) {
 
                                                discard;
 
                                            }
 
                                            if (dis > 0.5) {
 
                                                discard;
 
                                            } else {
 
                                                float perDis = 0.5 / count;
 
                                                float disNum;
 
                                                float bl = .0;
 
                                                for (int i = 0; i <= 999; i++) {
 
                                                    if (float(i) <= count) {
 
                                                      disNum = perDis * float(i) - dis + per / count;
 
                                                        if (disNum > 0.0) {
 
                                                            if (disNum < perDis) {
 
                                                                bl = 1.0 - disNum / perDis;
 
                                                            }
 
                                                          else if (disNum - perDis < perDis) {
 
                                                                    bl = 1.0 - abs(1.0 - disNum / perDis);
 
                                                            }
 
                                                            material.alpha = pow(bl, gradient);
 
                                                        }
 
                                                    }
 
                                                }
 
                                            }
 
                                        return material;
 
                                    }`
				
			},
			
			translucent: function(material) {
				
				return !0;
				
			}
			
		})
	}
	
	private getType(){
		//@ts-ignore
		return Material.CircleWaveMaterialType;
	}
	
	private getValue(time, result){
		if (!defined(result)) {
			
			result = {};
			
		}
		
		//@ts-ignore
		result.color = Property.getValueOrClonedDefault(this._color, time, Color.WHITE, result.color);
		
		result.time = (performance.now() - this._time) / this.duration;
		
		result.count = this.count;
		
		result.gradient = 1 + 10 * (1 - this.gradient);
		
		return result;
	}
	
	private equals(other){
		//@ts-ignore
		return this === other ||
			
			(other instanceof CircleWaveMaterialProperty &&
				
				Property.equals(this._color, other._color))
	}
	
	get isDestroyed() {
		
		return false;
		
	}
	
	get definitionChanged(){
		
		return this._definitionChanged;
		
	}
}

Object.defineProperties(CircleWaveMaterialProperty.prototype, {
	
	color: createPropertyDescriptor('color')
	
});

const WaveCircleMaterial = (options:object): CircleWaveMaterialProperty=> {
	return new CircleWaveMaterialProperty(options)
}

export default WaveCircleMaterial
