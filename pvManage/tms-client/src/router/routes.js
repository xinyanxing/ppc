import { RouteChildren } from './RouteChildren';

import { Options } from '../view/options/inidex.tsx';
import { LayoutIndex } from '../view/options/layoutIndex.tsx';
import { Options2 } from '../view/options/Options2.tsx';
import { Options3 } from '../view/options/Options3.tsx';


//路由模板链接d

const routes = [
    {
        path: '/',
        exact: true,
        component: LayoutIndex,
        linkName: '首页',
    },
    {
        path: '/Coursecenter',
        linkName: '设置1',
        component: RouteChildren,
        routes: [
            {
                path: '/Coursecenter',
                exact: true,
                component: Options,
                linkName: '设置1-1',
            },
            {
                path: '/Coursecenter/3',
                component: Options3,
                linkName: '设置1-3',
            }
        ]
    },
    {
        path: '/PersonCenter',
        component: Options2,
        linkName: '设置2',
    },

];
export { routes };