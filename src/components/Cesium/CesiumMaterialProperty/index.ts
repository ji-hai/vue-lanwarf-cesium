/**
 * 自定义材质
 * @class CircleRippleMaterialProperty
 * @classdesc 圆形扫描以及圆形扩散的类对象
 * @use
 *      material: new CircleRippleMaterialProperty({
 *       color: new Cesium.Color(1, 1, 0, 0.7),
 *       speed: 12.0,
 *       count: 2,
 *       gradient: 0.2,
 *     }),
 */
import CircleRippleMaterialProperty from './CircleRippleMaterialProperty'

/**
 * 自定义材质
 * @class LaserPolylineTrailLinkMaterialProperty
 * @classdesc 自定义图片
 * @use
 *      material: new LaserPolylineTrailLinkMaterialProperty(2000, Cesium.Color.RED, image)
 */
import TrailLinkMaterialProperty from './TrailLinkMaterialProperty'

/**
 * 自定义材质
 * @class PolylineTrailLinkMaterialProperty
 * @classdesc
 * @use
 *      material: new LaserPolylineTrailLinkMaterialProperty(2000, Cesium.Color.RED, new Cesium.Cartesian2(2.0,1.0))
 */
import PolylineTrailLinkMaterialProperty from './PolylineTrailLinkMaterialProperty'

import LaserPolylineTrailLinkMaterialProperty from './LaserPolylineTrailLinkMaterialProperty'

import CustomMaterialLine from "./CustomMaterialLine";

import WaveCircleMaterial from "./WaveCircleMaterial";


export {
	CircleRippleMaterialProperty,
	TrailLinkMaterialProperty ,
	PolylineTrailLinkMaterialProperty,
	LaserPolylineTrailLinkMaterialProperty,
	CustomMaterialLine,
	WaveCircleMaterial
}
