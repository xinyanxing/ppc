import React from 'react';
import './App.less';
import { ConfigProvider, Icon, Avatar, Input, Layout, Menu, Breadcrumb, Button, Select } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import history from './router/history'
import NoFound from './noFound'
import { Workbench } from 'view/workbench/workbench'
import { Database } from 'view/database/database'

import _ from 'lodash'
require('antd/dist/antd.css')
const { Header, Content, Footer } = Layout;
const appNavlist = [{ key: '1', name: '工作台' }, { key: '2', name: '数据库' }]
const InputGroup = Input.Group;
const { Option } = Select;
function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Layout className="App">
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%', display: 'flex', background: '#435C71' }}>
          <div className="app-logo" >
            <Icon type="branches" style={{ color: 'rgba(255, 255, 255,0.5)', fontSize: '20px' }} />&nbsp;
            <span className="app-font">基础数据管理平台</span>
          </div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}
          >
            {
              _.map(appNavlist, v => {
                return (<Menu.Item key={v.key}>{v.name}</Menu.Item>)
              })
            }
          </Menu>
          <div className="app-headerright">
            <InputGroup compact className="app-inputsearch">
              <Select defaultValue="Zhejiang">
                <Option value="Zhejiang">Zhejiang</Option>
                <Option value="Jiangsu">Jiangsu</Option>
              </Select>
              <Input style={{ width: '50%' }} placeholder="请输入关键字" />
            </InputGroup>
            <div className="app-rightButton" >
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />&nbsp;&nbsp;
            <Icon type="bell" className="iconRight" />
              <Icon type="setting" className="iconRight" />
              <Icon type="poweroff" />
            </div>
          </div>
        </Header>
        <Content style={{ padding: '0 50px', marginTop: 64 }}>
          <div style={{ background: '#fff', padding: 24, minHeight: 780, marginTop: '20px' }}>
            <Router history={history}>
              <Switch>
                <Route path={`/workbench`} render={props => { return <Workbench {...props} action="new" />; }} />
                <Route path="/detail" component={Database} />
                <Redirect exact from="/" to="/workbench" />
                <Route component={NoFound} />
              </Switch>
            </Router>
          </div>

        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
