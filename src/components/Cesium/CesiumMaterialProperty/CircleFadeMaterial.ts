import { defaultValue,defined,createPropertyDescriptor, Event, Material, Color, Property } from "cesium";
/**
 *  @description 渐变圆材质
 *  @param {String} options.color 颜色
 *  @author jh
 *  @date 2024-04-10
 * */

class CircleFadeMaterialProperty {
	
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
		if (!defined(CircleFadeMaterialProperty.instance)) {
			CircleFadeMaterialProperty.instance = new CircleFadeMaterialProperty(options)
		}
		return CircleFadeMaterialProperty.instance
	}
	
	constructor(options) {
		//@ts-ignore
		options = defaultValue(options, defaultValue.EMPTY_OBJECT);
		
		this._definitionChanged = new Event();
		
		this._color = void 0;
		
		this._colorSubscription = void 0;
		
		this.color = defaultValue(options.color, new Color(0, 0, 0, 0));
		
		this.duration = defaultValue(options.duration, 1e3);
		
		this._time = void 0;
		
		this.init()
	}
	
	private init(){
		//@ts-ignore
		Material.CircleFadeMaterialType = 'CircleFadeMaterial';
		
		//@ts-ignore
		Material._materialCache.addMaterial('CircleFadeMaterial', {
			
			fabric: {
				
				type: "CircleFadeMaterial",
				
				uniforms: {
					
					color: new Color(1, 0, 0, 1),
					
					time: 1,
				},
				
				source: `czm_material czm_getMaterial(czm_materialInput materialInput)\n
                    {\n
                        czm_material material = czm_getDefaultMaterial(materialInput);\n
                        material.diffuse = 1.5 * color.rgb;\n
                        vec2 st = materialInput.st;\n
                        float dis = distance(st, vec2(0.5, 0.5));\n
                        float per = fract(time);\n
                        if(dis > per * 0.5){\n
                            //material.alpha = 0.0;\n
                            discard;\n
                        }else {\n
                            material.alpha = color.a  * dis / per / 2.0;\n
                        }\n
                        return material;\n
                    }`
				
			},
			
			translucent: function(material) {
				
				return !0;
				
			}
			
		})
	}
	
	private getType(){
		//@ts-ignore
		return Material.CircleFadeMaterialType;
	}
	
	private getValue(time, result){
		if (!defined(result)) {
			
			result = {};
			
		}
		
		//@ts-ignore
		result.color = Property.getValueOrClonedDefault(this._color, time, new Color(0, 0, 0, 0), result.color);
		
		result.time = (performance.now() - this._time) / this.duration;
		
		return result;
	}
	
	private equals(other){
		//@ts-ignore
		return this === other ||
			
			(other instanceof CircleFadeMaterialProperty &&
				
				Property.equals(this._color, other._color))
	}
	
	get isDestroyed() {
		
		return false;
		
	}
	
	get definitionChanged(){
		
		return this._definitionChanged;
		
	}
}

Object.defineProperties(CircleFadeMaterialProperty.prototype, {
	
	color: createPropertyDescriptor('color')
	
});

const CircleFadeMaterial = (options:object): CircleFadeMaterialProperty=> {
	return new CircleFadeMaterialProperty(options)
}

export default CircleFadeMaterial
