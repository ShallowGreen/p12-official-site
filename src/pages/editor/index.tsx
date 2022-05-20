import React, { useRef, useLayoutEffect } from 'react';
import Parallax from 'parallax-js';
import classnames from 'classnames';
import { Autoplay, Mousewheel } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';
import 'swiper/swiper.less'; // core Swiper
import Rope from '@/assets/editor/rope.png';
import styles from './index.less';

interface IEditorProps {
}

const SWIPER_CONTENT = [
  {
    title: 'StyleFusion',
    desc: (
      <>
        Styles co-exist in one Metaverse
        <br />
        Aesthetical inclusivity for diverse user base
      </>
    ),
  },
  {
    title: 'Non-voxel',
    desc: (
      <>
        Supports external 3D models
        <br />
        Enables diverse style and full expressiveness
      </>
    ),
  },
  {
    title: 'Full-programmability',
    desc: (
      <>
        Full-fledged scripting support for complex gameplay
        <br />
        Runtime PC + Mobile support from day 1
      </>
    ),
  },
  {
    title: 'Lego-like',
    desc: (
      <>
        Reusability for code templates,
        <br />
        graphic assets, and even tokenomics boilerplates
      </>
    ),
  },
]

const Editor: React.FunctionComponent<IEditorProps> = (props) => {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const parallax = new Parallax(parallaxRef.current);

    return () => {
      parallax.destroy();
    }
  }, [])
  return <div className={styles.editor}>
    {/* 视差效果 */}
    <div ref={parallaxRef} className={styles.parallax}>
      <div className={styles.layers} data-depth="0.00"></div>
      {/* 背景图 */}
      <div className={classnames(styles.layers, styles.bgContainer)} data-depth="0.10">
        <div className={styles.background}></div>
      </div>

      <div className={styles.layers} data-depth="0.10">
        <div className={classnames(styles.light, styles.orange, styles.b, styles['phase-4'])}></div>
      </div>

      <div className={styles.layers} data-depth="0.10">
        <div className={classnames(styles.light, styles.purple, styles.c, styles['phase-5'])}></div>
      </div >

      <div className={styles.layers} data-depth="0.10">
        <div className={classnames(styles.light, styles.orange, styles.d, styles['phase-3'])}></div>
      </div>

      {/* 绳子和云 */}
      <div className={styles.layers} data-depth="0.15">
        <div className={classnames(styles.rope, styles['depth-10'])}>
          <div>
            <img src={Rope} alt="Rope" />
          </div>
          <div className={classnames(styles.hanger, styles['position-2'])}>
            <div className={classnames(styles.board, styles['cloud-2'], styles['swing-1'])}></div>
          </div>
          <div className={classnames(styles.hanger, styles['position-4'])}>
            <div className={classnames(styles.board, styles['cloud-1'], styles['swing-3'])}></div>
          </div>
          <div className={classnames(styles.hanger, styles['position-8'])}>
            <div className={classnames(styles.board, styles.birds, styles['swing-5'])}></div>
          </div>
        </div>
      </div>

      {/* 绳子和云 */}
      <div className={styles.layers} data-depth="0.15">
        <div className={classnames(styles.rope, styles['depth-30'])}>
          <div>
            <img src={Rope} alt="Rope" />
          </div>
          <div className={classnames(styles.hanger, styles['position-1'])}>
            <div className={classnames(styles.board, styles['cloud-1'], styles['swing-3'])}></div>
          </div>
          <div className={classnames(styles.hanger, styles['position-5'])}>
            <div className={classnames(styles.board, styles['cloud-4'], styles['swing-1'])}></div>
          </div>
        </div>
      </div>

      {/* 波浪 */}
      <div className={styles.layers} data-depth="0.30">
        <div className={classnames(styles.wave, styles.paint, styles['depth-30'])}>
        </div>
      </div>
      <div className={styles.layers} data-depth="0.40">
        <div className={classnames(styles.wave, styles.plain, styles['depth-40'])}>
        </div>
      </div>
      <div className={styles.layers} data-depth="0.50">
        <div className={classnames(styles.wave, styles.paint, styles['depth-50'])}>
        </div>
      </div>

      <div className={styles.layers} data-depth="0.60">
        <div className={classnames(styles.lighthouse, styles['depth-60'])}>
        </div>
      </div>

      <div className={styles.layers} data-depth="0.60">
        <div className={classnames(styles.rope, styles['depth-60'])}>
          <div>
            <img src={Rope} alt="Rope" />
          </div>
          <div className={classnames(styles.hanger, styles['position-3'])}>
            <div className={classnames(styles.board, styles.birds, styles['swing-5'])}></div>
          </div>
          <div className={classnames(styles.hanger, styles['position-6'])}>
            <div className={classnames(styles.board, styles['cloud-2'], styles['swing-2'])}></div>
          </div>
          <div className={classnames(styles.hanger, styles['position-8'])}>
            <div className={classnames(styles.board, styles['cloud-3'], styles['swing-4'])}></div>
          </div>
        </div>
      </div>

      <div className={styles.layers} data-depth="0.60">
        <div className={classnames(styles.wave, styles.plain, styles['depth-60'])}>
        </div>
      </div>

      <div className={styles.layers} data-depth="0.80">
        <div className={classnames(styles.wave, styles.plain, styles['depth-80'])}>
        </div>
      </div>

      <div className={styles.layers} data-depth="1.00">
        <div className={classnames(styles.wave, styles.paint, styles['depth-100'])}>
        </div>
      </div>
    </div>

    {/* 内容 */}
    <div className={styles.infoWrap}>
      <div className={styles.info}>
        <div className={styles.theEditor}></div>
        <div className={styles.subTitle}>
          BEST METAVERSE EDITOR IN WEB3
        </div>

        <div className={classnames(styles.description, styles.description1)}>
          by a top R&amp;D team with 500+ people that built a 12
          million DAU gaming platform
        </div>
        <div className={classnames(styles.description, styles.description2)}>
          The Editor is backed by a strong R&amp;D team with
          proven track record in gaming.
        </div>
        <div className={styles.content}>
          <div className={styles.contentTitle}>
            Features
          </div>
          <Swiper
            className={styles.swiperWrap}
            direction={"vertical"}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, Mousewheel]}
            loop 
            mousewheel={false}>
            {
              SWIPER_CONTENT.map(item => {
                return <SwiperSlide className={styles.swiperSlide} >
                  <div className={styles.swiperSlideTitle}>
                    {item.title}
                  </div>
                  <div className={styles.swiperSlideDesc}>
                    {item.desc}
                  </div>
                </SwiperSlide>
              })
            }
          </Swiper>

        </div>
      </div>
    </div>
  </div>;
};

export default Editor;
