import React, { createContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { JsonRpcProvider } from '@ethersproject/providers';
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import { convertUtf8ToHex } from "@walletconnect/utils";
import { apiGetAccountAssets, apiGetGasPrices, apiGetAccountNonce } from "@/helpers/api";
import { IInternalEvent } from "@walletconnect/types";
import { IAssetData } from "@/helpers/types";

declare let window: {
    ethereum: ethers.providers.ExternalProvider;
};

export type WalletInfoT = {
    connector: WalletConnect | null;
    fetching: boolean;
    connected: boolean;
    chainId: number;
    showModal: boolean;
    pendingRequest: boolean;
    uri: string;
    accounts: string[];
    address: string;
    result: any | null;
    assets: IAssetData[];
}

export type WalletConnectContextT = {
    walletInfo: WalletInfoT;
    connect: () => void;
    killSession: () => void;
};

const INITIAL_STATE: WalletInfoT = {
    connector: null,
    fetching: false,
    connected: false,
    chainId: 1,
    showModal: false,
    pendingRequest: false,
    uri: "",
    accounts: [],
    address: "",
    result: null,
    assets: [],
};

export const WalletConnectContext = createContext<WalletConnectContextT>({} as WalletConnectContextT);

type ProviderProps = {
    children: React.ReactNode;
};

export const WalletConnectProvider = (props: ProviderProps) => {
    const { children } = props;
    const [walletInfo, setWalletInfo] = useState<WalletInfoT>({
        ...INITIAL_STATE
    });


    // 2. connect函数
    const connect = async () => {
        // bridge url
        const bridge = "https://bridge.walletconnect.org";

        // create new connector
        const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });

        setWalletInfo({ ...walletInfo, connector });

        console.log(connector.connected);
        
        // check if already connected
        if (!connector.connected) {
            // create new session
            await connector.createSession();
        }

        // subscribe to events
        subscribeToEvents(connector);
    };

    const subscribeToEvents = (connector: WalletConnect | null) => {
        console.log('subscribeToEvents', connector);
        
        if (!connector) {
            return;
        }

        connector.on("session_update", async (error, payload) => {
            console.log(`connector.on("session_update")`);

            if (error) {
                throw error;
            }

            const { chainId, accounts } = payload.params[0];
            onSessionUpdate(accounts, chainId);
        });

        connector.on("connect", (error, payload) => {
            console.log(`connector.on("connect")`);

            if (error) {
                throw error;
            }

            onConnect(payload);
        });

        connector.on("disconnect", (error, payload) => {
            console.log(`connector.on("disconnect")`);

            if (error) {
                throw error;
            }

            onDisconnect();
        });

        if (connector.connected) {
            const { chainId, accounts } = connector;
            const address = accounts[0];
            setWalletInfo({
                ...walletInfo,
                connected: true,
                chainId,
                accounts,
                address,
            });
            onSessionUpdate(accounts, chainId);
        }

        setWalletInfo({ ...walletInfo, connector });
    };

    const onSessionUpdate = async (accounts: string[], chainId: number) => {
        console.log('onSessionUpdate', accounts);
        
        const address = accounts[0];
        setWalletInfo({ ...walletInfo, chainId, accounts, address });
        await getAccountAssets({ ...walletInfo, chainId, accounts, address });
    };

    const onConnect = async (payload: IInternalEvent) => {
        console.log(payload, 'payload onConnect');

        const { chainId, accounts } = payload.params[0];
        const address = accounts[0];
        setWalletInfo({
            ...walletInfo,
            connected: true,
            chainId,
            accounts,
            address,
        });
        getAccountAssets({
            ...walletInfo,
            connected: true,
            chainId,
            accounts,
            address,
        });
    };

    const onDisconnect = async () => {
        resetApp();
    };

    const resetApp = async () => {
        setWalletInfo(INITIAL_STATE);
    };

    const getAccountAssets = async (walletInfo: WalletInfoT) => {
        const { address, chainId } = walletInfo;
        setWalletInfo({ ...walletInfo, fetching: true });
        try {
            // get account balances
            const assets = await apiGetAccountAssets(address, chainId);
            console.log(assets, 'assets');
            

            setWalletInfo({ ...walletInfo, fetching: false, address, assets });
        } catch (error) {
            console.error(error);
            setWalletInfo({ ...walletInfo, fetching: false });
        }
    };

    const killSession = async () => {
        const { connector } = walletInfo;
        if (connector) {
            connector.killSession();
        }
        resetApp();
    };

    return (
        <WalletConnectContext.Provider
            value={{ walletInfo, connect, killSession }}
        >
            {children}
        </WalletConnectContext.Provider>
    );
};
