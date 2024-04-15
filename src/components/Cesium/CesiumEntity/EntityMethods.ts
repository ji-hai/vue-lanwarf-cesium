import Prompt from "../CesiumPrompt";
import test from "@/components/Cesium/CesiumEventHandler/CesiumPopup/test.vue";
import * as Cesium from "cesium";

class EntityMethods{
	declare prompt:any
	constructor() {
		this.prompt = null
	}
	
	addPopup(option:{
		viewer: any,
		position: any,
		props: {}
	}){
		this.removePopUp()
		this.prompt = new Prompt(option.viewer,{
			type: 2,
			content: test,
			props: option.props,
			position: option.position, // 支持多种形式传参 cartesian3 || array || object
			style: {
				// background: 'red'
			},
			close: function () {
				return false
			} // 点击关闭按钮的回调函数
		});
	}
	
	animation(option: { flightData: [({ latitude: number; time: number; longitude: number; height: number } | { latitude: number; time: number; longitude: number; height: number })[]] }){
		option.viewer.scene.postRender.addEventListener(()=>{
		
		})
		// scene.postRender.addEventListener(function () {
		// 	const position = positionProperty.getValue(clock.currentTime);
		// 	entity.position = scene.clampToHeight(position, objectsToExclude);
		// });
	}
	
	removePopUp(){
		if(this.prompt){
			this.prompt.destroy()
		}
	}
}

export default EntityMethods
