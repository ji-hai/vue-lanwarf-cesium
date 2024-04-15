
import * as turf from '@turf/turf'

export const lineCrosses = (line_array1: [], line_array2:[]) => {
	let line1 = turf.lineString(line_array1);
	let line2 = turf.lineString(line_array2);
	let poly  = turf.polygon([line_array2]);
	let line = []
	let flagArr = []
	
	// 是否全部在多边形内
	for (let i = 0;i< line_array1.length; i++){
		let pt = turf.point(line_array1[i]);
		if(turf.booleanPointInPolygon(pt, poly)){
			flagArr.push({flag: true})
		}else {
			flagArr.push({flag: false})
		}
	}
	
	if(flagArr.findIndex(target => target.flag === true) === 0){
		let arr: { type: string; properties: {}; geometry: { coordinates: turf.helpers.Position; }; }[] = []
		line1.geometry.coordinates.forEach(item=>{
			arr.push({
				type: "Feature",
				properties: {},
				geometry: {
					coordinates: item
				}
			})
		})
		line.push(arr)
	}else {
		// 判断相交 返回相交点
		let intersects = turf.lineIntersect(line1, line2);


		if(intersects.features.length > 0){
			if(intersects.features.length % 2 === 0){
				for(let i=0;i<intersects.features.length;i+=2){
					line.push(intersects.features.slice(i,i+2));
				}
			}else {
				for(let i=0;i<intersects.features.length - 1;i+=2){
					line.push(intersects.features.slice(i,i+2));
				}

				let pt = turf.point(intersects.features[intersects.features.length - 1].geometry.coordinates);

				if(turf.booleanPointOnLine(pt, line2) || turf.booleanWithin(pt, line2)){
					line.push([intersects.features[intersects.features.length - 1], {
						type: "Feature",
						properties: {},
						geometry: {
							coordinates: line1.geometry.coordinates[line1.geometry.coordinates.length - 1]
						}
					}])
				}

			}
		}
	}
	
	return line
}

// 例子
// let line2 = lineCrosses(
// 	[[120,30],[121,31],[121,28],[120,30]],
// 	[[120,30],[121,31],[121,28],[120,30]],
// )
