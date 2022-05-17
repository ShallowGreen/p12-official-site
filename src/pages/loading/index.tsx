import * as React from 'react';
import styles from './index.less';
interface ILoadingProps {
}

const Loading: React.FunctionComponent<ILoadingProps> = (props) => {
  return <div className={styles.loading}>
      loading
  </div>;
};

export default Loading;
