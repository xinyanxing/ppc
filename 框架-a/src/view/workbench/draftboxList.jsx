import React from 'react'
import { Table, Modal, Icon, Tabs, Button } from 'antd'
import { Router, Switch, Route } from 'react-router-dom';
import { WorkBenchContext } from './worlayoutcontext'

import './workbench.less'
import _ from 'lodash'
import moment from 'moment'
const { TabPane } = Tabs;
let data = [
  {
    MPID: 'aaaa',
    MAH: 'ddddd',
    nameobj: '不知道',
    Tname: 'ccc',
    createDate: null,
    num: 'aaad',
  }
]
class DraftboxList extends React.Component {
  static contextType = WorkBenchContext;
  state = {

  }
  columns = [
    {
      title: 'MPID',
      dataIndex: 'MPID',
    },
    {
      title: 'MAH',
      dataIndex: 'MAH',
    },
    {
      title: '商品名',
      dataIndex: 'nameobj',
    },
    {
      title: '通用名',
      dataIndex: 'Tname',
    },
    {
      title: '创建日期',
      dataIndex: 'createDate',
      align: 'center',
      render: (text, record, index) => {
        return (<span>{text ? moment(text).format('YYYY-MM-DD') : '--'}</span>)
      }
    },
    {
      title: '创建人',
      dataIndex: 'num',
    },
    {
      title: '操作',
      dataIndex: 'action',
      align: 'center',
      render: (text, record, index) => {
        return (this.getCurStr())
      }
    },
  ]
  componentDidMount() {

  }
  //当前tab状态判断
  //当前操作值
  getCurStr = () => {
    let value = this.context;
    let resultStr = <></>
    switch (value) {
      case 'draftbox': resultStr = <Button type="link" >编辑</Button>; break;
      case 'pending': resultStr = <Button type="link" >审批</Button>; break;
      case 'approvalfailed': resultStr = <Button type="link" >编辑</Button>; break;
      case 'inForce': resultStr = <>已生效</>; break;
    }
    return resultStr
  }

  render() {
    return (
      <div className="workbenchlayout">
        <Table columns={this.columns} dataSource={data}></Table>
      </div>
    )
  }
}
export { DraftboxList }
