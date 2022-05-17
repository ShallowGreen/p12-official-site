import React, {createContext, useCallback, useState} from 'react';
import {PageIDType} from '@/constant';
import '@/global.css';

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
  const {children} = props;

  const [pageID, setPageID] = useState<PageIDType>(PageIDType.Loading);

  const isLoading = pageID === PageIDType.Loading;

  const handleWheel = (e:React.WheelEvent<HTMLDivElement>) => {
    console.log(e.deltaY);
    // 如果正在加载界面或者已经正在滚动，不处理

    // 如果当前是第一页，只能往后滚，如果当前是最后一夜，只能往前滚
    
  }
  return (
    <GlobalContext.Provider value={{pageID, setPageID, isLoading}}>
      <div onWheel={handleWheel} className="container">
        {children}
      </div>
    </GlobalContext.Provider>
  );
};
