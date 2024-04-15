import {nextTick, ref, unref, markRaw} from "vue";

import { cesiumNavigation } from '@/components/Cesium/CesiumNavigation'
import { cesiumPolygon } from '@/components/Cesium/CesiumPolygon'
import { cesiumPolyline } from '@/components/Cesium/CesiumPolyline'
import {
	cesiumCluster
} from "@/components/Cesium/CesiumCluster";

// Map实例
const viewer = markRaw({
	map: null
})
export const useCesium = () => {
	
	const register = (map) => {
		viewer.map = map
	}
	
	const getMap = async () => {
		await nextTick()
		const map = viewer.map
		if (!map) {
			console.error('The mapRef is not registered. Please use the register method to register')
		}
		return map
	}
	
	const methods = {
		getMap: async ()=>{
			return viewer.map
		},
		cesiumNavigation: ()=>{
			cesiumNavigation(viewer.map)
		},
		/**
		 *
		 * @description 反选边界和添加边界
		 * @param source 数据源
		 * @param name  名称
		 */
		reverseCesiumBoundary: (source, name) => {
			let features = null
			let positionArray = [];
			let positionArray1 = [];
			source.features.forEach(item=>{
				if(item.properties.name === name){
					features = item
				}
			})
			
			// 获取区域的经纬度坐标
			for (let i = 0; i < features.geometry.coordinates[0][0].length; i++) {
				let coor = features.geometry.coordinates[0][0][i];
				positionArray1.push(coor)
				positionArray.push(coor[0]);
				positionArray.push(coor[1]);
			}
			// 遮罩
			cesiumPolygon(viewer.map, positionArray)
			// 边界
			cesiumPolyline(viewer.map, positionArray)
		},
		addCesiumCluster: (data) => {
			cesiumCluster(viewer.map, data)
		}
	}
	
	return {
		mapRegister: register,
		mapMethods: methods
	}
}
