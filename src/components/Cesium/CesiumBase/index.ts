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
  static setBlurBloom(options) {
    options = options || {}
    const fs =
      'uniform float height;\n' +
      'uniform float width;\n' +
      'uniform sampler2D colorTexture1;\n' +
      '\n' +
      'varying vec2 v_textureCoordinates;\n' +
      '\n' +
      'const int SAMPLES = 9;\n' +
      'void main()\n' +
      '{\n' +
      'vec2 st = v_textureCoordinates;\n' +
      'float wr = float(1.0 / width);\n' +
      'float hr = float(1.0 / height);\n' +
      'vec4 result = vec4(0.0);\n' +
      'int count = 0;\n' +
      'for(int i = -SAMPLES; i <= SAMPLES; ++i){\n' +
      'for(int j = -SAMPLES; j <= SAMPLES; ++j){\n' +
      'vec2 offset = vec2(float(i) * wr, float(j) * hr);\n' +
      'result += texture2D(colorTexture1, st + offset);\n' +
      '}\n' +
      '}\n' +
      'result = result / float(count);\n' +
      'gl_FragColor = result;\n' +
      '}\n'
    return new PostProcessStage({
      name: 'blur_x_direction',
      fragmentShader: fs,
      uniforms: {
        width: options.width,
        height: options.height,
        colorTexture1: 'Bright'
      }
    })
  }

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

//坐标转换 笛卡尔转84
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

//坐标数组转换 笛卡尔转84
const transformWGS84ArrayToCartesianArray = (WSG84Arr, alt) => {
  if (WSG84Arr) {
    return WSG84Arr
      ? WSG84Arr.map(function (item) {
          return transformCartesianToWGS84(item, alt)
        })
      : []
  }
}

//坐标转换 84转笛卡尔
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

//坐标数组转换 84转笛卡尔
const transformCartesianArrayToWGS84Array = (cartesianArr) => {
  if (cartesianArr) {
    return cartesianArr
      ? cartesianArr.map(function (item) {
          return transformCartesianToWGS84(item)
        })
      : []
  }
}

export {
  CesiumBase,
  transformCartesianToWGS84,
  transformWGS84ArrayToCartesianArray,
  transformWGS84ToCartesian,
  transformCartesianArrayToWGS84Array
}
