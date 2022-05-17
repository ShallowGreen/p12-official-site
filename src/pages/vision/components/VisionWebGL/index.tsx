import React, { useRef } from 'react';
import * as THREE from 'three';
import styles from './index.less';

interface IVisionWebGLProps {
}

const VisionWebGL: React.FunctionComponent<IVisionWebGLProps> = (props) => {
    const containerRef = useRef<HTMLDivElement>(null);
    return <div className={styles.visionWebGL} ref={containerRef}>

    </div>;
};

export default VisionWebGL;
