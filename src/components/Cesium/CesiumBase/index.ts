import { SkyBox, Cartesian3, PostProcessStage, Cartesian4, Color } from 'cesium'
import * as Cesium from 'cesium'

class CesiumBase {
  // 天空盒
  static setOneSkyBox() {
    return new SkyBox({
      sources: {
        positiveX: 'src/assets/SkyBox/00h+00.jpg',
        negativeX: 'src/assets/SkyBox/12h+00.jpg',
        positiveY: 'src/assets/SkyBox/06h+00.jpg',
        negativeY: 'src/assets/SkyBox/18h+00.jpg',
        positiveZ: 'src/assets/SkyBox/06h+90.jpg',
        negativeZ: 'src/assets/SkyBox/06h-90.jpg'
      }
    })
  }

  // 天空盒2
  static setTwoSkyBox() {
    return new SkyBox({
      sources: {
        positiveX: 'src/assets/SkyBox/Version2_dark_px.jpg',
        negativeX: 'src/assets/SkyBox/Version2_dark_mx.jpg',
        positiveY: 'src/assets/SkyBox/Version2_dark_py.jpg',
        negativeY: 'src/assets/SkyBox/Version2_dark_my.jpg',
        positiveZ: 'src/assets/SkyBox/Version2_dark_pz.jpg',
        negativeZ: 'src/assets/SkyBox/Version2_dark_mz.jpg'
      }
    })
  }

  // 天空盒3
  static setThreeSkyBox() {
    return new SkyBox({
      sources: {
        positiveX: 'src/assets/SkyBox/tycho2t3_80_pxs.jpg',
        negativeX: 'src/assets/SkyBox/tycho2t3_80_mxs.jpg',
        positiveY: 'src/assets/SkyBox/tycho2t3_80_pys.jpg',
        negativeY: 'src/assets/SkyBox/tycho2t3_80_mys.jpg',
        positiveZ: 'src/assets/SkyBox/tycho2t3_80_pzs.jpg',
        negativeZ: 'src/assets/SkyBox/tycho2t3_80_mzs.jpg'
      }
    })
  }

  //黑夜特效
  static setDarkEffect(options) {
    options = options || {}
    const fs =
      'uniform sampler2D colorTexture;\n' +
      'varying vec2 v_textureCoordinates;\n' +
      'uniform float scale;\n' +
      'uniform vec3 offset;\n' +
      'void main() {\n' +
      ' // vec4 color = texture2D(colorTexture, v_textureCoordinates);\n' +
      ' vec4 color = texture2D(colorTexture, v_textureCoordinates);\n' +
      ' // float gray = 0.2989*color.r+0.5870*color.g+0.1140*color.b;\n' +
      ' // gl_FragColor = vec4(gray,gray,2.0*(gray+1.0), 1.0);\n' +
      ' gl_FragColor = vec4(color.r*0.2,color.g * 0.4,color.b*0.6, 1.0);\n' +
      '}\n'
    return new PostProcessStage({
      name: 'darkEffect',
      fragmentShader: fs,
      uniforms: {
        scale: options.scale || 1.0,
        offset: options.offset || new Cartesian3(0.1, 0.2, 0.3)
      }
    })
  }

  //场景蓝光
  //  colorTexture1 不支持
  // static setBlurBloom(options) {
  //   options = options || {}
  //   const fs =
  //     'uniform float height;\n' +
  //     'uniform float width;\n' +
  //     'uniform sampler2D colorTexture;\n' +
  //     '\n' +
  //     'varying vec2 v_textureCoordinates;\n' +
  //     '\n' +
  //     'const int SAMPLES = 9;\n' +
  //     'void main()\n' +
  //     '{\n' +
  //     'vec2 st = v_textureCoordinates;\n' +
  //     'float wr = float(1.0 / width);\n' +
  //     'float hr = float(1.0 / height);\n' +
  //     'vec4 result = vec4(0.0);\n' +
  //     'int count = 0;\n' +
  //     'for(int i = -SAMPLES; i <= SAMPLES; ++i){\n' +
  //     'for(int j = -SAMPLES; j <= SAMPLES; ++j){\n' +
  //     'vec2 offset = vec2(float(i) * wr, float(j) * hr);\n' +
  //     'result += texture2D(colorTexture, st + offset);\n' +
  //     '}\n' +
  //     '}\n' +
  //     'result = result / float(count);\n' +
  //     'gl_FragColor = result;\n' +
  //     '}\n'
  //   return new PostProcessStage({
  //     name: 'blur_x_direction',
  //     fragmentShader: fs,
  //     uniforms: {
  //       width: options.width,
  //       height: options.height,
  //       colorTexture: 'Bright'
  //     }
  //   })
  // }

