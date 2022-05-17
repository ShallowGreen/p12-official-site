import React from 'react';
import {GlobalProvider} from '@/context/globalContext';
import styles from './index.less';

const App: React.FunctionComponent = () => {
  return (
    <GlobalProvider>
      {/* Logo */}
      <div className={styles.logo}>
      </div>
      {/* 导航 */}
      ll
    </GlobalProvider>
  );
}

export default App;

