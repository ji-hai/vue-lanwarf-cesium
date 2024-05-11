import { MockMethod } from 'vite-plugin-mock'
import { SUCCESS_CODE } from '@/constants'

const timeout = 1000

const adminList = [
  {
    path: '/doc',
    component: '#',
    redirect: '/doc/index',
    name: 'doc',
    meta: {
      title: 'doc',
      icon: 'mingcute:doc-line'
    },
    children: [
      {
        path: 'index',
        name: 'index',
        component: 'views/Doc/index',
        meta: {
          title: '帮助文档',
          icon: 'mingcute:doc-line'
        }
      }
    ]
  },
  {
    path: '/cesium',
    component: '#',
    redirect: '/cesium/basic/skyBox',
    name: 'cesium',
    meta: {
      title: 'cesium',
      icon: 'simple-icons:cesium'
    },
    children: [
      {
        path: 'basic',
        name: 'basic',
        component: '##',
        redirect: '/cesium/basic/skyBox',
        meta: {
          title: 'cesium基础',
          icon: 'simple-icons:cesium'
        },
        children: [
          {
            path: 'skyBox',
            name: 'skyBox',
            component: 'views/SkyBox/SkyBox',
            meta: {
              title: '天空盒',
              icon: 'formkit:skype'
            }
          },
          {
            path: 'cesiumNavigation',
            name: 'cesiumNavigation',
            component: 'views/CesiumNavigation/CesiumNavigation',
            meta: {
              title: '导航插件',
              icon: 'material-symbols-light:assistant-navigation-rounded'
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
          icon: 'lets-icons:materials'
        },
        children: [
          {
            path: 'waveCircleMaterial',
            name: 'waveCircleMaterial',
            component: 'views/Material/WaveCircleMaterial',
            meta: {
              title: '波动圆材质',
              icon: 'carbon:circle-filled'
            }
          },
          {
            path: 'customMaterialLine',
            name: 'customMaterialLine',
            component: 'views/Material/CustomMaterialLine',
            meta: {
              title: '流动线条材质',
              icon: 'pepicons-print:line-y'
            }
          },
          {
            path: 'circleFadeMaterial',
            name: 'circleFadeMaterial',
            component: 'views/Material/CircleFadeMaterial',
            meta: {
              title: '渐变圆材质',
              icon: 'fa6-solid:circle-dot'
            }
          }
        ]
      },
      {
        path: 'graphics',
        component: '#',
        redirect: '/cesium/graphics/pointGraphics',
        name: 'graphics',
        meta: {
          title: 'graphics',
          icon: 'mdi:graphics-processing-unit'
        },
        children: [
          {
            path: 'pointGraphics',
            name: 'pointGraphics',
            component: 'views/Graphics/PointGraphics',
            meta: {
              title: '点',
              icon: 'tabler:point-filled'
            }
          },
          {
            path: 'alarmPoint',
            name: 'alarmPoint',
            component: 'views/Graphics/AlarmPoint',
            meta: {
              title: '报警点',
              icon: 'material-symbols-light:detector-alarm-rounded'
            }
          },
          {
            path: 'alarmCircle',
            name: 'alarmCircle',
            component: 'views/Graphics/AlarmCircle',
            meta: {
              title: '报警圆',
              icon: 'guidance:alarm-bell'
            }
          },
          {
            path: 'lineGraphics',
            name: 'lineGraphics',
            component: 'views/Graphics/LineGraphics',
            meta: {
              title: '线',
              icon: 'uil:line-alt'
            }
          },
          {
            path: 'polygonGraphics',
            name: 'polygonGraphics',
            component: 'views/Graphics/PolygonGraphics',
            meta: {
              title: '面',
              icon: 'ph:polygon-light'
            }
          },
          {
            path: 'modelGraphics',
            name: 'modelGraphics',
            component: 'views/Graphics/ModelGraphics',
            meta: {
              title: '模型',
              icon: 'carbon:model-alt'
            }
          },
          {
            path: 'cylinderGraphics',
            name: 'cylinderGraphics',
            component: 'views/Graphics/CylinderGraphics',
            meta: {
              title: '圆柱',
              icon: 'ph:cylinder-light'
            }
          },
          {
            path: 'customDefBillboardGraphics',
            name: 'customDefBillboardGraphics',
            component: 'views/Graphics/CustomDefBillboardGraphics',
            meta: {
              title: '标牌气泡框',
              icon: 'mdi:billboard'
            }
          },
          {
            path: 'divGraphics',
            name: 'divGraphics',
            component: 'views/Graphics/DivGraphics',
            meta: {
              title: '自定义div',
              icon: 'fluent:diversity-48-regular'
            }
          },
          {
            path: 'Popup',
            name: 'Popup',
            component: 'views/Prompt/Popup',
            meta: {
              title: '自定义弹框',
              icon: 'carbon:popup'
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
          title: '动态线',
          icon: 'mingcute:xrp-line'
        },
        children: [
          {
            path: 'demo',
            name: 'demo',
            component: 'views/Line/Demo',
            meta: {
              title: 'demo',
              icon: 'tdesign:play-demo'
            }
          },
          {
            path: 'simapleLine',
            name: 'simapleLine',
            component: 'views/Line/SimapleLine',
            meta: {
              title: '简单线',
              icon: 'clarity:atom-line'
            }
          },
          {
            path: 'animationModel',
            name: 'animationModel',
            component: 'views/Line/AnimationModel',
            meta: {
              title: '漫游',
              icon: 'mingcute:walk-line'
            }
          }
        ]
      },
      {
        path: 'particle',
        component: '#',
        redirect: '/cesium/particle/fireworks',
        name: 'particle',
        meta: {
          title: '粒子',
          icon: 'meteocons:smoke-particles-fill'
        },
        children: [
          {
            path: 'fireworks',
            name: 'fireworks',
            component: 'views/Particle/Fireworks',
            meta: {
              title: '烟花',
              icon: 'mingcute:firework-line'
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
          icon: 'mingcute:polygon-line'
        },
        children: [
          {
            path: 'hexagon',
            name: 'hexagon',
            component: 'views/Polygon/Hexagon',
            meta: {
              title: '六边形扩散',
              icon: 'uil:polygon'
            }
          },
          {
            path: 'water',
            name: 'water',
            component: 'views/Polygon/Water',
            meta: {
              title: '水面',
              icon: 'material-symbols-light:water'
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
          icon: 'fluent:text-effects-sparkle-24-regular'
        },
        children: [
          {
            path: 'modifyMap',
            name: 'modifyMap',
            component: 'views/SceneEffects/ModifyMap',
            meta: {
              title: '反色滤镜',
              icon: 'icon-park-outline:modify-two'
            }
          },
          {
            path: 'screenshot',
            name: 'screenshot',
            component: 'views/SceneEffects/Screenshot',
            meta: {
              title: '场景截图',
              icon: 'ri:screenshot-line'
            }
          },
          {
            path: 'globeRotate',
            name: 'globeRotate',
            component: 'views/SceneEffects/GlobeRotate',
            meta: {
              title: '地球自转',
              icon: 'material-symbols-light:globe'
            }
          },
          {
            path: 'eagleEye',
            name: 'eagleEye',
            component: 'views/SceneEffects/EagleEye',
            meta: {
              title: '鹰眼地图',
              icon: 'mdi:file-eye-outline'
            }
          },
          {
            path: '3dtiles',
            name: '3dtiles',
            component: 'views/SceneEffects/3Dtiles',
            meta: {
              title: '3dtiles',
              icon: 'mage:box-3d-scan'
            }
          },
          {
            path: 'czml',
            name: 'czml',
            component: 'views/SceneEffects/CZML',
            meta: {
              title: 'czml',
              icon: 'lets-icons:3d-box'
            }
          },
          {
            path: 'submergedAnalysis',
            name: 'submergedAnalysis',
            component: 'views/SceneEffects/SubmergedAnalysis',
            meta: {
              title: '淹没分析',
              icon: 'icon-park-solid:analysis'
            }
          },
          {
            path: 'videoProjection',
            name: 'videoProjection',
            component: 'views/SceneEffects/VideoProjection',
            meta: {
              title: '视频投影',
              icon: 'material-symbols:video-file-outline-sharp'
            }
          },
          {
            path: 'subsurfaceModel',
            name: 'subsurfaceModel',
            component: 'views/SceneEffects/SubsurfaceModel',
            meta: {
              title: '地下模式',
              icon: 'tabler:box-model'
            }
          }
        ]
      },
      {
        path: 'cesiumPlugin',
        component: '#',
        redirect: '/cesium/cesiumPlugin/cesiumWind',
        name: 'cesiumPlugin',
        meta: {
          title: '插件',
          icon: 'mdi:plugin-outline'
        },
        children: [
          {
            path: 'cesiumWind',
            name: 'cesiumWind',
            component: 'views/CesiumPlugin/CesiumWind',
            meta: {
              title: '风场',
              icon: 'icon-park-twotone:whirlwind'
            }
          }
        ]
      },
      {
        path: 'cesiumDraw',
        component: '#',
        redirect: '/cesium/cesiumDraw/drawEntity',
        name: 'cesiumDraw',
        meta: {
          title: '绘制',
          icon: 'mdi:draw'
        },
        children: [
          {
            path: 'drawEntity',
            name: 'drawEntity',
            component: 'views/CesiumDraw/DrawEntity',
            meta: {
              title: '绘制',
              icon: 'mdi:draw'
            }
          },
          {
            path: 'terrainClipPlan',
            name: 'terrainClipPlan',
            component: 'views/CesiumDraw/TerrainClipPlan',
            meta: {
              title: '地形开挖',
              icon: 'pepicons-pencil:clipboard'
            }
          }
        ]
      }
    ]
  },
  {
    path: '/windowNavigator',
    component: '#',
    redirect: '/windowNavigator',
    name: 'windowNavigator',
    meta: {
      title: 'windowNavigator',
      icon: 'material-symbols-light:window'
    },
    children: [
      {
        path: 'windowNavigator',
        name: 'windowNavigator',
        component: 'views/Navigator/Navigator',
        meta: {
          title: 'Navigator',
          icon: 'material-symbols-light:window'
        }
      },
      {
        path: 'codeView',
        name: 'codeView',
        component: 'views/CodeView/CodeView',
        meta: {
          title: 'codeView',
          icon: 'octicon:file-code-24'
        }
      },
      {
        path: 'sse',
        name: 'sse',
        component: 'views/SSE/sse',
        meta: {
          title: 'sse',
          icon: 'icon-park-outline:internal-transmission'
        }
      }
    ]
  },
  {
    path: '/test',
    component: '#',
    redirect: '/test/test1',
    name: 'test',
    meta: {
      title: 'test',
      icon: 'carbon:test-tool'
    },
    children: [
      {
        path: 'test1',
        name: 'test1',
        component: 'views/Test/Test',
        meta: {
          title: 'Test',
          icon: 'carbon:test-tool'
        }
      },
      {
        path: 'test2',
        name: 'test2',
        component: 'views/CodeView/CodeView',
        meta: {
          title: 'test2',
          icon: 'carbon:test-tool'
        }
      }
    ]
  },
  {
    path: '/cssAnimation',
    component: '#',
    redirect: '/cssAnimation/spinners',
    name: 'cssAnimation',
    meta: {
      title: 'css动画',
      icon: 'fa6-solid:spinner'
    },
    children: [
      {
        path: 'spinners',
        name: 'spinners',
        component: 'views/CssAnimation/Spinners',
        meta: {
          title: '旋转动画',
          icon: 'fa6-solid:spinner'
        }
      }
    ]
  },
  {
    path: '/demo',
    component: '#',
    redirect: '/demo/demo1',
    name: 'demo',
    meta: {
      title: '演示例子',
      icon: 'tdesign:play-demo'
    },
    children: [
      {
        path: 'demo1',
        name: 'demo1',
        component: 'views/CesiumDemo/Demo1',
        meta: {
          title: '溯源演示',
          icon: 'mdi:source-branch-refresh'
        }
      },
      {
        path: 'demo2',
        name: 'demo2',
        component: 'views/CesiumDemo/Demo2',
        meta: {
          title: '和平管网演示',
          icon: 'vscode-icons:file-type-pipeline'
        }
      }
    ]
  },
  {
    path: '/autofit',
    name: 'autofit',
    component: 'views/Visualization/Autofit',
    meta: {
      title: 'scale大屏',
      icon: 'oui:full-screen'
    }
  },
  {
    path: '/viewPort',
    name: 'viewPort',
    component: 'views/Visualization/ViewPort',
    meta: {
      title: 'viewPort大屏',
      icon: 'solar:full-screen-square-bold'
    }
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
