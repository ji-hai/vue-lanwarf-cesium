import * as Cesium from "cesium";

import geojsonToDegrees from "@/components/Cesium/CesiumEntity/geojsonToDegrees";

import EntityMethods from "@/components/Cesium/CesiumEntity/EntityMethods";
/**
 * @description 实体类 线
 * @param options.viewer {any} 地图viewer
 * @param options.geojsonData {any} 地图geojson格式  LineString
 * @param options.config {Object} polyline配置 线宽，材质
 * @param options.config.width { number } 线宽
 * @param options.config.material { any } 材质
 * @method on 事件绑定
 * @method off 事件注销
 * @method destroy 移除实体
 */

class WallEntity extends EntityMethods{
	declare viewer: any
	declare geojsonData: any
	declare entityModel: any
	declare entityModels: []
	declare config: {
		show?: boolean,
		clampToGround?: boolean,
		width?: number,
		material: any
	}
	declare ids: any

	declare handler: any

	constructor(options: { viewer: any; geojsonData: { features: { geometry: { coordinates: number[][][]; type: string }; type: string; properties: {} }[]; type: string } }) {
		super()
		this.viewer = options.viewer
		this.geojsonData = options.geojsonData
		this.entityModel = undefined
		this.entityModels = []
		this.config = options.config
		this.ids = []

		this.init()
	}

	private init(){
		geojsonToDegrees(this.geojsonData).forEach(item=>{
			this.entityModel = new Cesium.Entity({
				wall: {
					show: true,
					clampToGround: true, // 是否贴地
					shadows: Cesium.ShadowMode.DISABLED, // 折线是投射还是接收光源的阴影
					positions: item,
					// 设置高度
					maximumHeights: new Array(item.length).fill(100),
					minimumHeights: new Array(item.length).fill(0),
					material: Cesium.Color.YELLOW,
				}
			})

			this.viewer.entities.add(this.entityModel);

			this.entityModels.push(this.entityModel)
		})
	}

	public on(eventType, callback){
		this.off(eventType)
		this.ids = []
		for( let i = 0; i < this.entityModels.length; i++ ){
			if(this.viewer.entities.contains(this.entityModels[i])){
				this.ids.push(this.entityModels[i]?._id)
			}
		}

		let that = this;
		this.handler = new Cesium.ScreenSpaceEventHandler(that.viewer.scene.canvas);
		this.handler.setInputAction(function (click) {
			let pickedObject = that.viewer.scene.pick(click.position);

			// 屏幕坐标转世界坐标——关键点
			let ellipsoid = that.viewer.scene.globe.ellipsoid;
			let cartesian = that.viewer.camera.pickEllipsoid(click.position, ellipsoid);

			that.viewer._selectedEntity = [];//去除左击之后出现选中的绿框

			if (cartesian) {     //判断点击的是否是地球
				//将笛卡尔坐标转换为地理坐标
				const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
				//将弧度转为度的十进制度表示
				const lon = Cesium.Math.toDegrees(cartographic.longitude);
				const lat = Cesium.Math.toDegrees(cartographic.latitude);
				const click_point = {longitude: lon, latitude: lat};
				// that.viewer._element.style.cursor = 'pointer'
				if (Cesium.defined(pickedObject)) {
					if(that.ids.includes(pickedObject?.id?._id)){
						callback(click_point,pickedObject)
						that.addPopup({
							viewer: that.viewer,
							position: [click_point.longitude, click_point.latitude, 0],
							props: click_point
						})
					}
				}
			}

		}, Cesium.ScreenSpaceEventType[eventType])
	}

	public off(eventType){
		if(this.handler){
			this.handler.removeInputAction(Cesium.ScreenSpaceEventType[eventType]);
			this.handler.destroy()
		}
	}

	public getEntityModels(){
		return this.entityModels
	}

	public destroy(){
		for( let i = 0; i < this.entityModels.length; i++ ){
			/**
			 *  删除实体
			 */
			if(this.viewer.entities.contains(this.entityModels[i])){
				this.viewer.entities.remove(this.entityModels[i])
			}

		}
	}
}

export default WallEntity
