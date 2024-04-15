interface cesiumAlarmPointType {
    longitude: number,
    latitude: number,
    height: number
}
interface cesiumAlarmCircleType {
    longitude: number,
    latitude: number,
    height: number
}
/**
 * @description: 报警区域闪烁（圆）
 * @param {*} position { longitude, latitude, height }
 * @param {*} id entity id
 * @return {*}
 */

import * as Cesium from 'cesium'
export const cesiumAlarmCircle = (viewer:any, id:string, position:cesiumAlarmCircleType, axis: number) => {
    let x=1;
    let flog = true;
    viewer.entities.add({
        id: id,
        position:Cesium.Cartesian3.fromDegrees(position.longitude, position.latitude, position.height ),
        ellipse : {
            semiMinorAxis : axis,
            semiMajorAxis : axis,
            height : 0,
            material:new Cesium.ColorMaterialProperty(new Cesium.CallbackProperty(function () {
                if(flog){
                    x=x-0.05;
                    if(x<=0){
                        flog=false;
                    }
                }else{
                    x=x+0.05;
                    if(x>=1){
                        flog=true;
                    }
                }
                return Cesium.Color.RED.withAlpha(x);
            },false))
        }
    });
}

/**
 * @description: 报警点位闪烁
 * @param {*} position { longitude, latitude, height }
 * @param {*} id entity id
 * @return {*}
 */
export const cesiumAlarmPoint = (viewer:any, id:string, position:cesiumAlarmPointType)=>{
    let x = 1;
    let flog = true;
    viewer.entities.add({
        id: id,
        position:Cesium.Cartesian3.fromDegrees(position.longitude, position.latitude, position.height),
        point : {
            show : true, // default
            color :new Cesium.CallbackProperty(function () {
                if(flog){
                    x=x-0.05;
                    if(x<=0){
                        flog=false;
                    }
                }else{
                    x=x+0.05;
                    if(x>=1){
                        flog=true;
                    }
                }
                return Cesium.Color.RED.withAlpha(x);
            },false),
            pixelSize : 10, // default: 1
            outlineWidth :0
        }
    });
}

