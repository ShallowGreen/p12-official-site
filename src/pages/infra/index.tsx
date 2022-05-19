import * as React from 'react';
import styles from './index.less';
import InfraGL from './components/InfraGL'

interface IInfraProps {
}

const Infra: React.FunctionComponent<IInfraProps> = (props) => {
  return <div className={styles.infra}>
      <InfraGL />
  </div>;
};

export default Infra;
