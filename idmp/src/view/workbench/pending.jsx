import React from 'react'
import { Table, Modal, Icon, Tabs, Button } from 'antd'
import { Router, Switch, Route } from 'react-router-dom';
import './workbench.less'
import _ from 'lodash'
import moment from 'moment'
const { TabPane } = Tabs;
class Pending extends React.Component {
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
      render: (text, record, index) => {
        return (<Button type="link">编辑</Button>)
      }
    },
  ]
  componentDidMount() {

  }


  render() {
    return (
      <div className="workbenchlayout">
        待审批
      </div>
    )
  }
}

export { Pending }
