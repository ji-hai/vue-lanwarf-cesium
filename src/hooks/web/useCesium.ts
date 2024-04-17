import {nextTick, markRaw} from "vue";

// Map实例
const state = markRaw({
	map: ''
})
export const useCesium = () => {
	
	const register = (map) => {
		state.map = map
	}
	
	const getMap = async () => {
		await nextTick()
		if (!state.map) {
			console.error('The mapRef is not registered. Please use the register method to register')
		}
		return state.map
	}
	
	const methods = {
		getMap: ()=>{
			return state.map
		}
	}
	
	return {
		mapRegister: register,
		mapMethods: methods
	}
}
