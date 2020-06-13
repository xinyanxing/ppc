import React from 'react';
import fetch from "../fetch";

class RadioGroup extends React.Component {
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
    let v = e.target.value
    try{
      v = JSON.parse(v)
    }catch(e){}
    this.props.onChange(v)
  }
  render(){
    
    return (
      <div className="radio-group">
        {(this.props.options || this.state.options).map(v => (          
          <label key={v.uniqueCode.toString()}>
            <input 
              type="radio"
              disabled={this.props.readOnly}
              value={v.uniqueCode}
              checked={this.props.value === v.uniqueCode}
              onChange={this.handleChange}
             />             
            {v.nameChs}
          </label>
        ))}
      </div>
    );
  }
}
export default RadioGroup;