  //雨天特效
  static setRainEffect() {
    const fs =
      'uniform sampler2D colorTexture;\n\
                varying vec2 v_textureCoordinates;\n\
                \n\
                float hash(float x){\n\
                return fract(sin(x*23.3)*13.13);\n\
                }\n\
                \n\
                void main(){\n\
                    float time = czm_frameNumber / 60.0;\n\
                    vec2 resolution = czm_viewport.zw;\n\
                    vec2 uv=(gl_FragCoord.xy*2.-resolution.xy)/min(resolution.x,resolution.y);\n\
                    vec3 c=vec3(.6,.7,.8);\n\
                    float a=-.4;\n\
                    float si=sin(a),co=cos(a);\n\
                    uv*=mat2(co,-si,si,co);\n\
                    uv*=length(uv+vec2(0,4.9))*.3+1.;\n\
                    float v=1.-sin(hash(floor(uv.x*100.))*2.);\n\
                    float b=clamp(abs(sin(20.*time*v+uv.y*(5./(2.+v))))-.95,0.,1.)*20.;\n\
                    c*=v*b;\n\
                    gl_FragColor = mix(texture2D(colorTexture, v_textureCoordinates), vec4(c, 1), 0.2);\n\
                }\n\
                '
    return new PostProcessStage({
      name: 'rainEffect',
      fragmentShader: fs
    })
  }

  //雪天特效
  static setSnowEffect() {
    const fs =
      'uniform sampler2D colorTexture;\n\
    varying vec2 v_textureCoordinates;\n\
    \n\
    float snow(vec2 uv,float scale){\n\
        float time = czm_frameNumber / 60.0;\n\
        float w=smoothstep(1.,0.,-uv.y*(scale/10.));\n\
        if(w<.1)return 0.;\n\
        uv+=time/scale;\n\
        uv.y+=time*2./scale;\n\
        uv.x+=sin(uv.y+time*.5)/scale;\n\
        uv*=scale;\n\
        vec2 s=floor(uv),f=fract(uv),p;\n\
        float k=3.,d;\n\
        p=.5+.35*sin(11.*fract(sin((s+p+scale)*mat2(7,3,6,5))*5.))-f;\n\
        d=length(p);\n\
        k=min(d,k);\n\
        k=smoothstep(0.,k,sin(f.x+f.y)*0.01);\n\
        return k*w;\n\
    }\n\
    \n\
    void main(){\n\
        vec2 resolution = czm_viewport.zw;\n\
        vec2 uv=(gl_FragCoord.xy*2.-resolution.xy)/min(resolution.x,resolution.y);\n\
        vec3 finalColor=vec3(0);\n\
        float c = 0.0;\n\
        c+=snow(uv,30.)*.0;\n\
        c+=snow(uv,20.)*.0;\n\
        c+=snow(uv,15.)*.0;\n\
        c+=snow(uv,10.);\n\
        c+=snow(uv,8.);\n\
        c+=snow(uv,6.);\n\
        c+=snow(uv,5.);\n\
        finalColor=(vec3(c));\n\
        gl_FragColor = mix(texture2D(colorTexture, v_textureCoordinates), vec4(finalColor,1), 0.3);\n\
        \n\
    }\n\
    '
    return new PostProcessStage({
      name: 'snowEffect',
      fragmentShader: fs
    })
  }

