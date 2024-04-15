
/**
 * 气泡窗类
 * @class
 *
 */
import * as Cesium from "cesium";
import "./prompt.css"
import {AllowedComponentProps, ComponentCustomProps, ComponentOptionsMixin, ComputedOptions,
	createVNode,
	DefineComponent,
	ExtractPropTypes,
	MethodOptions,
	render,
	VNodeProps
} from "vue";

class Prompt {
	/**
	 * @param {Cesium.Viewer} viewer 地图viewer对象
	 * @param {Object} opt
	 * @param {Cesium.Cartesian3 | Array} [opt.position] 弹窗坐标 （type=2时生效）
	 * @param {Boolean} opt.show 是否显示
	 * @param {Function} [opt.success] 创建成功的回调函数
	 * @param {Number} [opt.type=1] 1~位置变化提示框 / 2~固定坐标提示框
	 * @param {Cesium.Cartesian3 | Array} opt.position 固定坐标提示框的坐标（ cartesian3 / [101,30] ），type为1时，可不设置此参数
	 * @param {Boolean} [opt.anchor=true] 是否显示锚点
	 * @param {Boolean} [opt.closeBtn=true] 是否显示关闭按钮
	 * @param {String} opt.className 自定义class
	 * @param {String} opt.content 弹窗内容
	 * @param {Function} [opt.close] 关闭弹窗时的回调函数
	 * @param {Object} [opt.offset] 偏移参数
	 * @param {Number} [opt.offset.x] 横坐标偏移像素单位
	 * @param {Number} [opt.offset.y] 纵坐标偏移像素单位
	 * @param {Object} [opt.style] 弹窗面板样式
	 * @param {String} [opt.style.background='white'] 背景色
	 * @param {String} [opt.style.boxShadow] 弹窗阴影（css属性）
	 * @param {String} [opt.style.color] 弹窗颜色
	 *
	 */
	constructor(viewer: any, opt: {
		type?: any,
		content?: any,
		close?: Function,
		position?: any
	}) {
		// @ts-ignore
		this.viewer = viewer;
		// @ts-ignore
		if (!this.viewer) return;
		// @ts-ignore
		this.type = "prompt";
		// 默认值
		opt = opt || {};
		const promptType = opt.type == undefined ? 1 : opt.type;
		let defaultOpt = {
			id: (new Date().getTime() + "" + Math.floor(Math.random() * 10000)),
			type: promptType,
			anchor: promptType == 2 ? true : false,
			closeBtn: promptType == 2 ? true : false,
			offset: promptType == 2 ? { x: 0, y: -20 } : { x: 10, y: 10 },
			content: "",
			props: "",
			show: true,
			style: {
				background: "rgba(0,0,0,0.5)",
				color: "white"
			}
		}
		// @ts-ignore
		this.opt = Object.assign(defaultOpt, opt);
		
		/**
		 * @property {Object} attr 相关属性
		 */
		// @ts-ignore
		this.attr = this.opt;
		// ====================== 创建弹窗内容 start ======================
		// @ts-ignore
		const mapid = this.viewer.container.id;
		
		/**
		 * @property {Boolearn} isShow 当前显示状态
		 */
		// @ts-ignore
		this.isShow = this.opt.show == undefined ? true : this.opt.show; // 是否显示
		let anchorHtml = ``;
		let closeHtml = ``;
		// @ts-ignore
		const background = this.opt.style.background;
		// @ts-ignore
		const color = this.opt.style.color;
		// @ts-ignore
		if (this.opt.anchor) {
			anchorHtml += `
            <div class="prompt-anchor-container">
                <div class="prompt-anchor" style="background:${background} !important;">
                </div>
            </div>
            `;
		}
		// @ts-ignore
		if (this.opt.closeBtn) { // 移动提示框 不显示关闭按钮
			// @ts-ignore
			closeHtml = `<a class="prompt-close" attr="${this.opt.id}" id="prompt-close-${this.opt.id}">x</a>`;
		}
		// @ts-ignore
		let boxShadow = this.opt.style.boxShadow;
		// @ts-ignore
		const promptId = "prompt-" + this.opt.id;
		// @ts-ignore
		const promptConenet = `<div class="prompt-content-container" style="background:${background} !important;color:${color} !important;box-shadow:${boxShadow} !important"><div class="prompt-content" id="prompt-content-${this.opt.id}"></div></div>
                <!-- 锚 -->
                ${anchorHtml}
                <!-- 关闭按钮 -->
                ${closeHtml}
        `;
		
		// 构建弹窗元素
		// @ts-ignore
		this.promptDiv = window.document.createElement("div");
		// @ts-ignore
		this.promptDiv.className = `easy3d-prompt ${this.opt.className}`;
		// @ts-ignore
		this.promptDiv.id = promptId;
		// @ts-ignore
		this.promptDiv.innerHTML = promptConenet;
		let mapDom = window.document.getElementById(mapid);
		// @ts-ignore
		mapDom.appendChild(this.promptDiv);
		// @ts-ignore
		const app = createVNode(this.opt.content, {data: this.opt.props})
		// @ts-ignore
		render(app, document.querySelector(`#prompt-content-${this.opt.id}`))
		// @ts-ignore
		const clsBtn = window.document.getElementById(`prompt-close-${this.opt.id}`);
		let that = this;
		if (clsBtn) {
			clsBtn.addEventListener("click", (e) => {
				that.hide();
				// @ts-ignore
				if (that.opt.close) that.opt.close();
			})
		}
		
		/**
		 * @property {Object} promptDom 弹窗div
		 */
		// @ts-ignore
		this.promptDom = window.document.getElementById(promptId);
		// @ts-ignore
		this.position = this.transPosition(this.opt.position);
		// ====================== 创建弹窗内容 end ======================
		
		if (promptType == 2) this.bindRender(); // 固定位置弹窗 绑定实时渲染 当到地球背面时 隐藏
		// @ts-ignore
		if (this.opt.show == false) this.hide();
		// @ts-ignore
		this.containerW = this.viewer.container.offsetWidth;
		// @ts-ignore
		this.containerH = this.viewer.container.offsetHeight;
		// @ts-ignore
		this.containerLeft = this.viewer.container.offsetLeft;
		// @ts-ignore
		this.containerTop = this.viewer.container.offsetTop;
		
		/**
		 * @property {Number} contentW 弹窗宽度
		 */
		// @ts-ignore
		this.contentW = Math.ceil(Number(this.promptDom.offsetWidth)); // 宽度
		
		/**
		 * @property {Number} contentH 弹窗高度
		 */
		// @ts-ignore
		this.contentH = this.promptDom.offsetHeight; // 高度
		// @ts-ignore
		if (this.opt.success) this.opt.success();
	}
	
