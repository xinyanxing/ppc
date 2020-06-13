import React from 'react';
import Select from "../controls/Select";
import Textarea from "../controls/Textarea";
import { createForm } from 'rc-form';

class InterventionInfoList extends React.Component {
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
    return (
      <div className="list" style={{marginBottom: '0'}}>
        {
          value.map((item,i) => (
            <ListItem key={i} readOnly={this.props.readOnly} index={i} value={item} onChange={this.handleChange.bind(this,i)}/>
          ))
        }
        {!this.props.readOnly && (
        <div className="item add" onClick={this.handleAdd}>
          +增加介入治疗情况
        </div>
        )}
      </div>
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
  render(){
    const { readOnly, value } = this.props
    const { getFieldProps } = this.props.form;
    return (
      <React.Fragment>
      <div className="item">
        <div className="inner">
          <div className="label">干预血管</div>
          <div className="control">
            <Select            
              {...getFieldProps('interventionCoronary',{
                initialValue: value['interventionCoronary'] || '',
              })}
              readOnly={readOnly}
              placeholder="请选择"
              itemClassId="6a3c2a18-d06a-11e9-a201-2016b96577f4"
              />
          </div>
        </div>
      </div>
      <div className="item">
        <div className="inner">
          <div className="label">操作选择</div>
          <div className="control">
            <Select            
              {...getFieldProps('operationChoice',{
                initialValue: value['operationChoice'] || '',
              })}
              readOnly={readOnly}
              placeholder="请选择"
              itemClassId="6a3fac58-d06a-11e9-8c44-2016b96577f4"
              />
          </div>
        </div>
      </div>
      
      <div className="item">
        <div className="inner" style={{borderBottom: 0}}>
          <div className="label">描述</div>
        </div>
      </div>
      <Textarea
        {...getFieldProps('otherOperationDescription', {
          initialValue: value['otherOperationDescription'] || '',
        })}
        readOnly={readOnly}
        placeholder="请具体描述"
      />
      
    </React.Fragment>)
  }
}
const ListItem = createForm({
  onValuesChange: (props, changed, all) => {
    props.onChange(all)
  }
})(Item)


export default InterventionInfoList;