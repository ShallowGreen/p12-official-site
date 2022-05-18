import React, { useRef, useLayoutEffect } from 'react';
import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { EE } from '@/pages/home/index.utils';
import { PageIDType } from '@/constant/index'
import { min } from 'lodash-es';
import './index.less';

interface IVisionWebGLProps {
}

// 点位数据：定位、摄像头位置
const POINT_DATA = [
    {
        // 寿司店
        position: [],
        camera: [],
        data: { 
            title: '寿司屋',
            desc: <>
                寿司のすべての部分が私たちの魂に注意深く注入されています
                <br />
                町の3階の南東の角にあります
            </>
        }
    }
]

const VisionWebGL: React.FunctionComponent<IVisionWebGLProps> = (props) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        let mixer: THREE.AnimationMixer;
        const clock = new THREE.Clock();
        const container = containerRef.current as HTMLDivElement;
        let isAutoRotate: boolean = true;
        let root:THREE.Group;

        // FPS
        // const stats = new Stats();
        // container.appendChild( stats.dom );

        // 初始化render,背景透明
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.outputEncoding = THREE.sRGBEncoding;
        container.appendChild(renderer.domElement);

        const pmremGenerator = new THREE.PMREMGenerator(renderer);

        // 初始化场景
        const scene = new THREE.Scene();
        // scene.background = new THREE.Color( 0xbfe3dd );
        scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;

        root = new THREE.Group();
		scene.add( root );

        const labelRenderer = new CSS2DRenderer();
        labelRenderer.setSize(container.clientWidth, container.clientHeight);
        // labelRenderer.domElement.style.position = 'absolute';
        // labelRenderer.domElement.style.top = '0px';
        labelRenderer.domElement.className = 'vision-canvas';
        container.appendChild( labelRenderer.domElement );
        
        // 初始化相机
        const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 100);
        camera.position.set(5, 2, 8);

        // 初始化控制器
        const controls = new OrbitControls(camera, renderer.domElement);
        //设置控制器的中心点
        controls.target.set(0, 0.5, 0);

        controls.enablePan = false;
        // 使动画循环使用时阻尼或自转 意思是否有惯性
        controls.enableDamping = true;
        //动态阻尼系数 就是鼠标拖拽旋转灵敏度
        // 阻尼系数
        controls.dampingFactor = 0.1;
        //是否可以缩放
        controls.enableZoom = false;

        //是否自动旋转
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.5;
        controls.update();

        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('https://medusa-test.oss-cn-hangzhou.aliyuncs.com/TEST/gltf/');
        // dracoLoader.setDecoderConfig({type: 'js'});
        // dracoLoader.preload();

        const loader = new GLTFLoader();
        loader.setDRACOLoader(dracoLoader);
        loader.load('https://fe-cloud.uni-ubi.com/other/1652841762878-LittlestTokyo.glb', function (gltf) {
            console.log(gltf);

            const model = gltf.scene;
            model.position.set(1, 1, 0);
            model.scale.set(0.01, 0.01, 0.01);
            scene.add(model);

            mixer = new THREE.AnimationMixer(model);
            mixer.clipAction(gltf.animations[0]).play();

            animate();
            EE.emit(`progress.${PageIDType.Vision}`, 1);

        }, function (xhr) {
            const loaded = xhr.loaded;
            const total = xhr.total;
            const percent = (loaded / total);
            EE.emit(`progress.${PageIDType.Vision}`, min([percent, 0.99]));

        }, function (e) {

            console.error(e);

        });

        POINT_DATA.forEach(item=> {
            const div = document.createElement('div');
            div.className = 'visionLabel';
            div.textContent = 'sasddasdasdadasdasdasdas'
            div.style.marginTop = '-1em';
            const label = new CSS2DObject( div );
            label.position.set( 0, 0, 0 );
            root.add( label );
            console.log(1111);
            label.layers.set( 0 );

        })
        window.onresize = function () {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(window.innerWidth, window.innerHeight);

        };


        function animate() {

            requestAnimationFrame(animate);

            const delta = clock.getDelta();

            mixer.update(delta);

            controls.update();

            // stats.update();

            renderer.render(scene, camera);

        }

    }, [])

    return <div ref={containerRef}>

    </div>;
};

export default VisionWebGL;
