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

## 导航

Context全局存储Page ID，点击导航切换Page ID，滚动鼠标切换页面的同时更新Page ID，滚动鼠标最大跳页默认为1（可设置）

## 页面

1. 不切换路由
2. 支持手机端访问 isMobile
3. 需要Loading页面
4. 控制Page的显示隐藏做到假切换页面，效果需要实现上一个页面慢慢消失，下一个页面显示，使用opacity控制
5. 页面：Loading、Vision、The Editor、The Infra、The Econs、Team、Partners、Social

## WebGL框架

网站效果完成的基础，必须基于WebGL框架，调查WebGl框架

| 框架名称                                 | Github                                                | Stars | 特点                                                         | Demo                                                         |
| ---------------------------------------- | ----------------------------------------------------- | ----- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| [Three.js](https://threejs.org/)         | [Three.js](https://github.com/mrdoob/three.js)        | 82k   | 全面而强大的JavaScript 3D库，可用于处理所有3D，从创建简单的3D动画到创建交互式3D游戏。不仅提供支持WebGL渲染器的功能，还提供SVG，Canvas和CSS3D渲染器。MIT | [Example](https://threejs.org/examples/#webgl_animation_keyframes) |
| [Babylon.js](https://www.babylonjs.com/) | [Babylon.js](https://github.com/BabylonJS/Babylon.js) | 17.3k | 专业级游戏最好的JavaScript 3D 游戏引擎，关键特性：环境光、相机、材料、网格、碰撞引擎、物理引擎、声音引擎 和 优化引擎。Apache License 2.0 | [Example](https://www.babylonjs.com/community/)              |

主流WebGL框架以上两个，其他框架[Turbulenz](http://biz.turbulenz.com/developers)、[Famo.us](http://famo.us/) ...， 国产：[LayaAir](https://github.com/layabox/LayaAir)(支持小程序)、claygl、G3D、Hilo3d，阿里开源：[oasis](https://oasisengine.cn/)、[eva.js](https://github.com/eva-engine/eva.js)(游戏互动引擎)等等不一一展开

分别通过Three.js和Babylon.js完成两个Demo感受两个框架

## Loading页面

1. 初始化为Loading页面，其他元素处于visibility hidden状态，初cotent之外
2. 因为WebGL需要加载模型，等待.obj .glb等模型文件加载完成，需要实时进度，全部模型加载完成后进入Vision页面，用Emitter实现
3. 寻找类似炫酷的界面去做页面支撑，根据页面效果查到该效果为Fluid Simulation，因为是复刻流程，反过来倒推了，寻找fluid simulation，然后针对效果做调整。[WebGL-Fluid-Simulation](https://github.com/PavelDoGreat/WebGL-Fluid-Simulation) 实际情况应该是先知道有这个特效，再去做这个特效（这里的实现应该是有什么用什么，而不是非要完成这个效果，粒子效果风格搭的上的话也行，找素材耗时）。把script的js代码拷贝过来，删除ga有关的代码就可以了。
4. 页面之间的切换，loading => opacity:0, Vision => opacity:1 要做慢隐、慢显

