import React from 'react'
import { Modal, Icon, Tabs, Button } from 'antd'
import _ from 'lodash'
import moment from 'moment'
const { TabPane } = Tabs;
/**
 *idmpModal组件说明:

 * -- props 说明: --
 * searchfilterData: 参与搜索的搜索集合
 * sessionMainKey  : 配置 session 主键key (避免重复)
 * -- method 说明: --
 * setSearchData : 该方法触发执行搜索


 *-- 功能描述：--
 * 该组件缓存所有设置了 showfilter 属性的对应的dataIndex 的value , 不执行搜索读取缓存值，跳转页面值仍然保存,需用户手动清空搜索值,避免session key 存储时重复须指定 sessionMainKey
 * 需传入antDesign Table cloumns 数组，设置 showfilter 属性值为true。显示搜索Icon
 * 如果Icon 需要自定义,则需要在table cloumn 内配置 icon 参数值为ReactNode，
 *
 *
 *
 *  @memberof WarpHeaderFilterTable
 * @by liuyuxing
*/


function IdmpModal(props) {
  let idmpModalStatus = false
  return (
    <Modal
      title={props.title}
      visible={props.visible}
      onOk={this.handleOk}
      onCancel={this.handleCancel}
      okButtonProps={{ disabled: true }}
      cancelButtonProps={{ disabled: true }}
    >

    </Modal>
  )
}
export { IdmpModal }
