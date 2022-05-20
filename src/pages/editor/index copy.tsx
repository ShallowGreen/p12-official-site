import React, { useRef, useLayoutEffect } from 'react';
import Parallax from 'parallax-js';
import classnames from 'classnames';
import Rope from '@/assets/editor/rope.png';
import styles from './index.less';
import './parallax.css';

interface IEditorProps {
}

const Editor: React.FunctionComponent<IEditorProps> = (props) => {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const parallax = new Parallax(parallaxRef.current);
  }, [])
  return <div className={styles.editor}>
    {/* 视差效果 */}
    <div ref={parallaxRef} className="scene unselectable">
      <div className="layer" data-depth="0.00"></div>
      {/* 背景图 */}
      <div className="layer" data-depth="0.10">
        <div className="background"></div>
      </div>

      <div className="layer" data-depth="0.10">
        <div className="light orange b phase-4"></div>
      </div>

      <div className="layer" data-depth="0.10">
        <div className="light purple c phase-5"></div>
      </div >

      <div className="layer" data-depth="0.10">
        <div className="light orange d phase-3"></div>
      </div>

      {/* 绳子和云 */}
      <div className="layer" data-depth="0.15">
        <div className="rope depth-10">
          <div>
            <img src={Rope} alt="Rope" />
          </div>
          <div className="hanger position-2">
            <div className="board cloud-2 swing-1"></div>
          </div>
          <div className="hanger position-4">
            <div className="board cloud-1 swing-3"></div>
          </div>
          <div className="hanger position-8">
            <div className="board birds swing-5"></div>
          </div>
        </div>
      </div>

      {/* 绳子和云 */}
      <div className="layer" data-depth="0.15">
        <div className="rope depth-30">
          <div>
            <img src={Rope} alt="Rope" />
          </div>
          <div className="hanger position-1">
            <div className="board cloud-1 swing-3"></div>
          </div>
          <div className="hanger position-5">
            <div className="board cloud-4 swing-1"></div>
          </div>
        </div>
      </div>

      {/* 波浪 */}
      <div className="layer" data-depth="0.30">
        <div className="wave paint depth-30">
        </div>
      </div>
      <div className="layer" data-depth="0.40">
        <div className="wave plain depth-40">
        </div>
      </div>
      <div className="layer" data-depth="0.50">
        <div className="wave paint depth-50">
        </div>
      </div>

      <div className="layer" data-depth="0.60">
        <div className="lighthouse depth-60">
        </div>
      </div>

      <div className="layer" data-depth="0.60">
        <div className="rope depth-60">
          <div>
            <img src={Rope} alt="Rope" />
          </div>
          <div className="hanger position-3">
            <div className="board birds swing-5"></div>
          </div>
          <div className="hanger position-6">
            <div className="board cloud-2 swing-2"></div>
          </div>
          <div className="hanger position-8">
            <div className="board cloud-3 swing-4"></div>
          </div>
        </div>
      </div>

      <div className="layer" data-depth="0.60">
        <div className="wave plain depth-60">
        </div>
      </div>

      <div className="layer" data-depth="0.80">
        <div className="wave plain depth-80">
        </div>
      </div>

      <div className="layer" data-depth="1.00">
        <div className="wave paint depth-100">
        </div>
      </div>

    </div>
  </div>;
};

export default Editor;
