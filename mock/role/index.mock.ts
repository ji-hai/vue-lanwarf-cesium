import { MockMethod } from 'vite-plugin-mock'
import { SUCCESS_CODE } from '@/constants'

const timeout = 1000

const adminList = [
  {
    path: '/cesium',
    component: '#',
    redirect: '/cesium/basic/widget/skyBox',
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
        redirect: '/cesium/basic/widget/widget1',
        meta: {
          title: 'cesium基础'
        },
        children: [
          {
            path: 'widget',
            name: 'widget',
            component: '##',
            redirect: '/cesium/basic/widget/widget1',
            meta: {
              title: '控件',
              alwaysShow: true
            },
            children: [
              {
                path: 'widget1',
                name: 'widget1',
                component: 'views/Cesium/Widget.vue',
                meta: {
                  title: 'widget1'
                }
              },
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
            path: 'widget',
            name: 'widget',
            component: '##',
            redirect: '/cesium/basic/widget/widget1',
            meta: {
              title: '控件',
              alwaysShow: true
            },
            children: [
              {
                path: 'widget1',
                name: 'widget1',
                component: 'views/Cesium/Widget.vue',
                meta: {
                  title: 'widget1'
                }
              },
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
          // {
          //   path: 'skyBox',
          //   name: 'skyBox',
          //   component: 'views/SkyBox/SkyBox',
          //   meta: {
          //     title: '天空盒'
          //   }
          // }
        ]
      }
    ]
  },
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
      }
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
      }
    ]
  },
  {
    path: '/material',
    component: '#',
    redirect: '/material/waveCircleMaterial',
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
  },
  {
    path: '/graphics',
    component: '#',
    redirect: '/graphics/points',
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
    path: '/level',
    component: '#',
    redirect: '/level/menu1/menu1-1/menu1-1-1',
    name: 'Level',
    meta: {
      title: 'router.level',
      icon: 'carbon:skill-level-advanced'
    },
    children: [
      {
        path: 'menu1',
        name: 'Menu1',
        component: '##',
        redirect: '/level/menu1/menu1-1/menu1-1-1',
        meta: {
          title: 'router.menu1'
        },
        children: [
          {
            path: 'menu1-1',
            name: 'Menu11',
            component: '##',
            redirect: '/level/menu1/menu1-1/menu1-1-1',
            meta: {
              title: 'router.menu11',
              alwaysShow: true
            },
            children: [
              {
                path: 'menu1-1-1',
                name: 'Menu111',
                component: 'views/Level/Menu111.vue',
                meta: {
                  title: 'router.menu111'
                }
              }
            ]
          },
          {
            path: 'menu1-2',
            name: 'Menu12',
            component: 'views/Level/Menu12.vue',
            meta: {
              title: 'router.menu12'
            }
          }
        ]
      },
      {
        path: 'menu2',
        name: 'Menu2',
        component: 'views/Level/Menu2.vue',
        meta: {
          title: 'router.menu2'
        }
      }
    ]
  },
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
