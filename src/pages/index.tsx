import React from 'react';
import { GlobalProvider } from '@/context/globalContext';
import Home from './home/index';
import '@/global.less';

const App: React.FunctionComponent = () => {
  return (
    <GlobalProvider >
      <Home />
    </GlobalProvider>
  );
}

export default App;

