import * as React from 'react';
import { useGlobal } from '@/hooks/useGlobal';
import classnames from 'classnames';
import VisionWebGL from './components/VisionWebGL'
import styles from './index.less';
interface IVisionProps {
}

const Vision: React.FunctionComponent<IVisionProps> = (props) => {
  const { pageID, setPageID } = useGlobal();

  return <div className={styles.vision}>
    <VisionWebGL />
    <div className={styles.info}>
      <div className={styles.projectName}></div>
      <div className={styles.subTitle}>
        EDITOR<i className={styles.subTitleGap}></i>INFRA
        <i className={styles.subTitleGap}></i>ECONS
      </div>
      <div className={styles.smallTitle}>
        Empowering Metaworlds
      </div>
      <div className={classnames(styles.description, styles.description1)}>
        Project Twelve, P12 for short, is a GameFi ecosystem
        <br /> with sustainable economy
      </div>
      <div className={classnames(styles.description, styles.description2)}>
        The scope of the project covers the Editor, the Infra,
        <br /> and the Econs
      </div>
    </div>
  </div>;
};

export default Vision;
