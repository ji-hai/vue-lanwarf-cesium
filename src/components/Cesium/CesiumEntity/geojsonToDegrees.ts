import * as Cesium from "cesium";
const geojsonToDegrees = (geojson) => {
	let arr = []
	if(geojson){
		geojson.features.forEach(item=>{
			let trArr = []
			if(item.geometry.type === 'Point'){
				trArr.push(
					Cesium.Cartesian3.fromDegrees(...item.geometry.coordinates)
				)
			}else if(item.geometry.type === 'Polygon'){
				item.geometry.coordinates[0].forEach(item1=>{
					trArr.push(
						Cesium.Cartesian3.fromDegrees(...item1)
					)
				})
			} else if(item.geometry.type === 'LineString'){
				item.geometry.coordinates.forEach(item1=>{
					trArr.push(
						Cesium.Cartesian3.fromDegrees(...item1)
					)
				})
			}
			
			arr.push(trArr)
			
		})
	}
	
	return arr
}

export default geojsonToDegrees