	/**
	 * 销毁
	 */
	destroy() {
		// @ts-ignore
		if (this.promptDiv) {
			// @ts-ignore
			window.document.getElementById(this.viewer.container.id).removeChild(this.promptDiv);
			// @ts-ignore
			this.promptDiv = null;
		}
		// @ts-ignore
		if (this.rendHandler) {
			// @ts-ignore
			this.rendHandler();
			// @ts-ignore
			this.rendHandler = null;
		}
	}
	// 实时监听
	bindRender() {
		let that = this;
		// @ts-ignore
		this.rendHandler = this.viewer.scene.postRender.addEventListener(function () {
			// @ts-ignore
			if (!that.isShow && that.promptDom) {
				// @ts-ignore
				that.promptDom.style.display = "none";
				return;
			}
			// @ts-ignore
			if (!that.position) return;
			// @ts-ignore
			if (that.position instanceof Cesium.Cartesian3) {
				// @ts-ignore
				let px = Cesium.SceneTransforms.wgs84ToWindowCoordinates(that.viewer.scene, that.position);
				if (!px) return;
				// @ts-ignore
				const occluder = new Cesium.EllipsoidalOccluder(that.viewer.scene.globe.ellipsoid, that.viewer.scene.camera.position);
				// 当前点位是否可见 是否在地球背面
				// @ts-ignore
				const res = occluder.isPointVisible(that.position);
				if (res) {
					// @ts-ignore
					if (that.promptDom) that.promptDom.style.display = "block";
				} else {
					// @ts-ignore
					if (that.promptDom) that.promptDom.style.display = "none";
				}
				that.setByPX({
					x: px.x,
					y: px.y
				});
			} else {
				that.setByPX({
					// @ts-ignore
					x: that.position.x,
					// @ts-ignore
					y: that.position.y
				});
			}
			
		}, this);
	}
	
