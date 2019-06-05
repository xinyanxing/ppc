import React from 'react';
import styled from 'styled-components';

import { history } from './router';
import { fakeMenuList } from 'router/fakeMenuList';
import { Router } from 'react-router-dom';
import TmsRoleMnu from 'tms-common-role-menu';

import routes from 'router/routes';

import 'antd/dist/antd.min.css';
import 'tms-common-role-menu/lib/app.css';

const DescriptionComponent = styled.div`
    padding: 10px 0 5px 27px;
    color: #fff;
    h2 {
        font-size: 1.5em;
        color: #fff;
        font-weight: bold;
        padding-bottom: 5px;
    }
    p:last-child {
        color: #c9c9c9;
        font-size: 12px;
    }
`;

const HeaderRightChildren = styled.section`
    margin-left: auto;
    margin-right: 10px;
`;

const HeaderBottomChildren = styled.section`
    width: 100%;
    height: 40px;
    background: #fff;
`;

export class App extends React.Component {
    render() {
        return (
            <Router history={history}>
                <TmsRoleMnu
                    systemDescription={
                        <DescriptionComponent>
                            <h2>CCP-SITE</h2>
                            <p>Randomization and Trial</p>
                            <p>Supply Management</p>
                            <p>version 1</p>
                        </DescriptionComponent>
                    }
                    hideSystemDescription={
                        <DescriptionComponent>
                            <h2>hide</h2>
                        </DescriptionComponent>
                    }
                    headerRightChildren={
                        <HeaderRightChildren>
                            这里放入小铃铛和退出登录等组件
                        </HeaderRightChildren>
                    }
                    headerBottomChildren={
                        <HeaderBottomChildren>
                            这里放入面包屑组件
                        </HeaderBottomChildren>
                    }
                    history={history}
                    componentMap={routes}
                    list={fakeMenuList}
                    selfCode={['example']}
                    mode="split"
                />
            </Router>
        );
    }
}
