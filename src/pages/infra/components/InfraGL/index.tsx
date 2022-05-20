import React, { useRef, useLayoutEffect } from 'react';
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
        const container = containerRef.current as HTMLDivElement;
        const manager = new THREE.LoadingManager();
        manager.addHandler(/\.dds$/i, new DDSLoader());
        const loader = new OBJLoader(manager);

        let width = window.innerHeight;
        let height = window.innerHeight;
        let deerR: THREE.Object3D;
        let dirLight: THREE.DirectionalLight;
        let pointLight: THREE.PointLight;
        const sceneL = new THREE.Scene()

        const frustumSize = 45;
        let aspect = width / height;
        const scene = new THREE.Scene() // 场景
        const camera = new THREE.OrthographicCamera(
            frustumSize * aspect / - 2,
            frustumSize * aspect / 2,
            frustumSize / 2,
            frustumSize / - 2,
            -1000, 1000)
        const renderer = new THREE.WebGLRenderer({ // 渲染器
            antialias: true, //抗锯齿
            alpha: true
        })
        renderer.shadowMap.enabled = true;
        renderer.outputEncoding = THREE.sRGBEncoding;

        const canvasDom = container.childNodes[0] as HTMLElement;

        const controls = new OrbitControls(
            camera,
            renderer.domElement
        );
        controls.enabled = false

        const lightGroup = new THREE.Group()
        const elementGroup = new THREE.Group()
        const elementLGroup = new THREE.Group()

        let moveY: number = 0;
        let moveX: number = 0;

        scene.add(lightGroup)
        scene.add(elementGroup)
        sceneL.add(elementLGroup)

        const animate = () => {
            requestAnimationFrame(animate);
        }

        // 屏幕尺寸变化
        const onWindowResize = () => {
            width = window.innerHeight;
            height = window.innerHeight;
            aspect = width / height;
            camera.left = - frustumSize * aspect / 2;
            camera.right = frustumSize * aspect / 2;
            camera.top = frustumSize / 2;
            camera.bottom = - frustumSize / 2;
            camera.updateProjectionMatrix();
            controls.update(); //更新控制器
            renderer.setSize(window.innerHeight, window.innerHeight);
        }

        // 地面
        const initPlane = function () {
            const geometry = new THREE.PlaneGeometry(300, 220);
            const material = new THREE.MeshLambertMaterial({ color: 0xdcdcdc, side: THREE.DoubleSide });
            const plane = new THREE.Mesh(geometry, material);
            plane.rotateX(Math.PI * 0.5)
            plane.receiveShadow = true
            elementGroup.add(plane)

            const material1 = new THREE.MeshBasicMaterial({ color: 0xdcdcdc, side: THREE.DoubleSide });
            const Lplane = new THREE.Mesh(geometry, material1);
            Lplane.rotateX(Math.PI * 0.5)

            elementLGroup.add(Lplane)
        }

        /**
         * 初始化灯光
        */
        const initLight = function () {
            const light = new THREE.AmbientLight(0xffffff, 0.2); // soft white light
            lightGroup.add(light);

            // 移动点光源
            pointLight = new THREE.PointLight(0xffffff, 0.8, 100);
            pointLight.position.set(50, 30, 50);
            lightGroup.add(pointLight);

            if (dirLight) return

            console.log(dirLight, 'dirLight');
            
            dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
            // dirLight.color = new THREE.Color("rgb(255, 255, 255)");
            dirLight.position.set(- 1, 1.75, 1);
            dirLight.position.multiplyScalar(30);
            lightGroup.add(dirLight);

            dirLight.castShadow = true;

            dirLight.shadow.mapSize.width = 2048;
            dirLight.shadow.mapSize.height = 2048;

            const d = 50;

            dirLight.shadow.camera.left = - d;
            dirLight.shadow.camera.right = d;
            dirLight.shadow.camera.top = d;
            dirLight.shadow.camera.bottom = - d;

            dirLight.shadow.camera.far = 3500;
            dirLight.shadow.bias = - 0.001;

        }

        initLight()


        // 渲染
        const render = function () {
            const time = Date.now() * 0.0005;
            controls.update(); //更新控制器

            // 移动灯光
            if (dirLight) {

                dirLight.position.x = Math.cos(time * 0.1) * 15;
                dirLight.position.z = Math.sin(time * 0.1) * 15;

                pointLight.position.x = Math.cos(time * 0.1) * 15;
                pointLight.position.z = Math.sin(time * 0.1) * 15;
            }

            camera.position.x = Math.abs(Math.cos(time * 0.2)) * 2
            camera.updateProjectionMatrix()

            // 移动透视场景
            if (deerR && sceneL) {
                renderer.setScissor(0, 0, width, height);
                renderer.render(scene, camera);
                const w = width / 3

                renderer.setScissor(moveX - w / 2, height - moveY - w / 2, w, w);
                renderer.render(sceneL, camera);

            }
        }

        container.appendChild(renderer.domElement);
        scene.position.setY(-20)
        sceneL.position.setY(-20)

        renderer.setPixelRatio(window.devicePixelRatio); //设置渲染的比例
        renderer.setSize(width, window.innerHeight); //设置渲染的尺寸
        renderer.setScissorTest(true);
        renderer.setAnimationLoop(render);

        camera.position.set(0, 6, 30)
        animate()

        initPlane()

        // 鹿
        loader
            .load(
                'https://medusa-test.oss-cn-hangzhou.aliyuncs.com/TEST/model/deer.obj',
                function (object) {
                    const deerL = object.children[0];
                    (deerL as any).material = new THREE.MeshPhongMaterial({
                        color: 0xe9d8c8
                    })
                    console.log(deerL)
                    deerL.position.setZ(-6)
                    // deerL.position.setY(-2)
                    deerL.scale.set(0.7, 0.7, 0.7)
                    elementGroup.add(deerL)
                    deerR = deerL.clone();
                    (deerR as any).material = new THREE.MeshBasicMaterial({
                        color: 0x000000,   //颜色
                        wireframe: true,  //是否只显示网格
                        transparent: true,
                        opacity: 0.2,
                    });;
                    elementLGroup.add(deerR)
                },
                function () {

                },
                (error) => {
                    console.log(error);
                }
            );

        // 云
        loader
            .load(
                'https://medusa-test.oss-cn-hangzhou.aliyuncs.com/TEST/model/Cloud1.obj',
                function (object) {
                    const cloud1 = object.children[0];
                    (cloud1 as any).material.color = new THREE.Color(0xffffff)
                    cloud1.position.set(15, 26, -10)
                    cloud1.scale.set(3, 3, 3)
                    elementGroup.add(cloud1)

                    const cloud1L = cloud1.clone();
                    (cloud1L as any).material = new THREE.MeshBasicMaterial({
                        color: 0xffffff,   //颜色
                        wireframe: true,  //是否只显示网格
                        transparent: true,
                        opacity: 0.2,
                    });
                    elementLGroup.add(cloud1L)
                },
                function () {

                },
                (error) => {
                    console.log(error);
                }
            );

        loader
            .load(
                'https://medusa-test.oss-cn-hangzhou.aliyuncs.com/TEST/model/Cloud2.obj',
                function (object) {
                    const cloud2 = object.children[0];
                    (cloud2 as any).material.color = new THREE.Color(0xffffff)
                    cloud2.position.set(0, 35, 0)
                    cloud2.scale.set(3, 3, 3)
                    elementGroup.add(cloud2)

                    const cloud2L = cloud2.clone();
                    (cloud2L as any).material = new THREE.MeshBasicMaterial({
                        color: 0xffffff,   //颜色
                        wireframe: true,  //是否只显示网格
                        transparent: true,
                        opacity: 0.2,
                    });
                    elementLGroup.add(cloud2L)
                },
                function () {

                },
                (error) => {
                    console.log(error);
                }
            );

        loader
            .load(
                'https://medusa-test.oss-cn-hangzhou.aliyuncs.com/TEST/model/Cloud3.obj',
                function (object) {
                    const cloud3 = object.children[0];
                    (cloud3 as any).material.color = new THREE.Color(0xffffff)
                    cloud3.position.set(-20, 28, 0)
                    cloud3.scale.set(2.5, 2.5, 2.5)
                    elementGroup.add(cloud3)

                    const cloud3L = cloud3.clone();
                    (cloud3L as any).material = new THREE.MeshBasicMaterial({
                        color: 0xffffff,   //颜色
                        wireframe: true,  //是否只显示网格
                        transparent: true,
                        opacity: 0.2,
                    });
                    // cloud
                    elementLGroup.add(cloud3L)
                },
                function () {

                },
                (error) => {
                    console.log(error);
                }
            );

        // 鼠标移动事件
        const mouseMove = function (event: any) {
            const y = event.pageY
            const x = event.pageX - ((window.innerWidth - width) / 2)
            moveX = x
            moveY = y
        }

        window.addEventListener("mousemove", mouseMove, false);
        window.addEventListener("resize", onWindowResize, false);
        return () => {
            window.removeEventListener("mousemove", mouseMove)
            window.removeEventListener("resize", onWindowResize)
        }
    }, [])

    return <div className={styles.infraGL} ref={containerRef} id="test-id">

    </div>;
};

export default InfraGL;
