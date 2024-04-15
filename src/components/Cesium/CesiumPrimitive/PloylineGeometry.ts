import * as Cesium from 'cesium'

class PloylineGeometry{
	declare viewer: any
	declare primitive:any
	
	constructor(option: {
		viewer:any
	}) {
		
		this.viewer = option.viewer
		
		this.primitive = undefined
		
		this.init()
	}
	
	
	init(){
		this.primitive = new Cesium.Primitive({
			// 形状
			geometryInstances: new Cesium.GeometryInstance({
				geometry: new Cesium.PolylineGeometry({
					positions: Cesium.Cartesian3.fromDegreesArray([120.0,40.0,100.0,30.0]),
					width:3.0,
					vertexFormat:Cesium.PolylineColorAppearance.VERTEX_FORMAT
				}),
				attributes: {
					color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.RED)
				}
			}),
			// 外观
			appearance: new Cesium.PolylineColorAppearance({
				translucent: false,  //是否透明
			})
		});
		
		this.viewer.scene.primitives.add(this.primitive)
	}
	
}

export default PloylineGeometry
