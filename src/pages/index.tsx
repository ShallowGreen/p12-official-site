import React from 'react';
import { GlobalProvider } from '@/context/globalContext';
import { Web3Provider } from '@/context/web3Context';
import { WalletConnectProvider } from '@/context/walletConnectContext';
import Home from './home/index';
import '@/global.less';

const App: React.FunctionComponent = () => {
  return (
    <GlobalProvider>
      <Web3Provider>
        <WalletConnectProvider>
          <Home />
        </WalletConnectProvider>
      </Web3Provider>
    </GlobalProvider>
  );
}

export default App;

