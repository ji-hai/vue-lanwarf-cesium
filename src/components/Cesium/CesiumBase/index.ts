import { SkyBox,Cartesian3,PostProcessStage } from "cesium";

export class CesiumBase{
	// 天空盒
	static setOneSkyBox(){
	return new SkyBox(
		{
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
	static setTwoSkyBox () {
	return new SkyBox(
		{
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
	static setThreeSkyBox () {
	return new SkyBox(
		{
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
	static setDarkEffect(options){
		options = options || {}
		var fs =
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
			'}\n';
		return new PostProcessStage({
			name: 'darkEffect',
			fragmentShader: fs,
			uniforms: {
				scale: options.scale || 1.0,
				offset: options.offset || new Cartesian3(0.1, 0.2, 0.3)
			}
		});
	}
}

