import React, { useRef, useLayoutEffect, useState } from 'react';
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
import classnames from 'classnames';
import styles from './index.less';

interface IVisionWebGLProps {
}

// 点位数据：定位、摄像头位置
const POINT_DATA = [
    {
        // 寿司店
        position: new THREE.Vector3(1.6, 1.7, 0.3),
        camera: new THREE.Vector3(8, 2, 0),
        data: {
            title: '寿司屋',
            desc: <>
                寿司のすべての部分が私たちの魂に注意深く注入されています
                <br />
                町の南東の角にある3階にあります
            </>
        }
    },
    {
        // 理髪店
        position: new THREE.Vector3(2.3, 0, 1.3),
        camera: new THREE.Vector3(8, 2, 0),
        data: {
            title: '理髪店',
            desc: <>
                あなたのサービスで超素晴らしい先生トニー
                <br />
                町の南東の角にある1階にあります
            </>
        }
    },
    {
        // 武蔵野園
        position: new THREE.Vector3(1.8, 0.3, -1.7),
        camera: new THREE.Vector3(0, 2, -8),
        data: {
            title: '武蔵野園',
            desc: <>
                町で最も新鮮なシーフードはここで購入でき、30分で行くことができます。
                <br />
                町の北東の角にある1階にあります
            </>
        }
    },
    {
        // 海洋
        position: new THREE.Vector3(-1, 0.2, 1.5),
        camera: new THREE.Vector3(0, 2, 8),
        data: {
            title: '海洋',
            desc: <>
                町で最も新鮮な花を持って、2時間のスピード
                <br />
                町の南西の角にある1階にあります
            </>
        }
    }
]

const VisionWebGL: React.FunctionComponent<IVisionWebGLProps> = (props) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState<number | null>(null);

    useLayoutEffect(() => {
        let mixer: THREE.AnimationMixer;
        const clock = new THREE.Clock();
        const container = containerRef.current as HTMLDivElement;
        let isAutoRotate: boolean = true;
        let root: THREE.Group;

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
        scene.add(root);

        const labelRenderer = new CSS2DRenderer();
        labelRenderer.setSize(container.clientWidth, container.clientHeight);
        // labelRenderer.domElement.style.position = 'absolute';
        // labelRenderer.domElement.style.top = '0px';
        labelRenderer.domElement.style.pointerEvents = 'none';
        labelRenderer.domElement.className = 'vision-canvas';
        container.appendChild(labelRenderer.domElement);

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
        let model: THREE.Group;

        const loader = new GLTFLoader();
        loader.setDRACOLoader(dracoLoader);
        loader.load('https://fe-cloud.uni-ubi.com/other/1652841762878-LittlestTokyo.glb', function (gltf) {
            model = gltf.scene;
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

        const handleReset = () => {

        }

        const handleClick = (index: number) => {
            // TODO 完善效果
            // const data = POINT_DATA[index];
            // console.log(data);
            // setActive(index)
            // // 停止自动旋转
            // controls.autoRotate = false;
            // // 固定摄像头位置
            // camera.position.set(data.camera.x, data.camera.y, data.camera.z);
            // // 隐藏所有点
            // root.layers.set(0)
        
        }

        POINT_DATA.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'vision-label';
            // div.textContent = 'test'
            const label = new CSS2DObject(div);
            label.position.set(item.position.x, item.position.y, item.position.z);
            root.add(label);

            div.addEventListener('click', () => handleClick(index))
        })


        window.onresize = function () {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(window.innerWidth, window.innerHeight);
            labelRenderer.setSize(window.innerWidth, window.innerHeight);

        };


        function animate() {

            requestAnimationFrame(animate);

            const delta = clock.getDelta();

            mixer.update(delta);

            controls.update();

            // stats.update();

            renderer.render(scene, camera);
            labelRenderer.render(scene, camera);

        }

    }, [])

    return <div ref={containerRef}>
        <div className={styles.visionText}>
            {
                POINT_DATA.map((item, index) => {
                    return <div key={item.data.title} className={(classnames(styles.textItem, active === index ? styles.activeItem : null))}>
                        <div className={styles.visionTextTitle}>
                            {item.data.title}
                        </div>
                        <div className={styles.visionTextDesc}>
                            {item.data.desc}
                        </div>
                    </div>
                })
            }
        </div>
    </div>;
};

export default VisionWebGL;
