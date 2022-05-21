import {useContext} from 'react';
import {WalletConnectContext, WalletConnectContextT} from '@/context/walletConnectContext';

export const useWalletConnect = (): WalletConnectContextT => useContext(WalletConnectContext);
