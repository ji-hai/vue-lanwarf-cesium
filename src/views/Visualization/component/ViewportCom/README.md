# 1. 简介
postcss-px-to-viewport 是一个 PostCSS 插件，用于将 CSS 中的 px 单位转换为 vw 或 vh 单位。它可以帮助我们实现在不同屏幕尺寸下的自适应布局，以提高页面的响应性和可用性。

# 2. postcss-px-to-viewport原理
- 遍历 CSS 文件中的所有样式规则，找到其中所有的 px 单位值。
- 将每个 px 值根据设备屏幕的宽度和高度转换为对应的 vw 或 vh 值。例如，如果设备屏幕的宽度为 750px，样式表中有一个宽度为 100px 的元素，那么插件将把它转换为 13.33vw（100/750*100）的值。
- 生成转换后的 CSS 文件。

# 3. 实现
 - 安装 postcss-px-viewport 插件及其依赖

 ``` javascript
 pnpm add postcss-px-viewport postcss-viewport-units postcss-preset-env -D
```

- 配置 postcss.config.js 文件

``` javascript
module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      unitToConvert: 'px',  // 需要转换的单位，默认为"px"
      viewportWidth: 320, //  设计稿的视口宽度
      unitPrecision: 5, // 单位转换后保留的精度
      propList: ['*'], // 能转化为vw的属性列表
      viewportUnit: 'vw', //  希望使用的视口单位
      fontViewportUnit: 'vw', // 字体使用的视口单位
      selectorBlackList: [], // 需要忽略的CSS选择器 
      minPixelValue: 1, // 最小的转换数值，如果为1的话，只有大于1的值会被转换
      mediaQuery: false, // 媒体查询里的单位是否需要转换单位
      replace: true, // 是否直接更换属性值，而不添加备用属性
      exclude: [], // 忽略某些文件夹下的文件或特定文件
      include: undefined,  // 如果设置了include，那将只有匹配到的文件才会被转换，例如只转换 'src/mobile' 下的文件 (include: /\/src\/mobile\//)
      landscape: false, // 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
      landscapeUnit: 'vw' // 横屏时使用的单位
    },
     'postcss-preset-env': {
      browsers: 'last 2 versions' //指定只对最近 2 个版本的浏览器进行兼容性处理。
    }
  }
}
```

# 4. postcss-px-to-viewport的优缺点
1. 优点：

   实现简单：只需要通过安装插件和配置即可快速实现 px 转换为 vw 或 vh 单位。
提高开发效率：使用自适应布局，可以减少对不同屏幕尺寸的适配工作，提高开发效率。
适配性强：可以自适应不同设备和屏幕尺寸，适配性强，可以适应各种移动端设备的屏幕尺寸。

2. 缺点：

    不适用于字体大小：由于 vw 和 vh 单位不适用于字体大小，因此需要单独设置字体大小的转换方式。
兼容性问题：一些老版本的浏览器不支持 vw 和 vh 单位，需要使用兼容性处理或回退方案。
无法把行内样式中的 px 转换成视口单位（vw, vh, vmin, vmax）
无法精确控制样式：由于浏览器的视口宽度和高度不同，转换后的样式可能会有一定的误差，无法精确控制样式。