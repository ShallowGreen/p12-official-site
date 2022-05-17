import {useContext} from 'react';
import {GlobalContext, GlobalContextT} from '@/context/globalContext';

export const useGlobal = (): GlobalContextT => useContext(GlobalContext);
