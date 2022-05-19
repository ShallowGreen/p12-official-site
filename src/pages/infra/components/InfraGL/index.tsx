import React, { useRef, useEffect, useLayoutEffect } from 'react';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { DDSLoader } from 'three/examples/jsm/loaders/DDSLoader.js';
import {
    CSS2DRenderer
} from 'three/examples/jsm/renderers/CSS2DRenderer.js'
import styles from './index.less';
import init from './three';
interface IInfraGLProps {
}

const InfraGL: React.FunctionComponent<IInfraGLProps> = (props) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        // const container = containerRef.current as HTMLDivElement;
        // const scene = new THREE.Scene();
		// 	const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

		// 	const renderer = new THREE.WebGLRenderer();
		// 	renderer.setSize( window.innerWidth, window.innerHeight );
		// 	container.appendChild( renderer.domElement );

		// 	const geometry = new THREE.BoxGeometry();
		// 	const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
		// 	const cube = new THREE.Mesh( geometry, material );
		// 	scene.add( cube );

		// 	camera.position.z = 5;

		// 	function animate() {
		// 		requestAnimationFrame( animate );

		// 		cube.rotation.x += 0.01;
		// 		cube.rotation.y += 0.01;

		// 		renderer.render( scene, camera );
		// 	};

		// 	animate();
    }, [])

    // useLayoutEffect(() => {
    //     const container = containerRef.current as HTMLDivElement;
    //     const manager = new THREE.LoadingManager();
    //     manager.addHandler(/\.dds$/i, new DDSLoader());
    //     const loader = new OBJLoader(manager);

    //     let width = window.innerHeight;
    //     let height = window.innerHeight;
    //     let deerR: THREE.Object3D;
    //     let dirLight: THREE.DirectionalLight;
    //     let pointLight: THREE.PointLight;
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

    //     const axesHelper = new THREE.AxesHelper(1000);
    //     scene.add(axesHelper);
    //     // sceneL.add( axesHelper );

    //     const lightGroup = new THREE.Group();
    //     const elementGroup = new THREE.Group();
    //     const elementLGroup = new THREE.Group();

    //     const renderer = new THREE.WebGLRenderer({ // 渲染器
    //         antialias: true, //抗锯齿
    //     })
    //     container.appendChild(renderer.domElement);

    //     /**
    //      * 初始化灯光
    //     */
    //     const initLight = function () {
    //         const light = new THREE.AmbientLight(0xffffff, 0.2); // soft white light
    //         lightGroup.add(light);

    //         // 移动点光源
    //         pointLight = new THREE.PointLight(0xffffff, 0.8, 100);
    //         pointLight.position.set(50, 30, 50);
    //         lightGroup.add(pointLight);

    //         if (dirLight) return
    //         dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    //         // dirLight.color = new THREE.Color("rgb(255, 255, 255)");
    //         dirLight.position.set(- 1, 1.75, 1);
    //         dirLight.position.multiplyScalar(30);
    //         lightGroup.add(dirLight);

    //         dirLight.castShadow = true;

    //         dirLight.shadow.mapSize.width = 2048;
    //         dirLight.shadow.mapSize.height = 2048;

    //         const d = 50;

    //         dirLight.shadow.camera.left = - d;
    //         dirLight.shadow.camera.right = d;
    //         dirLight.shadow.camera.top = d;
    //         dirLight.shadow.camera.bottom = - d;

    //         dirLight.shadow.camera.far = 3500;
    //         dirLight.shadow.bias = - 0.001;
    //     }

    //     initLight();
    //     console.log(container.childNodes[0],'container');
        
    //     const controls = new OrbitControls(
    //         camera,
    //         container.childNodes[0] as any
    //       );

    //     scene.position.setY(-20)
    //     sceneL.position.setY(-20)
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

    //             // labelRenderer.render(sceneL, camera);
    //         }
    //     }
    //     renderer.setPixelRatio(window.devicePixelRatio); //设置渲染的比例
    //     renderer.setSize(width, window.innerHeight); //设置渲染的尺寸
    //     renderer.setScissorTest(true);
    //     renderer.setAnimationLoop(render);

    //     camera.position.set(0, 6, 30)




    //     return () => {
    //     }
    // }, [])

    return <div className={styles.infraGL} ref={containerRef} id="test-id">

    </div>;
};

export default InfraGL;
