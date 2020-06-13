import _ from 'lodash';
import React from 'react';
import fetch from "../fetch";

class CheckboxGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: []
    }
  }
  componentDidMount() {
    this.load()
  }
  load = async () => {
    if(!this.props.itemClassId) return
    const rev = await fetch.get(`itemConfig/getItemListByItemClassId?itemClassId=${this.props.itemClassId}`)
    if(!rev.success) return
    this.setState({options: rev.data})
  }
  handleChange = (e) => {
    const v = e.target.value
    const arr = (this.props.value || '').split(',')
    if(e.target.checked){
      arr.push(v)
    }else{
      _.remove(arr,str => str === v)
    }
    
    this.props.onChange(_.compact(arr).join(','))
  }
  render(){
    const value = this.props.value || ''
    return (
      <div className="radio-group">
        {(this.props.options || this.state.options).map(v => (          
          <label key={v.uniqueCode.toString()}>
            <input 
              type="checkbox"
              disabled={this.props.readOnly}
              value={v.uniqueCode}
              checked={value.indexOf(v.uniqueCode) !== -1 }
              onChange={this.handleChange}
             />             
            {v.nameChs}
          </label>
        ))}
      </div>
    );
  }
}
export default CheckboxGroup;
