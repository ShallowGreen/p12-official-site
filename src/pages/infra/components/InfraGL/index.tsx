import React, { useRef, useEffect, useLayoutEffect } from 'react';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { DDSLoader } from 'three/examples/jsm/loaders/DDSLoader.js';
import {
    CSS2DRenderer
} from 'three/examples/jsm/renderers/CSS2DRenderer.js'
import styles from './index.less';

interface IInfraGLProps {
}

const InfraGL: React.FunctionComponent<IInfraGLProps> = (props) => {
    const containerRef = useRef<HTMLDivElement>(null);
    
    useLayoutEffect(() => {
        // init('test-id');
        const container = document.getElementById('test-id')
        const body = document.body;
        console.log(container);
        
        if(!container) return
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        container.appendChild( renderer.domElement );

        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        const cube = new THREE.Mesh( geometry, material );
        scene.add( cube );

        camera.position.z = 5;

        function animate() {
            requestAnimationFrame( animate );

            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;

            renderer.render( scene, camera );
        };

        animate();
    }, [])

    // useLayoutEffect(() => {
    //     const container = containerRef.current as HTMLDivElement;
    //     const manager = new THREE.LoadingManager();
    //     manager.addHandler(/\.dds$/i, new DDSLoader());
    //     const loader = new OBJLoader(manager);

    //     let width = window.innerHeight;
    //     let height = window.innerHeight;
    //     let deerR: THREE.Object3D;
    //     let dirLight: THREE.Light;
    //     let pointLight: THREE.Light;
    //     const sceneL = new THREE.Scene()

    //     const frustumSize = 45;
    //     let aspect = width / height;
    //     const scene = new THREE.Scene() // 场景
    //     const camera = new THREE.OrthographicCamera(
    //         frustumSize * aspect / - 2,
    //         frustumSize * aspect / 2,
    //         frustumSize / 2,
    //         frustumSize / - 2,
    //         -1000, 1000)

    //     let moveY: number = 0, moveX: number = 0;

    //     const lightGroup = new THREE.Group();
    //     const elementGroup = new THREE.Group();
    //     const elementLGroup = new THREE.Group();

    //     const renderer = new THREE.WebGLRenderer({ // 渲染器
    //         antialias: true, //抗锯齿
    //     })

    //     const canvasDom = document.getElementsByTagName('canvas')[2];
    //     const controls = new OrbitControls(
    //         camera,
    //         renderer.domElement
    //     );
    //     controls.enabled = false


    //     container.appendChild(renderer.domElement)

    //     scene.background = new THREE.Color(0xcfdedb)
    //     sceneL.background = new THREE.Color(0xcfdedb)

    //     scene.position.setY(-20)
    //     sceneL.position.setY(-20)

    //     renderer.setPixelRatio(window.devicePixelRatio); //设置渲染的比例
    //     renderer.setSize(width, window.innerHeight); //设置渲染的尺寸
    //     renderer.setScissorTest(true);

    //     const labelRenderer = new CSS2DRenderer();
    //     labelRenderer.setSize(window.innerWidth, window.innerHeight);
    //     labelRenderer.domElement.style.position = "absolute";
    //     labelRenderer.domElement.style.top = "0";
    //     labelRenderer.domElement.style.pointerEvents = "none";
    //     container.appendChild(labelRenderer.domElement);

    //     // 渲染
    //     const render = function () {
    //         const time = Date.now() * 0.0005;
    //         controls.update(); //更新控制器

    //         // 移动灯光
    //         if (dirLight) {

    //             dirLight.position.x = Math.cos(time * 0.1) * 15;
    //             dirLight.position.z = Math.sin(time * 0.1) * 15;

    //             pointLight.position.x = Math.cos(time * 0.1) * 15;
    //             pointLight.position.z = Math.sin(time * 0.1) * 15;
    //         }

    //         camera.position.x = Math.abs(Math.cos(time * 0.2)) * 2
    //         camera.updateProjectionMatrix()

    //         // 移动透视场景
    //         if (deerR && sceneL) {
    //             renderer.setScissor(0, 0, width, height);
    //             renderer.render(scene, camera);
    //             const w = width / 3

    //             renderer.setScissor(moveX - w / 2, height - moveY - w / 2, w, w);
    //             renderer.render(sceneL, camera);

    //             labelRenderer.render(sceneL, camera);
    //         }
    //     }

    //     renderer.setAnimationLoop(render);

    //     const animate = () => {
    //         requestAnimationFrame(animate);
    //     }

    //     camera.position.set(0, 6, 30);

    //     animate();

    //     const initPlane = function () {
    //         const geometry = new THREE.PlaneGeometry(300, 150);
    //         const material = new THREE.MeshLambertMaterial({ color: 0xdcdcdc, side: THREE.DoubleSide });
    //         const plane = new THREE.Mesh(geometry, material);
    //         plane.rotateX(Math.PI * 0.5)
    //         plane.receiveShadow = true
    //         elementGroup.add(plane)

    //         const material1 = new THREE.MeshBasicMaterial({ color: 0xdcdcdc, side: THREE.DoubleSide });
    //         const Lplane = new THREE.Mesh(geometry, material1);
    //         Lplane.rotateX(Math.PI * 0.5)

    //         elementLGroup.add(Lplane)
    //     }
    //     initPlane();

    //     loader
    //         .load(
    //             'https://medusa-test.oss-cn-hangzhou.aliyuncs.com/TEST/model/deer.obj',
    //             function (object) {
    //                 const deerL = object.children[0];

    //                 deerL.material = new THREE.MeshPhongMaterial({
    //                     color: 0xe9d8c8
    //                 })
    //                 deerL.position.setZ(-6)
    //                 // deerL.position.setY(-2)
    //                 deerL.scale.set(0.6, 0.6, 0.6)
    //                 elementGroup.add(deerL)
    //                 deerR = deerL.clone()
    //                 deerR.material = new THREE.MeshBasicMaterial({
    //                     color: 0x000000,   //颜色
    //                     wireframe: true,  //是否只显示网格
    //                     transparent: true,
    //                     opacity: 0.2,
    //                 });;
    //                 elementLGroup.add(deerR)
    //                 elementGroup.traverse(ele => {
    //                     if (ele.type !== 'Group') {
    //                         ele.castShadow = true
    //                         ele.receiveShadow = true
    //                     }
    //                 })
    //             },
    //             () => { },
    //             (error) => console.log(error)
    //         );

    //     // 鼠标移动事件
    //     const mouseMove = function (event: any) {
    //         const y = event.pageY
    //         const x = event.pageX - ((window.innerWidth - width) / 2)
    //         moveX = x
    //         moveY = y
    //     }


    //     // 屏幕尺寸变化
    //     const onWindowResize = () => {
    //         width = window.innerHeight;
    //         height = window.innerHeight;
    //         aspect = width / height;
    //         camera.left = - frustumSize * aspect / 2;
    //         camera.right = frustumSize * aspect / 2;
    //         camera.top = frustumSize / 2;
    //         camera.bottom = - frustumSize / 2;
    //         camera.updateProjectionMatrix();
    //         controls.update(); //更新控制器
    //         renderer.setSize(window.innerHeight, window.innerHeight);
    //     }

    //     window.addEventListener("mousemove", mouseMove, false);
    //     window.addEventListener("resize", onWindowResize, false);

    //     return () => {
    //         window.removeEventListener("mousemove", mouseMove)
    //         window.removeEventListener("resize", onWindowResize)
    //     }
    // }, [])

    return <div className={styles.infraGL} ref={containerRef} id="test-id">
        
    </div>;
};

export default InfraGL;
