/**
 * @description cesium属性
 * @author jihai
 * @time 23/4/11
 *
 * */
export const cesiumProps = {
	tiandituTk: {
		type: String,
		required: true
	},
	config: {
		type: Object,
		default: ()=>{}
	},
	cesiumLoadCB: {
		type: Function,
		default: ()=> {
		}
	}
}
