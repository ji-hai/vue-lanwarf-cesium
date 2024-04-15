/**
 * @author <2661463169@qq.com> jh 23/06/01
 * @description 根据任意两点到线的垂直距离截取线
 * @param { Array } line 线
 * @param { start } line 开始点
 * @param { end } line 结束点
 * **/

import * as turf from '@turf/turf'

export const slicedLine = (option: {
	line: {
		type: [],
		required: true
	},
	start: {
		type: [],
		required: true
	},
	end: {
		type: [],
		required: true
	}
}) => {
	const { line, start, end } = option
	// 开始点
	// @ts-ignore
	const startPoint = turf.point(start)
	// 结束点
	//@ts-ignore
	const stopPoint = turf.point(end)
	// 线
	//@ts-ignore
	const lineString = turf.lineString(line)
	
	
	// 开始点到线的直线距离返回该线上的点
	//@ts-ignore
	const startSnapped = turf.nearestPointOnLine(lineString, startPoint, {units: 'miles'});
	//@ts-ignore
	const startSnappedPoint = turf.point(startSnapped.geometry.coordinates)
	// 结束点到线的直线距离返回该线上的点
	//@ts-ignore
	const stopSnapped = turf.nearestPointOnLine(lineString, stopPoint, {units: 'miles'});
	//@ts-ignore
	const stopSnappedPoint = turf.point(stopSnapped.geometry.coordinates)
	// 返回截取的点
	//@ts-ignore
	const sliced = turf.lineSlice(startSnappedPoint, stopSnappedPoint, lineString);
	
	return sliced
}
