<template>
    <h1>绪论</h1>
    <p class="text_indent">该项目是集结开源代码和开源社区中Cesium文档和技术，经过个人总结和部分修改，整理成适合学习Cesium的文档。</p>
    <p class="text_indent">Cesium是一个跨平台、跨浏览器的开源JavaScript库，专门用于展示三维地球和地图。它基于WebGL进行硬件加速图形渲染，
        无需任何插件支持，但要求浏览器必须支持WebGL。Cesium的使用基于Apache 2.0许可，
        因此可以自由地用于商业和非商业用途。
    </p>
    <p class="text_indent">
        以下是Cesium开源社区和开源技术总结的一些关键特性和功能：
        <ol>
            <li>
                可视化特性：Cesium支持三维地球(3D)、二维地图(2D)以及2.5D哥伦布视图(CV)。
                它支持高分辨率的世界地形可视化，包括大气、雾、太阳、阳光、月亮、星星、水面等自然现象。
                此外，Cesium还支持粒子特效，如烟、火花等，以及地形、模型3D Tiles模型的面裁剪。
            </li>
            <li>
                数据支持：Cesium支持多种标准的矢量格式，如KML、GeoJSON、TopoJSON，以及矢量的贴地效果。
                使用CZML，Cesium可以支持动态时序数据的展示。
            </li>
            <li>
                交互操作：Cesium支持样式配置和用户交互操作，如透明度叠加、亮度、对比度、GAMMA、色调、饱和度等都可以动态调整。
                它还支持图像的卷帘对比，对象点选和地形点选，
                以及鼠标和触摸操作的缩放、渲染、惯性平移、飞行、任意视角、地形碰撞检测等。
            </li>
            <li>
                视图控制：Cesium提供了丰富的视图控制选项，如首页位置(HomeButton)可以将视图跳转到默认视角，
                场景模式选择器(SceneModePicker)可以切换2D、3D和Columbus View模式，
                基础图层选择器(BaseLayerPicker)可以选择三维数字地球的底图等。
            </li>
            <li>
                开发支持：Cesium提供了详细的文档和社区支持，包括Cesium学习文档、Cesium基础教程、Cesium实用总结等，
                以及Cesium社区论坛，用于讨论3D地理空间生态系统、Cesium ion、CesiumJS等相关问题。
            </li>
            <li>
                历史与贡献：Cesium项目源自Analytical Graphics, Inc.(AGI) 公司为他们客户开发的一个虚拟地球项目，
                后来将Cesium项目贡献给开源社区并一直活跃开发中。另一个重要的贡献者是NICTA(National ICT Australia)，
                澳大利亚最大的信息与通讯技术中心，他们的员工贡献了瓦片地图服务、地形处理等Cesium的核心功能。
            </li>
        </ol>
    </p>
    <p class="text_indent">
        该项目包含有常规的cesium操作和特效，需要拥有css，html，JavaScript以及vue基础。
        本项目中使用的技术栈为vue3+typescript+pnpm+elementPlus。
        cesium为最新版本，需要安装最新版本的cesium。
    </p>
    <h1>第一节</h1>
    <p>
        项目运行：
        <ol>
            <li>
                git clone '地址'
            </li>
            <li>
                pnpm install
            </li>
            <li>
                pnpm run dev
            </li>
        </ol>
    </p>
    <h1>第二节</h1>
    <p>1. 天空盒</p>
    <p class="text_indent">
        在Cesium中，天空盒（SkyBox）是一个重要的概念，用于在3D展示中模拟观测者上下左右前后的全景图像。
        它是一个将立方体展开并在六个面上贴上相应贴图的技术。
        在实际的渲染中，这个立方体始终罩在摄像机的周围，让摄像机始终处于这个立方体的中心位置，
        从而在使用者的视角中看来，仿佛置身于这个场景之中。

        Cesium提供了SkyBox类来设计天空盒。通常，天空盒需要包含6张图片，分别对应立方体的六个面。
        这些图片可以通过替换Cesium\Assets\Textures\SkyBox文件夹中的文件，或者通过代码来指定图片的路径。

        此外，Cesium还支持自定义的天空盒效果。开发者可以通过设计自己的天空盒图片，
        并指定这些图片的路径来创建自定义的天空盒。在创建自定义天空盒时，需要注意图片方位和对应关系的正确性，
        以确保天空盒的正确显示。
    </p>
</template>

<script setup lang="ts">

</script>

<style>
.text_indent{
    text-indent: 2em;
    line-height: 1.5;
}
</style>