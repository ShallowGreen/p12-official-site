import React from 'react';
import Loading from '@/pages/loading';
import Vision from '@/pages/vision';
import Editor from '@/pages/editor';
import Infra from '@/pages/infra';
import Babylon from '@/pages/babylon';
import { PageIDType } from './index';

export type MenuListType = {
    type: PageIDType,
    menuTitle: null | string,
    component: JSX.Element
}[]

export const MENU_LIST: MenuListType = [
    {
        type: PageIDType.Loading,
        menuTitle: null,
        component: <Loading />
    },
    {
        type: PageIDType.Vision,
        menuTitle: PageIDType.Vision,
        component: <Vision />
    },
    {
        type: PageIDType.Babylon,
        menuTitle: PageIDType.Babylon,
        component: <Babylon />
    },
    {
        type: PageIDType.Editor,
        menuTitle: PageIDType.Editor,
        component: <Editor />
    },
    {
        type: PageIDType.Infra,
        menuTitle: PageIDType.Infra,
        component: <Infra />
    },
]