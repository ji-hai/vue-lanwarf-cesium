import { defaultValue,defined,createPropertyDescriptor, Event, Material, Color, Property } from 'cesium'

class PolylineCustomMaterialProperty{
	
	declare _definitionChanged: Event;
	
	declare _color: undefined;
	
	declare _colorSubscription: undefined;
	
	declare color: string;
	
	declare duration: number;
	
	declare _time: any;
	
	declare image: string;
	
	constructor(options) {
		//@ts-ignore
		options = defaultValue(options, defaultValue.EMPTY_OBJECT);
		
		this._definitionChanged = new Event();
		
		this._color = undefined;
		
		this._colorSubscription = undefined;
		
		this.color = options.color;
		
		this.duration = defaultValue(options.duration, 1000);
		
		this._time = undefined;
		
		this.image = options.image;
		
		this.init()
	}
	
	private init(){
		// 将定义的材质对象添加到cesium的材质队列中
		Material._materialCache.addMaterial(PolylineCustomMaterialProperty, {
			fabric: {
				type: PolylineCustomMaterialProperty,
				uniforms: {
					color: new Color(1, 0.0, 0.0, 1),
					image: this.image,
					time: 20,
				},
				// 动态材质shader
				source: "czm_material czm_getMaterial(czm_materialInput materialInput)\n\
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
                    ",
			},
			// 透明
			translucent: function (material) {
				return true;
			}
		})
	}
	
	private getType(){
		//@ts-ignore
		return "PolylineTrailLink";
	}
	
	private getValue(time, result){
		if (!defined(result)) {
			
			result = {};
			
		}
		
		//@ts-ignore
		result.color = Property.getValueOrClonedDefault(this._color, time, Color.WHITE, result.color);
		
		result.image = this.image;
		
		if (this._time === undefined) {
			
			this._time = time.secondsOfDay;
			
		}
		result.time = (time.secondsOfDay - this._time) * 1000 / this.duration;
		
		return result;
	}
	
	private equals(other){
		//@ts-ignore
		return this === other ||
			
			(other instanceof PolylineCustomMaterialProperty &&
				
				Property.equals(this._color, other._color))
	}
	
	get isvarant() {
		
		return false;
		
	}
	
	get definitionChanged(){
		
		return this._definitionChanged;
		
	}
	
}

Object.defineProperties(PolylineCustomMaterialProperty.prototype, {
	
	color: createPropertyDescriptor('color')
	
});


export default PolylineCustomMaterialProperty
