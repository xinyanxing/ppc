import React from 'react';
import moment from 'moment';
import { DatePicker } from 'antd-mobile';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentDidMount() {
  }
  handleChange = (v) => {
    const format = this.props.format || 'YYYY-MM-DD'
    v=moment(v).format(format)
    this.props.onChange(v)
  }
  render(){    
    const value = this.props.value || ''
    const placeholder = this.props.placeholder || '请选择日期'
    const format = this.props.format || 'YYYY-MM-DD'
    const {futureDateDisabled,mode='date'}=this.props
    
    const minDate=new Date(1900, 1, 1, 0, 0, 0)
    let maxDate=new Date(2030, 1, 1, 23, 59, 59)
    if(futureDateDisabled){
      maxDate=new Date()
    }
    return (
      <DatePicker
        disabled={this.props.readOnly}
        mode={mode}
        format={format}
        title={placeholder}
        extra={placeholder}
        value={value?moment(value, format).toDate():''}
        onChange={this.handleChange}
        maxDate={maxDate}
        minDate={minDate}
        
      >
       <CustomChildren>{value && moment(value).format(format)}</CustomChildren>
      </DatePicker>
    );
  }
}

const CustomChildren = (props) => {
  return (
    <div className="date-input" onClick={props.onClick}>
      {props.children}
      {!props.children && (<span>{props.extra}</span>)}      
    </div>
  )
};

export default Main;
