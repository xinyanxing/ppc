import React from 'react';
import Select from "../controls/Select";
import { createForm } from 'rc-form';
import Reg from '../rules';

class CoronaryLesionList extends React.Component {
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
            <ListItem key={i} index={i} readOnly={this.props.readOnly} value={item} onChange={this.handleChange.bind(this,i)}/>
          ))
        }
        {!this.props.readOnly && (
        <div className="item add" onClick={this.handleAdd}>
          +增加冠脉病变记录
        </div>
        )}
      </div>
    );
  }
}

const ZZG = '6a3aca76-d06a-11e9-bba5-2016b96577f4'

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentDidMount() {
  }
  render(){
    const { readOnly, value, index } = this.props
    const { getFieldProps, getFieldValue, getFieldError } = this.props.form;
    return (
      <React.Fragment>
      <div className="item">
        <div className="inner">
          <div className="label">冠脉病变记录{(index+1)}</div>
          <div className="control">
            <Select            
              {...getFieldProps('coronary',{
                initialValue: value['coronary'] || '',
              })}
              readOnly={readOnly}
              placeholder="请选择"
              itemClassId="6a3aa33a-d06a-11e9-bed6-2016b96577f4"
              />
          </div>
        </div>
      </div>
      <div className="item">
        <div className="inner">
          <div className="control">
            <label>
              <input 
                type="checkbox"
                disabled={readOnly}                     
                {...getFieldProps('opening',{
                  initialValue: value['opening'] || false,
                  valuePropName: 'checked'
                })}
               />             
              &nbsp;开口
            </label>
            <span style={{width:'50%', textAlign:'center'}}>狭窄</span>

            <input
              {...getFieldProps('openingStenosis',{                
                rules:[Reg.number],
                initialValue: value['openingStenosis'] || '',
              })}
              readOnly={readOnly}
              placeholder="请输入" type="tel" />

            %
          </div>
        </div>
        <div className="error">{getFieldError('openingStenosis')}</div>
      </div>


      <div className="item">
        <div className="inner">
          <div className="control">
            <label>
              <input 
                type="checkbox"
                disabled={readOnly}                     
                {...getFieldProps('proximal',{
                  initialValue: value['proximal'] || false,
                  valuePropName: 'checked'
                })}
               />             
              &nbsp;近段
            </label>
            <span style={{width:'50%', textAlign:'center'}}>狭窄</span>

            <input
              {...getFieldProps('proximalStenosis',{
                rules:[Reg.number],
                initialValue: value['proximalStenosis'] || '',
              })}
              readOnly={readOnly}
              placeholder="请输入" type="tel" />

            %
          </div>
        </div>
        <div className="error">{getFieldError('proximalStenosis')}</div>
      </div>



      <div className="item">
        <div className="inner">
          <div className="control">
            <label>
              <input 
                type="checkbox"
                disabled={readOnly}                     
                {...getFieldProps('midpiece',{
                  initialValue: value['midpiece'] || false,
                  valuePropName: 'checked'
                })}
               />             
              &nbsp;中段
            </label>
            <span style={{width:'50%', textAlign:'center'}}>狭窄</span>

            <input
              {...getFieldProps('midpieceStenosis',{
                rules:[Reg.number],
                initialValue: value['midpieceStenosis'] || '',
              })}
              readOnly={readOnly}
              placeholder="请输入" type="tel" />

            %
          </div>
        </div>
        <div className="error">{getFieldError('midpieceStenosis')}</div>
      </div>

      {getFieldValue('coronary') !== ZZG && (
      <div className="item">
        <div className="inner">
          <div className="control">
            <label>
              <input 
                type="checkbox"
                disabled={readOnly}                     
                {...getFieldProps('distal',{
                  initialValue: value['distal'] || false,
                  valuePropName: 'checked'
                })}
               />             
              &nbsp;远段
            </label>
            <span style={{width:'50%', textAlign:'center'}}>狭窄</span>

            <input
              {...getFieldProps('distalStenosis',{
                rules:[Reg.number],
                initialValue: value['distalStenosis'] || '',
              })}
              readOnly={readOnly}
              placeholder="请输入" type="tel" />

            %
          </div>
        </div>
        <div className="error">{getFieldError('distalStenosis')}</div>
      </div>
      )}

      {getFieldValue('coronary') === ZZG && (
      <div className="item">
        <div className="inner">
          <div className="control">
            <label>
              <input 
                type="checkbox"
                disabled={readOnly}                     
                {...getFieldProps('endpiece',{
                  initialValue: value['endpiece'] || false,
                  valuePropName: 'checked'
                })}
               />             
              &nbsp;末段
            </label>
            <span style={{width:'50%', textAlign:'center'}}>狭窄</span>

            <input
              {...getFieldProps('endpieceStenosis',{
                rules:[Reg.number],
                initialValue: value['endpieceStenosis'] || '',
              })}
              readOnly={readOnly}
              placeholder="请输入" type="tel" />

            %
          </div>
        </div>
        <div className="error">{getFieldError('endpieceStenosis')}</div>
      </div>
      )}
    </React.Fragment>)
  }
}
const ListItem = createForm({
  onValuesChange: (props, changed, all) => {
    props.onChange(all)
  }
})(Item)


export default CoronaryLesionList;