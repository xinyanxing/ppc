import React from 'react'
import { Table, Modal, Icon, Tabs, Button } from 'antd'
import { Router, Switch, Route } from 'react-router-dom';
import './workbench.less'
// import { fetch } from 'utils/fetch'
import _ from 'lodash'
import moment from 'moment'
import { DraftboxList } from './draftboxList'
import { Pending } from './pending'
const { TabPane } = Tabs;
import { WorkBenchContext } from './worlayoutcontext'
class Workbench extends React.Component {
  state = {
    createMpid: false //弹窗状态控制
  }
  componentDidMount() {

  }
  //当前活跃Tab
  getCurTab = () => {
    const tetLocation = _.difference(_.split(this.props.location.pathname, '/'), ['']);
    const statusData = tetLocation[tetLocation.length - 1] === 'workbench' ? 'draftbox' : tetLocation[tetLocation.length - 1];
    return statusData;
  }
  Tabchanges = (curTab) => {
    const { match } = this.props;
    let curTabstr = curTab === 'drugDistribution' ? '' : `/${curTab}`;
    this.props.history.push({
      pathname: `${match.path}${curTabstr}`
    });
  }
  visibleModdle = () => {
    this.setState({
      createMpid: true
    })
  }

  render() {
    const { match } = this.props;
    const CurTab = this.getCurTab();
    const operations = <Button icon="plus" className="nomallButton" onClick={this.visibleModdle}>创建</Button>;
    const tabTitleList = [{ key: 'draftbox', name: '草稿箱' }, { key: 'pending', name: '待审批' }, { key: 'approvalfailed', name: '审批未通过' }, { key: 'pendingRelease', name: '待发布' }, { key: 'inForce', name: '已生效' }]
    return (
      <div className="workbenchlayout">
        <Tabs tabBarExtraContent={operations} onChange={this.Tabchanges} activeKey={CurTab}>
          {
            _.map(tabTitleList, v => {
              return (<TabPane tab={v.name} key={v.key}></TabPane>)
            })
          }
        </Tabs>
        <WorkBenchContext.Provider value={CurTab}>
          <WorkBenchContext.Consumer>
            {
              value => {
                return (
                  <Switch>
                    <Route path={`${match.path}`} exact render={props => { return <DraftboxList {...props} />; }} />
                    <Route path={match.path + '/draftbox'} render={props => { return <DraftboxList {...props} />; }} />
                    <Route path={match.path + '/pending'} render={props => { return <DraftboxList {...props} />; }} />
                    {/*   <Route
              path={match.path + '/drugRecord/:departmentId'}
              component={DispensingRecordIndex}
            /> */}
                  </Switch>
                )
              }
            }
          </WorkBenchContext.Consumer>
        </WorkBenchContext.Provider>
      </div >
    )
  }
}

export { Workbench }
