import { MockMethod } from 'vite-plugin-mock'
import { SUCCESS_CODE } from '@/constants'

const timeout = 1000

const adminList = [
	{
		path: '/baseMap',
		component: '#',
		redirect: '/baseMap/TypeMap/TDT',
		name: 'baseMap',
		meta: {
			title: '基本图层',
			icon: 'carbon:skill-level-advanced'
		},
		children: [
			{
				path: 'TypeMap',
				name: 'TypeMap',
				component: '##',
				redirect: '/baseMap/TypeMap/TDT',
				meta: {
					title: '图层类型'
				},
				children: [
					{
						path: 'TDT',
						name: 'TDT',
						component: 'views/BaseMap/TDT',
						meta: {
							title: '天地图'
						}
					},
					{
						path: 'TDT1',
						name: 'TDT1',
						component: 'views/BaseMap/TDT',
						meta: {
							title: 'router.menu12'
						}
					}
				]
			},
			{
				path: 'menu2',
				name: 'Menu2Demo',
				component: 'views/BaseMap/TDT',
				meta: {
					title: '线效果'
				}
			},
		]
	},
	{
		path: '/line',
		component: '#',
		redirect: '/line',
		name: 'line',
		meta: {
			title: '线图层',
			icon: 'carbon:skill-level-advanced'
		},
		children: [
			{
				path: 'line1',
				name: 'line1',
				component: 'views/BaseMap/TDT',
				meta: {
					title: '线效果'
				}
			},
		]
	},
	{
		path: '/cesium',
		component: '#',
		redirect: '/cesium',
		name: 'cesium',
		meta: {
			title: 'cesium基本使用',
			icon: 'carbon:skill-level-advanced'
		},
		children: [
			{
				path: 'cesiumDemo',
				name: 'cesiumDemo',
				component: 'views/Cesium/CesiumDemo',
				meta: {
					title: 'cesium基本使用'
				}
			},
		]
	},
]

const testList: string[] = [
  '/baseMap',
]

export default [
  // 列表接口
  {
    url: '/mock/role/list',
    method: 'get',
    timeout,
    response: ({ query }) => {
      const { roleName } = query
      return {
        code: SUCCESS_CODE,
        data: roleName === 'admin' ? adminList : testList
      }
    }
  }
] as MockMethod[]
