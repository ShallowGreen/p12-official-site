# P12 Official Site

## 启动和编译

```bash
# 安装依赖
yarn

# 本地调试
yarn start

# 编译
yarn build
```

## 技术方案

### 导航

1. Context全局存储Page ID，点击导航切换Page ID，滚动鼠标切换页面的同时更新Page ID，滚动鼠标最大跳页默认为1（可设置）
2. Context全局存储钱包地址、连接、断开连接
3. 点击切换激活的Page ID

### 页面

1. 不切换路由（页面可以预加载，体验优化，可以防止模型加载导致先有页面，再出模型）
2. 支持手机端访问，用isMobile做判断后去改变（暂未实现）
3. 需要Loading页面（用于加载模型，模型通常需要一定时间加载，优化用户体验）
4. 控制Page的现实隐藏做到假切换页面，效果需要实现上一个页面慢慢消失，下一个页面显示，使用opacity控制
5. 已实现页面：Loading、Vision、The Editor、The Infra 未实现页面：The Econs、Team、Partners、Social

### WebGL框架

网站效果完成的基础，必须基于WebGL框架，调查WebGl框架

| 框架名称                                 | Github                                                | Stars | 特点                                                         | Demo                                                         |
| ---------------------------------------- | ----------------------------------------------------- | ----- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| [Three.js](https://threejs.org/)         | [Three.js](https://github.com/mrdoob/three.js)        | 82k   | 全面而强大的JavaScript 3D库，可用于处理所有3D，从创建简单的3D动画到创建交互式3D游戏。不仅提供支持WebGL渲染器的功能，还提供SVG，Canvas和CSS3D渲染器。MIT | [Example](https://threejs.org/examples/#webgl_animation_keyframes) |
| [Babylon.js](https://www.babylonjs.com/) | [Babylon.js](https://github.com/BabylonJS/Babylon.js) | 17.3k | 专业级游戏最好的JavaScript 3D 游戏引擎，关键特性：环境光、相机、材料、网格、碰撞引擎、物理引擎、声音引擎 和 优化引擎。Apache License 2.0 | [Example](https://www.babylonjs.com/community/)              |

主流WebGL框架以上两个，其他框架[Turbulenz](http://biz.turbulenz.com/developers)、[Famo.us](http://famo.us/) ...， 国产：[LayaAir](https://github.com/layabox/LayaAir)(支持小程序)、claygl、G3D、Hilo3d，阿里开源：[oasis](https://oasisengine.cn/)、[eva.js](https://github.com/eva-engine/eva.js)(游戏互动引擎)等等不一一展开

分别通过Three.js和Babylon.js完成两个Demo感受两个框架，结论：ThreejsDemo多，案例多，开发难度小一点，Babylonjs在排查问题或者写业务的时候更耗时。

### Loading页面

1. 初始化为Loading页面，其他元素处于visibility hidden状态，除cotent之外（预加载模型）
2. 因为WebGL需要加载模型，等待.obj .glb等模型文件加载完成，需要实时进度，全部模型加载完成后进入Vision页面，用Emitter实现
3. 寻找类似炫酷的界面去做页面支撑，根据页面效果查到该效果为Fluid Simulation，因为是复刻流程，反过来倒推了，寻找fluid simulation，然后针对效果做调整。[WebGL-Fluid-Simulation](https://github.com/PavelDoGreat/WebGL-Fluid-Simulation) 实际情况应该是先知道有这个特效，再去做这个特效（这里的实现应该是有什么用什么，而不是非要完成这个效果，粒子效果风格搭的上的话也行，找素材耗时）。把script的js代码拷贝过来，删除ga有关的代码就可以了。
4. 页面之间的切换，loading => opacity:0, Vision => opacity:1 要做渐入渐出（疑问：官网用了display：none和opacity同时控制？）
5. 用sleep做测试，后期替换成模型加载进度

### Vision

1. 渐变的背景+基础文案布局
2. 中间的模型具有自动旋转功能（isAutoRotate），并且具有点击的功能(xyz三个坐标)，点击某个点后固定视角，并且显示文字，滑动之后，恢复自动旋转。参考案例[Three.js Demo代码](https://github.com/mrdoob/three.js/blob/master/examples/webgl_animation_keyframes.html) [CSS2D](https://threejs.org/examples/?q=CSS2D#webgl_loader_pdb) [CSS2D](https://threejs.org/examples/?q=CSS2D#css2d_label)，css2d层会导致鼠标事件失效，通过给父元素pointer-events：none，子元素pointer-events：auto实现。(动画效果方面需要调试参数过于耗时，防止进度有落后，动画效果方面未实现）
3. 需要在resize时重新设置aspect等参数，防止错位显示，参考Threejs相关demo。
4. 官方的背景粒子存在Bug
5. 写Threejs的时候碰到的坑。问题1：模型路径问题，问题二：解析器路径 问题三：未知报错
6. [react-three-fiber](https://github.com/pmndrs/react-three-fiber) react封装过的Threejs
7. loader的第三个参数可以获取到total和loaded两个数值，用于加载进度（有坑，loaded 100%，但是模型还是没加载出来，需要在第二参数里面加载完成里面去触发100）如果多个模型，并且使用了math.Floor的时候，不能全是99%，否则进一就变100了。

### Editor

1. 该效果通常用在官网中，常见的就是滚动落差和鼠标移动或者手机重力感应器落差。鼠标滚动落差:[react-scroll-parallax](https://github.com/jscottsmith/react-scroll-parallax) 鼠标or重力感应落差: [parallax](https://github.com/wagerfield/parallax) 
2. 类似效果[Demo](https://matthew.wagerfield.com/parallax/) [parallax](https://github.com/wagerfield/parallax) 按照文档实现
3. [Swiper](https://swiperjs.com/demos) 用Swiper/react的时候需要写全路径``` swiper/react/swiper-react.js```

### Infra

1. 该页面和vision差不多，也是加载three模型，区别在于多个模型切换，以及需要去做材质的替换
2. 我实现该页面未按照官网的去实现，以另一种形式体现



## 技术总结和问题

1. 性能和交互体验相关
   1. 提前渲染，加载模型
   2. 样式用opacity和visibility， repaint优化reflow，opacity做上渐显和渐隐的效果
   3. 鼠标滚轮用Debounce优化，一来是可以优化到性能，二来是可以解决翻页不准确的问题
   4. 隐藏的z-index低于显示的，实现从下显示
2. 用到的库
   1. @ethersproject/providers
   2. ahooks
   3. ethers
   4. eventemitter3
   5. lodash-es
   6. parallax-js
   7. swiper
   8. three
3. 其他
   1. useEffect和useLayoutEffect：useEffect和useLayoutEffect作为组件的副作用，本质上是一样的。共用一套结构来存储effect链表。整体流程上都是先在render阶段，生成effect，并将它们拼接成链表，存到fiber.updateQueue上，最终带到commit阶段被处理。他们彼此的区别只是最终的执行时机不同，一个异步一个同步，这使得useEffect不会阻塞渲染，而useLayoutEffect会阻塞渲染。
   2. threejs的调试比较费时，一方面是不熟悉API，另外一方面有些问题，不报错，不显示，导致排查好久
   3. 样式方面为了节省时间，参考官网，以堆叠形式为主，未做封装
   4. 动画效果未做实现