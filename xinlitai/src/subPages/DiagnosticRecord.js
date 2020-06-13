import fetch from "../fetch";
import React from 'react';
import { Icon, Modal, List, NavBar } from 'antd-mobile';
import './DiagnosticRecord.less'

class DiagnosticRecord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      options: [],
      keyword: '',
      modalVisible: false,
    }
  }
  componentDidMount() {
    this.load()
  }
  load = async () => {
    const rev = await fetch.get(`itemConfig/getItemListByItemClassId?itemClassId=d0aa1d8c-dc37-11e9-9c6e-2016b96577f4`)
    if(!rev.success) return
    this.setState({options: rev.data})
  }
  handleChange = (i, v) => {
    console.log(v)
    const { value } = this.props
    value[i] = v
    this.props.onChange([...value])
  }
  handleTxtChange = (i, e) => {
    const { value } = this.props
    value[i] = e.target.value
    this.props.onChange([...value])
  }
  handleAdd = () => {
    const { value } = this.props
    this.props.onChange([...value,''])
  }
  showModal = (i) => {
    this.setState({modalVisible: true,index: i})
  }
  closeModal = () => {
    this.setState({modalVisible: false, keyword: ''})
  }

  onSelect = (item) => {
    this.setState({modalVisible: false, keyword: ''})
    this.handleChange(this.state.index,item.nameChs)
  }
  onInput = (e) => {
    this.setState({keyword: e.target.value})
  }

  render(){
    const { value } = this.props
    return (
      <div className="DiagnosticRecord list">
        {
          value.map((item,i) => (
            <React.Fragment key={i}>

              <div className="item">
                <div className="inner">
                  <div className="label">主要诊断记录{(i+1)}</div>
                  <div className="control">
                    <input maxLength={40} readOnly={this.props.readOnly} placeholder="请输入" type="text" value={item} onChange={this.handleTxtChange.bind(this,i)} />
                    {!this.props.readOnly && (
                      <i>
                        <Icon type="down" onClick={this.showModal.bind(this,i)} />
                      </i>
                    )}
                  </div>
                </div>
              </div>

            </React.Fragment>
          ))
        }

        <Modal
          popup
          visible={this.state.modalVisible}
          onClose={this.closeModal}
          animationType="slide-up"
        >

          <List renderHeader={() => (
            <NavBar
            mode="light"
            icon={<Icon type="left" />}
            onLeftClick={this.closeModal}
            rightContent={[
              <a key="0" onClick={this.closeModal}>确定</a>
            ]}
          >
            <input placeholder="请输入" type="text" value={this.state.keyword} onChange={this.onInput} />
          </NavBar>
          )} className="DiagnosticRecord-Modal" >

            {this.state.options
              .filter(item => item.nameChs.indexOf(this.state.keyword) !== -1)
              .map(item => (
                <List.Item onClick={this.onSelect.bind(this,item)} arrow="horizontal" key={item.uniqueCode}>{item.nameChs}</List.Item>
              ))
            }
          </List>
        </Modal>

        {!this.props.readOnly && value.length<10 && (
        <div className="item add" onClick={this.handleAdd}>
          +增加主要诊断记录
        </div>)}
      </div>
    );
  }
}
export default DiagnosticRecord;