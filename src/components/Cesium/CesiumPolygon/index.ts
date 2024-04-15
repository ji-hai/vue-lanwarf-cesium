import * as Cesium from 'cesium'

let polygonEntity
/**
 * @description: 添加图层数据进行反选图层
 * @param {*} viewer
 * @param {*} positionArray 图层数据
 * @return {*}
 */
export const cesiumPolygon = (viewer:any, positionArray: []) => {
	if(polygonEntity){
		viewer.entities.remove(polygonEntity);
	}
    polygonEntity = new Cesium.Entity({
        polygon: {
            // @ts-ignore
            hierarchy: {
                // 添加外部区域为1/4半圆，设置为180会报错
                positions: Cesium.Cartesian3.fromDegreesArray([0, 0, 0, 90, 179, 90, 179, 0]),
                // 中心挖空的“洞”
                holes: [{
                    positions: Cesium.Cartesian3.fromDegreesArray(positionArray)
                }]
            },
            material: Cesium.Color.fromCssColorString('rgb(2,26,79)')
        }
    })

    viewer.entities.add(polygonEntity);
}
