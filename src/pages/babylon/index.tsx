import * as React from 'react';
import styles from './index.less';
interface IBabylonProps {
}

const Babylon: React.FunctionComponent<IBabylonProps> = (props) => {
  return <div className={styles.babylon}>
    <span>Babylon</span>
  </div>;
};

export default Babylon;
