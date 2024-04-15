import * as Cesium from "cesium";

import geojsonToDegrees from "@/components/Cesium/CesiumEntity/geojsonToDegrees";

import EntityMethods from "@/components/Cesium/CesiumEntity/EntityMethods";
/**
 * @description 实体类 box
 * @param options.viewer {any} 地图viewer
 * @param options.geojsonData {any} 地图geojson格式  LineString
 * @param options.config {Object} polyline配置
 * @method on 事件绑定
 * @method off 事件注销
 * @method destroy 移除实体
 */
class BoxEntity extends EntityMethods{
	declare viewer: any
	declare geojsonData: any
	declare entityModel: any
	declare entityModels: []
	declare config?: {
		show?: boolean,
		clampToGround?: boolean,
		width?: number,
		material: any
	}
	declare ids: any
	
	declare handler: any
	
	constructor(options: {
		viewer: any,
		geojsonData: any,
		config?: {
			show?: boolean,
			clampToGround?: boolean,
			width?: number,
			material: any
		}
	}) {
		super()
		this.viewer = options.viewer
		this.geojsonData = options.geojsonData
		this.entityModel = undefined
		this.entityModels = []
		this.config = options?.config
		this.ids = []
		
		this.init()
	}
	
	// 事件初始化
	private init(){
		geojsonToDegrees(this.geojsonData).forEach(item=>{
			this.entityModel = new Cesium.Entity({
				position: item[0],
				box : {
					dimensions : new Cesium.Cartesian3(4000.0, 3000.0, 5000.0),
					material : Cesium.Color.BLUE
				}
			})
			
			this.viewer.entities.add(this.entityModel);
			
			this.entityModels.push(this.entityModel)
		})
	}
	
	// 事件绑定
	public on(opt:{
		eventType: String,
		isPopup: Boolean
	}, callback){
		this.off(opt.eventType)
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
						callback(click_point,pickedObject, that.entityModels)
						if(opt.isPopup){
							that.addPopup({
								viewer: that.viewer,
								position: [click_point.longitude, click_point.latitude, 0],
								props: click_point
							})
						}
					}
				}
			}
			
		}, Cesium.ScreenSpaceEventType[opt.eventType])
	}
	
	// 事件注销
	public off(eventType){
		if(this.handler){
			this.handler.removeInputAction(Cesium.ScreenSpaceEventType[eventType]);
			this.handler.destroy()
		}
	}
	
	private computeFlight(start, source) {
		// 取样位置 相当于一个集合
		let property = new Cesium.SampledPositionProperty();
		for(let i=0; i<source.length; i++){
			let time = Cesium.JulianDate.addSeconds(start, source[i].time, new Cesium.JulianDate);
			let position = Cesium.Cartesian3.fromDegrees(source[i].longitude, source[i].latitude, source[i].height);
			// 添加位置，和时间对应
			property.addSample(time, position);
		}
		return property;
	}
	
	/*
	实体类的动画 flightData动画数组
	 */
	public animation(option: { flightData: [({ latitude: number; time: number; longitude: number; height: number } | { latitude: number; time: number; longitude: number; height: number })[]] }){
		// 起始时间
		let start = Cesium.JulianDate.fromDate(new Date());
        // 结束时间
		let stop = Cesium.JulianDate.addSeconds(start, 360, new Cesium.JulianDate());
		// 设置始时钟始时间
		this.viewer.clock.startTime = start.clone();
        // 设置时钟当前时间
		this.viewer.clock.currentTime = start.clone();
        // 设置始终停止时间
		this.viewer.clock.stopTime  = stop.clone();
        // 时间速率，数字越大时间过的越快
		this.viewer.clock.multiplier = 20;
        // 时间轴
		this.viewer.timeline.zoomTo(start,stop);
        // 循环执行,即为2，到达终止时间，重新从起点时间开始
		// CLAMPED：达到终止时间后停止
		// LOOP_STOP：达到终止时间后重新循环
		// UNBOUNDED：达到终止时间后继续读秒（默认）
		this.viewer.clock.clockRange = Cesium.ClockRange.CLAMPED;
		
		let availability = new Cesium.TimeIntervalCollection([new Cesium.TimeInterval({
			start : start,
			stop : stop
		})])
		
		for(let j=0; j<option.flightData.length; j++){
			
			let property = this.computeFlight(start, option.flightData[j]);
			
			for( let i = 0; i < this.entityModels.length; i++ ){
				
				if(this.viewer.entities.contains(this.entityModels[i])){
					this.entityModels[i].availability = availability
					this.entityModels[i].position = property
					this.entityModels[i].orientation = new Cesium.VelocityOrientationProperty(property)
					
					// this.entityModels[i].label = {
					// 	text: "测试文字label",
					// 	font: "25px sans-serif",
					// 	heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
					// 	horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
					// 	verticalOrigin: Cesium.VerticalOrigin.BASELINE,
					// 	fillColor: Cesium.Color.fromCssColorString("#ffff00"),
					// 	showBackground: true,
					// 	backgroundColor: new Cesium.Color(1, 1, 1, 1),
					// 	backgroundPadding: new Cesium.Cartesian2(8, 4),
					// 	disableDepthTestDistance: Number.POSITIVE_INFINITY, // draws the label in front of terrain
					// }
				}
			}
		}
	}
	
	// 暂停、播放
	public pause(){
		let viewModel = this.viewer.animation.viewModel;
		viewModel.pauseViewModel.command()
	}
	
	// 动画开始
	public start(){
		let viewModel = this.viewer.animation.viewModel;
		viewModel.playForwardViewModel.command()
	}
	
	// 动画回退
	public back(){
		let viewModel = this.viewer.animation.viewModel;
		viewModel.playReverseViewModel.command()
	}
	
	// 移除所有实体
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

export default BoxEntity