  // 雾天特效
  static setFogEffect() {
    const fs =
      'float getDistance(sampler2D depthTexture, vec2 texCoords) \n' +
      '{ \n' +
      '    float depth = czm_unpackDepth(texture2D(depthTexture, texCoords)); \n' +
      '    if (depth == 0.0) { \n' +
      '        return czm_infinity; \n' +
      '    } \n' +
      '    vec4 eyeCoordinate = czm_windowToEyeCoordinates(gl_FragCoord.xy, depth); \n' +
      '    return -eyeCoordinate.z / eyeCoordinate.w; \n' +
      '} \n' +
      'float interpolateByDistance(vec4 nearFarScalar, float distance) \n' +
      '{ \n' +
      '    float startDistance = nearFarScalar.x; \n' +
      '    float startValue = nearFarScalar.y; \n' +
      '    float endDistance = nearFarScalar.z; \n' +
      '    float endValue = nearFarScalar.w; \n' +
      '    float t = clamp((distance - startDistance) / (endDistance - startDistance), 0.0, 1.0); \n' +
      '    return mix(startValue, endValue, t); \n' +
      '} \n' +
      'vec4 alphaBlend(vec4 sourceColor, vec4 destinationColor) \n' +
      '{ \n' +
      '    return sourceColor * vec4(sourceColor.aaa, 1.0) + destinationColor * (1.0 - sourceColor.a); \n' +
      '} \n' +
      'uniform sampler2D colorTexture; \n' +
      'uniform sampler2D depthTexture; \n' +
      'uniform vec4 fogByDistance; \n' +
      'uniform vec4 fogColor; \n' +
      'varying vec2 v_textureCoordinates; \n' +
      'void main(void) \n' +
      '{ \n' +
      '    float distance = getDistance(depthTexture, v_textureCoordinates); \n' +
      '    vec4 sceneColor = texture2D(colorTexture, v_textureCoordinates); \n' +
      '    float blendAmount = interpolateByDistance(fogByDistance, distance); \n' +
      '    vec4 finalFogColor = vec4(fogColor.rgb, fogColor.a * blendAmount); \n' +
      '    gl_FragColor = alphaBlend(finalFogColor, sceneColor); \n' +
      '} \n'
    return new PostProcessStage({
      name: 'fogEffect',
      fragmentShader: fs,
      uniforms: {
        fogByDistance: new Cartesian4(10, 0.0, 200, 1.0),
        fogColor: new Color(0.8, 0.8, 0.8, 0.5)
      }
    })
  }
}

/***
 * 坐标转换 笛卡尔转84
 *
 * @param {Object} Cartesian3 三维位置坐标
 *
 * @return {Object} {lng,lat,alt} 地理坐标
 */
const transformCartesianToWGS84 = (cartesian) => {
  if (cartesian) {
    const ellipsoid = Cesium.Ellipsoid.WGS84
    const cartographic = ellipsoid.cartesianToCartographic(cartesian)
    return {
      lng: Cesium.Math.toDegrees(cartographic.longitude),
      lat: Cesium.Math.toDegrees(cartographic.latitude),
      alt: cartographic.height
    }
  }
}

/***
 * 坐标数组转换 笛卡尔转84
 *
 * @param {Array} WSG84Arr {lng,lat,alt} 地理坐标数组
 * @param {Number} alt 拔高
 * @return {Array} Cartesian3 三维位置坐标数组
 */
const transformWGS84ArrayToCartesianArray = (WSG84Arr, alt) => {
  if (WSG84Arr) {
    return WSG84Arr
      ? WSG84Arr.map(function (item) {
          return transformWGS84ToCartesian(item, alt)
        })
      : []
  }
}

/***
 * 坐标转换 84转笛卡尔
 *
 * @param {Object} {lng,lat,alt} 地理坐标
 *
 * @return {Object} Cartesian3 三维位置坐标
 */
const transformWGS84ToCartesian = (position, alt) => {
  return position
    ? Cesium.Cartesian3.fromDegrees(
        position.lng || position.lon,
        position.lat,
        (position.alt = alt || position.alt),
        Cesium.Ellipsoid.WGS84
      )
    : Cesium.Cartesian3.ZERO
}

/***
 * 坐标数组转换 笛卡尔转84
 *
 * @param {Array} cartesianArr 三维位置坐标数组
 *
 * @return {Array} {lng,lat,alt} 地理坐标数组
 */
const transformCartesianArrayToWGS84Array = (cartesianArr) => {
  if (cartesianArr) {
    return cartesianArr
      ? cartesianArr.map(function (item) {
          return transformCartesianToWGS84(item)
        })
      : []
  }
}

/**
 * 84坐标转制图坐标
 * @param {Object} position {lng,lat,alt} 地理坐标
 * @return {Object} Cartesian3 三维位置坐标
 */
const transformWGS84ToCartographic = (position) => {
  return position
    ? Cesium.Cartographic.fromDegrees(position.lng || position.lon, position.lat, position.alt)
    : Cesium.Cartographic.ZERO
}

/**
 * 拾取位置点
 * @param {Object} viewer
 * @return {Object} px Cartesian3 三维位置坐标
 */
