import { MockMethod } from 'vite-plugin-mock'
import { SUCCESS_CODE } from '@/constants'

const timeout = 1000

const adminList = [
  {
    path: '/cesium',
    component: '#',
    redirect: '/cesium/basic/skyBox',
    name: 'cesium',
    meta: {
      title: 'cesium',
      icon: 'carbon:skill-level-advanced'
    },
    children: [
      {
        path: 'basic',
        name: 'basic',
        component: '##',
        redirect: '/cesium/basic/skyBox',
        meta: {
          title: 'cesium基础'
        },
        children: [
          {
            path: 'skyBox',
            name: 'skyBox',
            component: 'views/SkyBox/SkyBox',
            meta: {
              title: '天空盒'
            }
          }
        ]
      },
      {
        path: 'material',
        component: '#',
        redirect: '/cesium/material/waveCircleMaterial',
        name: 'material',
        meta: {
          title: '材质',
          icon: 'carbon:skill-level-advanced'
        },
        children: [
          {
            path: 'waveCircleMaterial',
            name: 'waveCircleMaterial',
            component: 'views/Material/WaveCircleMaterial',
            meta: {
              title: '波动圆材质'
            }
          },
          {
            path: 'customMaterialLine',
            name: 'customMaterialLine',
            component: 'views/Material/CustomMaterialLine',
            meta: {
              title: '流动线条材质'
            }
          },
          {
            path: 'circleFadeMaterial',
            name: 'circleFadeMaterial',
            component: 'views/Material/CircleFadeMaterial',
            meta: {
              title: '渐变圆材质'
            }
          }
        ]
      },
      {
        path: 'graphics',
        component: '#',
        redirect: '/cesium/graphics/points',
        name: 'graphics',
        meta: {
          title: 'graphics',
          icon: 'carbon:skill-level-advanced'
        },
        children: [
          {
            path: 'points',
            name: 'points',
            component: 'views/Graphics/Points',
            meta: {
              title: 'Points'
            }
          }
        ]
      },
      {
        path: 'line',
        component: '#',
        redirect: '/cesium/line/simapleLine',
        name: 'line',
        meta: {
          title: '线',
          icon: 'carbon:skill-level-advanced'
        },
        children: [
          {
            path: 'demo',
            name: 'demo',
            component: 'views/Line/Demo',
            meta: {
              title: 'demo'
            }
          },
          {
            path: 'simapleLine',
            name: 'simapleLine',
            component: 'views/Line/SimapleLine',
            meta: {
              title: '简单线'
            }
          }
        ]
      },
      {
        path: 'polygon',
        component: '#',
        redirect: '/polygon/polygon/hexagon',
        name: 'polygon',
        meta: {
          title: '面',
          icon: 'carbon:skill-level-advanced'
        },
        children: [
          {
            path: 'hexagon',
            name: 'hexagon',
            component: 'views/Polygon/Hexagon',
            meta: {
              title: '六边形扩散'
            }
          }
        ]
      },
      {
        path: 'sceneEffects',
        component: '#',
        redirect: '/cesium/sceneEffects/modifyMap',
        name: 'sceneEffects',
        meta: {
          title: '场景效果',
          icon: 'carbon:skill-level-advanced'
        },
        children: [
          {
            path: 'modifyMap',
            name: 'modifyMap',
            component: 'views/ModifyMap/ModifyMap',
            meta: {
              title: '反色滤镜'
            }
          }
        ]
      }
    ]
  },
  {
    path: '/navigator',
    component: '#',
    redirect: '/navigator',
    name: 'navigator',
    meta: {
      title: 'navigator',
      icon: 'carbon:skill-level-advanced'
    },
    children: [
      {
        path: 'navigator',
        name: 'navigator',
        component: 'views/Navigator/Navigator',
        meta: {
          title: 'Navigator'
        }
      },
      {
        path: 'codeView',
        name: 'codeView',
        component: 'views/CodeView/CodeView',
        meta: {
          title: 'codeView'
        }
      }
    ]
  }
]

const testList: any[] = [
  {
    path: '/cesium',
    component: '#',
    redirect: '/cesium/basic/skyBox',
    name: 'cesium',
    meta: {
      title: 'cesium',
      icon: 'carbon:skill-level-advanced'
    },
    children: [
      {
        path: 'basic',
        name: 'basic',
        component: '##',
        redirect: '/cesium/basic/skyBox',
        meta: {
          title: 'cesium基础'
        },
        children: [
          {
            path: 'skyBox',
            name: 'skyBox',
            component: 'views/SkyBox/SkyBox',
            meta: {
              title: '天空盒'
            }
          }
        ]
      },
      {
        path: 'material',
        component: '#',
        redirect: '/cesium/material/waveCircleMaterial',
        name: 'material',
        meta: {
          title: '材质',
          icon: 'carbon:skill-level-advanced'
        },
        children: [
          {
            path: 'waveCircleMaterial',
            name: 'waveCircleMaterial',
            component: 'views/Material/WaveCircleMaterial',
            meta: {
              title: '波动圆材质'
            }
          },
          {
            path: 'customMaterialLine',
            name: 'customMaterialLine',
            component: 'views/Material/CustomMaterialLine',
            meta: {
              title: '流动线条材质'
            }
          },
          {
            path: 'circleFadeMaterial',
            name: 'circleFadeMaterial',
            component: 'views/Material/CircleFadeMaterial',
            meta: {
              title: '渐变圆材质'
            }
          }
        ]
      },
      {
        path: 'graphics',
        component: '#',
        redirect: '/cesium/graphics/points',
        name: 'graphics',
        meta: {
          title: 'graphics',
          icon: 'carbon:skill-level-advanced'
        },
        children: [
          {
            path: 'points',
            name: 'points',
            component: 'views/Graphics/Points',
            meta: {
              title: 'Points'
            }
          }
        ]
      }
    ]
  },
  {
    path: '/navigator',
    component: '#',
    redirect: '/navigator',
    name: 'navigator',
    meta: {
      title: 'navigator',
      icon: 'carbon:skill-level-advanced'
    },
    children: [
      {
        path: 'navigator',
        name: 'navigator',
        component: 'views/Navigator/Navigator',
        meta: {
          title: 'Navigator'
        }
      },
      {
        path: 'codeView',
        name: 'codeView',
        component: 'views/CodeView/CodeView',
        meta: {
          title: 'codeView'
        }
      }
    ]
  }
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
