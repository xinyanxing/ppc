import React from 'react';
import _ from 'lodash';
import fetch from "../fetch";
import { Picker, Icon } from 'antd-mobile';

class Select extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      itemClassId: props.itemClassId,
    }
  }
  componentDidMount() {
    this.load()
  }
  load = async (cb) => {
    if(!this.props.itemClassId) return
    const rev = await fetch.get(`itemConfig/getItemListByItemClassId?itemClassId=${this.state.itemClassId}`)
    if(!rev.success) return
    this.setState({options: rev.data},cb)
  }
  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.itemClassId !== prevState.itemClassId){
      return {itemClassId : nextProps.itemClassId}
    }
    return null 
  }
  componentDidUpdate(prevProps, prevState){
    if(prevState.itemClassId !== this.state.itemClassId){
      this.load(() => {
        if(!_.find(this.state.options, v => v.uniqueCode === this.props.value)){
          this.props.onChange('', this.state.options)  
        }
      })
      return     
    }

    if(this.props.options && this.props.value && !_.find(this.props.options, v => v.uniqueCode === this.props.value)){
      this.props.onChange('', this.props.options)  
    }

  }
  handleChange = (v) => {
    if(Array.isArray(v)){
      v = v.join(',')
    }
    this.props.onChange(v,this.state.options)
  }
  render(){
    const value = this.props.value || ''

    const placeholder = this.props.placeholder || '请选择'

    const options = (this.props.options || this.state.options).map(v => {
      return {
        value: v.uniqueCode,
        label: v.nameChs,
      }
    })

    const option = _.find(options, v => v.value === value)
    const displayValue = option ? option.label : value

    return (<Picker
      disabled={this.props.readOnly}
      cols={1}
      data={options}
      extra={placeholder}
      value={value.split(',')}
      onChange={this.handleChange}
      onOk={this.handleChange}
    >
      <CustomChildren>{displayValue}</CustomChildren>
    </Picker>)
  }
}


const CustomChildren = (props) => {
  return (
    <div className="select-input" onClick={props.onClick}>
      {props.children}
      {!props.children && (<span>{props.extra}</span>)}   
      <Icon type="down" />   
    </div>
  )
};

export default Select;
