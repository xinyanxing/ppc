import React from 'react';
import styled from 'styled-components';
import { history } from './router';
import { Router, NavLink, Link, withRouter } from 'react-router-dom';
import { Layout, Menu, Icon, Breadcrumb } from 'antd';
import { routes } from 'router/routes';
import _ from 'lodash';
import { renderRoutes } from 'router/renderRoutes';

import 'antd/dist/antd.min.css';
import 'tms-common-role-menu/lib/app.css';
const { Header, Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;

interface IProps {
    theam?: string;
}
interface Istate {
    collapsed: Boolean;
}
export class App extends React.Component<IProps, Istate> {
    state = {
        collapsed: false,
    };

    onCollapse = (collapsed: Boolean) => {
        this.setState({ collapsed });
    }
    extraBreadcrumbItems(): React.ReactNode {
        const breadcrumbNameMap = {
            '/Coursecenter': '设置1-1',
            '/Coursecenter/3': '设置1-3',
        };

        const Home = withRouter((props) => {
            const { location } = props;
            const pathSnippets = location.pathname.split('/').filter((i) => i);

            const extraBreadcrumbItems = pathSnippets.map((_, index) => {
                const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
                return (
                    <Breadcrumb.Item key={url}>
                        <Link to={url}>{breadcrumbNameMap[url]}</Link>
                    </Breadcrumb.Item>
                );
            });
            const breadcrumbItems = [
                <Breadcrumb.Item key="home">
                    <Link to="/">Home</Link>
                </Breadcrumb.Item>,
            ].concat(extraBreadcrumbItems);

            return (
                <div className="demo">
                    <Breadcrumb>{breadcrumbItems}</Breadcrumb>
                </div>
            );
        });
        return (<Home></Home>);
    }
    render(): any {
        return (
            <Router history={history} >
                <Layout style={{ minHeight: '100vh' }}>
                    <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                        <div className="logo" />
                        <Menu theme="dark" defaultSelectedKeys={['首页']} mode="inline">
                            {
                                _.map(routes, (v, k) => {
                                    return (v.routes ?
                                        <SubMenu
                                            key={k}
                                            title={
                                                <span>
                                                    <Icon type="user" />
                                                    <NavLink to={v.path}>{v.linkName}</NavLink>
                                                </span>
                                            }
                                        >
                                            {
                                                _.map(v.routes, (s) => {
                                                    return (<Menu.Item key={s.linkName}> <NavLink to={s.path}>{s.linkName}</NavLink></Menu.Item>);
                                                })
                                            }
                                        </SubMenu> : <Menu.Item key={v.linkName}> <NavLink to={v.path}>{v.linkName || ''}</NavLink></Menu.Item>);
                                })
                            }
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header style={{ background: '#fff', padding: 0 }} />
                        <Content style={{ margin: '0 16px' }}>
                            <Breadcrumb>
                                {this.extraBreadcrumbItems()}
                            </Breadcrumb>
                            {renderRoutes(routes, this.props)}
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>
                            <p>COPYRIGHT © 2017 嘉兴太美医疗科技有限公司 版权所有 浙ICP备13033914号</p>
                            <p>浙公网安备 33049802000047</p>
                        </Footer>
                    </Layout>
                </Layout>

            </Router>
        );
    }
}