	/**
	 *
	 * @param {Cesium.Cartesian3 | Object} px 弹窗坐标
	 * @param {String} html 弹窗内容
	 */
	update(px: Cesium.Cartesian3 | Cesium.Cartesian2, html: any) {
		if (px instanceof Cesium.Cartesian3) {
			// @ts-ignore
			this.position = px.clone();
			// @ts-ignore
			px = Cesium.SceneTransforms.wgs84ToWindowCoordinates(this.viewer.scene, px);
		}
		// @ts-ignore
		this.contentW = Math.ceil(Number(this.promptDom.offsetWidth)); // 宽度
		// @ts-ignore
		this.contentH = this.promptDom.offsetHeight; // 高度
		if (px) this.setByPX(px);
		if (html) this.setContent(html);
	}
	
	// 判断是否在当前视野内
	isInView() {
		// @ts-ignore
		if (!this.position) return false;
		let px = null;
		// @ts-ignore
		if (this.position instanceof Cesium.Cartesian2) {
			// @ts-ignore
			px = this.position;
		} else {
			// @ts-ignore
			px = Cesium.SceneTransforms.wgs84ToWindowCoordinates(this.viewer.scene, this.position);
		}
		// @ts-ignore
		const occluder = new Cesium.EllipsoidalOccluder(this.viewer.scene.globe.ellipsoid, this.viewer.scene.camera.position);
		// 是否在地球背面
		// @ts-ignore
		const res = occluder.isPointVisible(this.position);
		let isin = false;
		if (!px) return isin;
		if (
			// @ts-ignore
			px.x > this.containerLeft &&
			// @ts-ignore
			px.x < (this.containerLeft + this.containerW) &&
			// @ts-ignore
			px.y > this.containerTop &&
			// @ts-ignore
			px.y < (this.containerTop + this.containerH)
		) {
			isin = true;
		}
		return res && isin;
	}
	
	/**
	 * 是否可见
	 * @param {Boolean} isShow true可见，false不可见
	 */
	setVisible(isShow: boolean) {
		// @ts-ignore
		let isin = this.isInView(this.position);
		if (isin && isShow) {
			// @ts-ignore
			this.isShow = true;
			// @ts-ignore
			if (this.promptDom) this.promptDom.style.display = "block";
		} else {
			// @ts-ignore
			this.isShow = false;
			// @ts-ignore
			if (this.promptDom) this.promptDom.style.display = "none";
		}
	}
	
	/**
	 * 显示
	 */
	show() {
		this.setVisible(true);
	}
	
	/**
	 * 隐藏
	 */
	hide() {
		this.setVisible(false);
	}
	
	/**
	 * 设置弹窗内容
	 * @param {String} content 内容
	 */
	// @ts-ignore
	setContent(content) {
		// @ts-ignore
		let pc = window.document.getElementById(`prompt-content-${this.opt.id}`);
		// @ts-ignore
		pc.innerHTML = content;
		// @ts-ignore
		const app = createVNode(content, {data: this.opt.props})
		// @ts-ignore
		render(app, document.querySelector(`#prompt-content-${this.opt.id}`))
	}
	
	/**
	 * 设置弹窗坐标
	 * @param {Object} opt 屏幕坐标
	 */
	// @ts-ignore
	setByPX(opt) {
		if (!opt) return;
		// @ts-ignore
		if (this.promptDom) {
			// @ts-ignore
			const contentW = this.promptDom.offsetWidth; // 宽度
			// @ts-ignore
			const contentH = this.promptDom.offsetHeight; // 高度
			// @ts-ignore
			if (this.opt.type == 1) {
				// @ts-ignore
				this.promptDom.style.left = ((Number(opt.x) + Number(this.opt.offset.x || 0))) + "px";
				// @ts-ignore
				this.promptDom.style.top = ((Number(opt.y) + Number(this.opt.offset.y || 0))) + "px";
			} else {
				// @ts-ignore
				this.promptDom.style.left = ((Number(opt.x) + Number(this.opt.offset.x || 0)) - Number(this.contentW) / 2) + "px";
				// @ts-ignore
				this.promptDom.style.top = ((Number(opt.y) + Number(this.opt.offset.y || 0)) - Number(this.contentH)) + "px";
			}
		}
	}
	
	// 坐标转换
	// @ts-ignore
	transPosition(p) {
		let position;
		if (Array.isArray(p)) {
			const posi = Cesium.Cartesian3.fromDegrees(p[0], p[1], p[2] || 0);
			position = posi.clone();
		} else if (p instanceof Cesium.Cartesian3) {
			position = p.clone();
		} else { // 像素类型
			position = p;
		}
		return position;
	}
}

export default Prompt;
