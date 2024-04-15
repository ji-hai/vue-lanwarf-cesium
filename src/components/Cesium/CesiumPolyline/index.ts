import * as Cesium from 'cesium'

let lineEntity
/**
 * @description: 添加图层数据进行图层--线绘制
 * @param {any} viewer
 * @param {*} positionArray 线数据
 * @param {Boolean} flyTo 是否聚焦到线图层
 * @return {*}
 */
export const cesiumPolyline = (viewer:any, positionArray: [], flyTo: Boolean = true) => {
    // 边界线
	if(lineEntity){
		viewer.entities.remove(lineEntity)
	}
    lineEntity = new Cesium.Entity({
        polyline: {
            positions: Cesium.Cartesian3.fromDegreesArray(positionArray),
            width: 8,
            material: Cesium.Color.fromCssColorString('#39E09B'),
        }
    })

    viewer.entities.add(lineEntity);

    if(flyTo){
        viewer.flyTo(lineEntity);
    }
}
