import React, { createContext, useCallback, useState } from 'react';
import { PageIDType } from '@/constant';


export type GlobalContextT = {
  pageID: PageIDType
  setPageID: (pageID: PageIDType) => void;
  isLoading: boolean;
};

export const GlobalContext = createContext<GlobalContextT>({} as GlobalContextT);

type ProviderProps = {
  children: React.ReactNode;
};

export const GlobalProvider = (props: ProviderProps) => {
  const { children } = props;

  const [pageID, setPageID] = useState<PageIDType>(PageIDType.Loading);

  const isLoading = pageID === PageIDType.Loading;

  return (
    <GlobalContext.Provider value={{ pageID, setPageID, isLoading }}>
      {children}
    </GlobalContext.Provider>
  );
};
