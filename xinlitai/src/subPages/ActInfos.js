import React from 'react';
import { createForm } from 'rc-form';
import Reg from '../rules';

class ActInfos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentDidMount() {
  }
  handleChange = (i, v) => {
    const { value } = this.props
    value[i] = {...v}
    this.props.onChange([...value])
  }
  handleAdd = () => {
    const { value } = this.props
    this.props.onChange([...value,{}])
  }

  render(){
    const { value } = this.props
    return (<React.Fragment>
        {
          value.map((item,i) => (
            <ListItem key={i} readOnly={this.props.readOnly} index={i} value={item} onChange={this.handleChange.bind(this,i)}/>
          ))
        }
        {(!this.props.readOnly && value.length < 4)&& (
        <div className="item add" onClick={this.handleAdd}>
          +增加ACT监测
        </div>
        )}</React.Fragment>
    );
  }
}

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentDidMount() {
  }
  handleChange = (i, v) => {
    
  }
  render(){
    const { readOnly, value } = this.props
    const { getFieldProps, getFieldError } = this.props.form;

    let title = '第' + (this.props.index + 1) + '次监测ACT值'
    if(this.props.index > 2){
      title = '最后一次监测ACT值'
    }

    return (
      <React.Fragment>
      <div className="item">
        <div className="inner">
          <div className="label">{title}</div>
          <div className="control">
            <input            
              {...getFieldProps('act',{
                rules:[Reg.number],
                initialValue: value['act'] || '',
              })}
              readOnly={readOnly}
              placeholder="请输入" type="tel" />
              s
          </div>
        </div>
        <div className="error">{getFieldError('act')}</div>
      </div>
      <div className="item">
        <div className="inner">
          <div className="label">静脉推注比伐芦定</div>
          <div className="control">
            <input            
              {...getFieldProps('afterBivaludine',{
                rules:[Reg.number],
                initialValue: value['afterBivaludine'] || '',
              })}
              readOnly={readOnly}
              placeholder="请输入" type="tel" />
              分钟后测量
          </div>
        </div>
        <div className="error">{getFieldError('afterBivaludine')}</div>
      </div>
      
    </React.Fragment>)
  }
}
const ListItem = createForm({
  onValuesChange: (props, changed, all) => {
    props.onChange(all)
  }
})(Item)


export default ActInfos;