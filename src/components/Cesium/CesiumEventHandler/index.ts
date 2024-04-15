import * as Cesium from "cesium";
import {createVNode, render} from "vue";
import Prompt from "../CesiumPrompt";

// @ts-ignore
import test from './CesiumPopup/test.vue'

let handler: Cesium.ScreenSpaceEventHandler
let prompt1: Prompt

const setEventHandler = (options: { viewer: any}) => {
	if(!handler){
		handler = new Cesium.ScreenSpaceEventHandler(options.viewer.scene.canvas);
		handler.setInputAction(function(click: { position: any; }) {
			let pickedObject = options.viewer.scene.pick(click.position);
			
			// 屏幕坐标转世界坐标——关键点
			let ellipsoid = options.viewer.scene.globe.ellipsoid;
			let cartesian = options.viewer.camera.pickEllipsoid(click.position, ellipsoid);
			
			if (cartesian) {     //判断点击的是否是地球
				//将笛卡尔坐标转换为地理坐标
				const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
				//将弧度转为度的十进制度表示
				const lon = Cesium.Math.toDegrees(cartographic.longitude);
				const lat = Cesium.Math.toDegrees(cartographic.latitude);
				const click_point = {longitude: lon, latitude: lat};
				
				if (Cesium.defined(pickedObject)) {
					// if(pickedObject.id._id === options.id._id){
					// 	callBack(click_point)
					// }
					// @ts-ignore
					// if(prompt1){
					// 	prompt1.hide()
					// }
					// prompt1 = new Prompt(options.viewer, {
					// 	type: 2,
					// 	content: test,
					// 	props: '111',
					// 	position: [click_point.longitude, click_point.latitude, 0], // 支持多种形式传参 cartesian3 || array || object
					// 	close: function () {
					// 		return false
					// 	} // 点击关闭按钮的回调函数
					// });
					
				}
			}
			
			
		}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
	}
	
}

const removeEventHandler = () => {
	if(handler){
		handler?.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK)
	}
}

export { setEventHandler, removeEventHandler }
