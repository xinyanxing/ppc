import fetch from "../fetch";
import React from 'react';
import _ from 'lodash';

class CoronaryApproachList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
    }
  }
  componentDidMount() {
    this.load()
  }
  load = async () => {
    const rev = await fetch.get(`itemConfig/getItemListByItemClassId?itemClassId=d615cf95-d053-11e9-8022-000c29ee981b`)
    if(!rev.success) return
    this.setState({options: rev.data})
  }
  handleLineChange = (option,e) => {
    const { value = [] } = this.props

    let item = _.find(value, v => v.approach === option.uniqueCode)
    if(item){
      _.remove(value, v => v.approach === option.uniqueCode)
    }else{
      value.push( {approach: option.uniqueCode,right:false,left:false} )    
    }
    this.props.onChange([...value]) 
  }
  handleChange = (option,fieldName,e) => {
    const checked = e.target.checked
    const { value = [] } = this.props

    const item = _.find(value, v => v.approach === option.uniqueCode) || {approach: option.uniqueCode,right:false,left:false} 
    item[fieldName] = checked

    _.remove(value, v => v.approach === option.uniqueCode)
    value.push({...item})

    this.props.onChange([...value]) 
  }
  isChecked = (option,fieldName) => {
    const { value = [] } = this.props
    const item = _.find(value, v => v.approach === option.uniqueCode)
    if(!item) return false
    return item[fieldName]
  }

  render(){
    const { value = [] } = this.props
    return (
      <div className="item">
        <div className="inner">
          <div className="label">患者血管入路</div>
          <div className="control" style={{display: 'block',lineHeight: '15px'}}>
            {this.state.options.map(option => (
              <p key={option.uniqueCode}>
                <label>
                  <input 
                    type="checkbox"
                    disabled={this.props.readOnly}
                    value={option.uniqueCode}
                    checked={!!_.find(value, v => v.approach === option.uniqueCode)}
                    onChange={this.handleLineChange.bind(this,option)}
                   />             
                  {option.nameChs}
                </label>
                （

                <label>
                  <input 
                    type="checkbox"
                    disabled={this.props.readOnly}
                    checked={this.isChecked(option,'left')}
                    onChange={this.handleChange.bind(this,option,'left')}
                   />             
                  左
                </label>
                &nbsp;/&nbsp;        
                <label>
                  <input 
                    type="checkbox"
                    disabled={this.props.readOnly}
                    checked={this.isChecked(option,'right')}
                    onChange={this.handleChange.bind(this,option,'right')}
                   />             
                  右
                </label>

                ）
              </p>
            ))}

          </div>
        </div>
      </div>
    );
  }
}
export default CoronaryApproachList;