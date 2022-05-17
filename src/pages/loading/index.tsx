import React, { useRef } from 'react';
import classnames from 'classnames';
import WebGLFluidSimulation from './components/WebGLFluidSimulation';
import styles from './index.less';
import LoadingLogo from '@/assets/loading-logo.png';

const Loading: React.FunctionComponent = () => {
    const percentRef = useRef<HTMLSpanElement>(null);

    return <div className={styles.loading}>
        {/* 动效 */}
        <WebGLFluidSimulation/>
        {/* Logo */}
        <div className={styles.logo}>
            <img src={LoadingLogo} alt="P12" className={styles.logoImg} />
        </div>
        {/* 进度 */}
        <div className={styles.loadingPercent}>
            <div className={classnames(styles.dot, styles.dot1)}></div>
            <div className={classnames(styles.dot, styles.dot2)}></div>
            <div className={classnames(styles.dot, styles.dot3)}></div>
            <div className={styles.percent}>
                <span ref={percentRef}>0</span>%
            </div>
            <div className={classnames(styles.dot, styles.dot4)}></div>
            <div className={classnames(styles.dot, styles.dot5)}></div>
            <div className={classnames(styles.dot, styles.dot6)}></div>
        </div>
    </div>;
};

export default Loading;