const getCatesian3FromPX = (viewer, px) => {
  if (viewer && px) {
    // var picks = viewer.scene.drillPick(px); // 3dtilset
    // for (var i = 0; i < picks.length; i++) {
    //     if (picks[i] instanceof Cesium.Cesium3DTileFeature) { //模型上拾取
    //         isOn3dtiles = true;
    //     }
    // }
    const picks = viewer.scene.pick(px)
    let cartesian = null
    let isOn3dtiles = false,
      isOnTerrain = false
    if (picks instanceof Cesium.Cesium3DTileFeature) {
      //模型上拾取
      isOn3dtiles = true
    }
    // 3dtilset
    if (isOn3dtiles) {
      cartesian = viewer.scene.pickPosition(px)
      if (cartesian) {
        const cartographic = Cesium.Cartographic.fromCartesian(cartesian)
        if (cartographic.height < 0) cartographic.height = 0
        const lon = Cesium.Math.toDegrees(cartographic.longitude),
          lat = Cesium.Math.toDegrees(cartographic.latitude),
          height = cartographic.height //模型高度
        cartesian = transformWGS84ToCartesian({ lng: lon, lat: lat, alt: height })
      }
    }
    // 地形
    if (!picks && (!viewer.terrainProvide) instanceof Cesium.EllipsoidTerrainProvider) {
      const ray = viewer.scene.camera.getPickRay(px)
      if (!ray) return null
      cartesian = viewer.scene.globe.pick(ray, viewer.scene)
      isOnTerrain = true
    }
    // 地球
    if (!isOn3dtiles && !isOnTerrain) {
      cartesian = viewer.scene.camera.pickEllipsoid(px, viewer.scene.globe.ellipsoid)
    }
    if (cartesian) {
      const position = transformCartesianToWGS84(cartesian)
      if (position.alt < 0) {
        cartesian = transformWGS84ToCartesian(position, 0.1)
      }
      return cartesian
    }
    return false
  }
}

/**
 * 获取84坐标的距离
 * @param {*} positions
 */
const getPositionDistance = (positions) => {
  let distance = 0
  for (let i = 0; i < positions.length - 1; i++) {
    const point1cartographic = transformWGS84ToCartographic(positions[i])
    const point2cartographic = transformWGS84ToCartographic(positions[i + 1])
    const geodesic = new Cesium.EllipsoidGeodesic()
    geodesic.setEndPoints(point1cartographic, point2cartographic)
    let s = geodesic.surfaceDistance
    s = Math.sqrt(
      Math.pow(s, 2) + Math.pow(point2cartographic.height - point1cartographic.height, 2)
    )
    distance = distance + s
  }
  return distance.toFixed(3)
}

/**
 * 计算一组坐标组成的面的面积
 * @param {*} positions
 */
const getPositionsArea = (positions) => {
  let result = 0
  if (positions) {
    let h = 0
    const ellipsoid = Cesium.Ellipsoid.WGS84
    positions.push(positions[0])
    for (let i = 1; i < positions.length; i++) {
      const oel = ellipsoid.cartographicToCartesian(transformWGS84ToCartographic(positions[i - 1]))
      const el = ellipsoid.cartographicToCartesian(transformWGS84ToCartographic(positions[i]))
      h += oel.x * el.y - el.x * oel.y
    }
    result = Math.abs(h).toFixed(2)
  }
  return result
}

/***
 * @description: 地球自转
 */
class GlobeRotate {
  constructor(viewer) {
    this._viewer = viewer
  }

  // 根据国际天体参考系计算旋转矩阵
  _icrf() {
    if (this._viewer.scene.mode !== Cesium.SceneMode.SCENE3D) {
      return ture
    }
    const icrfToFixed = Cesium.Transforms.computeIcrfToFixedMatrix(this._viewer.clock.currentTime)
    if (icrfToFixed) {
      const camera = this._viewer.camera
      const offset = Cesium.Cartesian3.clone(camera.position)
      const transform = Cesium.Matrix4.fromRotationTranslation(icrfToFixed)
      // 偏移相机，否则会场景旋转而地球不转
      camera.lookAtTransform(transform, offset)
    }
  }

  // 绑定事件
  _bindEvent() {
    // 转动的速度设置
    this._viewer.clock.multiplier = 15 * 1000
    // 初始化为单位矩阵
    this._viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY)
    this._viewer.scene.postUpdate.addEventListener(this._icrf, this)
  }

  // 解除绑定
  _unbindEvent() {
    this._viewer.clock.multiplier = 1
    this._viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY)
    this._viewer.scene.postUpdate.removeEventListener(this._icrf, this)
  }

  // 开始旋转
  start() {
    this._viewer.clock.shouldAnimate = true
    this._unbindEvent()
    this._bindEvent()
    return this
  }

  // 停止旋转
  stop() {
    this._unbindEvent()
    return this
  }
}

export {
  CesiumBase,
  GlobeRotate,
  getCatesian3FromPX,
  getPositionDistance,
  getPositionsArea,
  transformCartesianToWGS84,
  transformWGS84ArrayToCartesianArray,
  transformWGS84ToCartesian,
  transformCartesianArrayToWGS84Array
}
