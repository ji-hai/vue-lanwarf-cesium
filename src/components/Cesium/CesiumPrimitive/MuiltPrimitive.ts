import * as Cesium from 'cesium'

class MuiltPrimitive{
	
	declare viewer:any
	
	constructor(option: {
		viewer: any
	}) {
		
		this.viewer = option.viewer
		
		this.init()
	}
	
	init(){
		// 创建长方体对象
		const extrudedPolygon = new Cesium.PolygonGeometry({
			polygonHierarchy: new Cesium.PolygonHierarchy(
				Cesium.Cartesian3.fromDegreesArray([
					112.41726298378288,23.290411251106182,113.67072522399741,23.560312361463682,
					114.09370956893551,22.590768298743153,112.83803246418894,22.285610818885644,
				])
			),
			extrudedHeight: 100000,
		})
		// 实体
		const instance = new Cesium.GeometryInstance({
			geometry: extrudedPolygon,
		})
		const extrudedPolygon2 = new Cesium.PolygonGeometry({
			polygonHierarchy: new Cesium.PolygonHierarchy(
				Cesium.Cartesian3.fromDegreesArray([
					114, 22,115,22,
					115,23,114,23,
				])
			),
			extrudedHeight: 100000,
		})
		const instance2 = new Cesium.GeometryInstance({
			geometry: extrudedPolygon2,
		})
		
        // 创建材质，在MaterialAppearance中若不添加基础材质，模型将会透明
		var material = new Cesium.Material.fromType("Color");
		material.uniforms.color =  Cesium.Color.RED;
		
        // 自定义材质
		const aper = new Cesium.MaterialAppearance({
			material: material,
			translucent: true,
			closed: true,
		})
		
		// 加载模型
		this.viewer.scene.primitives.add(
			new Cesium.Primitive({
				geometryInstances: [instance, instance2], // 几何实例-或单个几何实例。
				appearance: aper,  // 用于渲染图元的外观。
				releaseGeometryInstances: false,
				compressVertices: false,
			})
		)
	}
}

export default MuiltPrimitive
