import { TextareaItem } from 'antd-mobile';
import React from 'react';

class Textarea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentDidMount() {
  }
  handleChange = (v) => {
    this.props.onChange(v)
  }
  render(){    
    const { readOnly, value = '', placeholder = '请输入'} = this.props
    const rows = Math.max(value.split('\n').length,2)
    return (
      <TextareaItem
        value={value}
        disabled={readOnly}
        placeholder={placeholder}
        onChange={this.handleChange}
        rows={rows}
      />
    );
  }
}

export default Textarea;
