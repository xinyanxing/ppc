import _ from 'lodash';
import React from 'react';
import './PremedicateList.less'
import Select from "../controls/Select";
import RadioGroup from "../controls/RadioGroup";
import { createForm } from 'rc-form';
import { Modal, Icon } from 'antd-mobile';
// import uuidv4 from "uuid/v4";

const DRUGS = {
  '阿司匹林': '7271c414-d04c-11e9-8022-000c29ee981b',
  '氯吡格雷': '7ac3bd69-d04c-11e9-8022-000c29ee981b',
  '替格瑞洛': '82781069-d04c-11e9-8022-000c29ee981b',
  // '其他抗血小板药': '89e4bdba-d04c-11e9-8022-000c29ee981b',
  '口服抗凝药': '92100594-d04c-11e9-8022-000c29ee981b',
  '血小板糖蛋白IIb/IIIa抑制剂': '98dc5738-d04c-11e9-8022-000c29ee981b',
  '静脉溶栓剂': 'a084b0bb-d04c-11e9-8022-000c29ee981b',
  '其他非口服抗凝剂': 'a85ab25f-d04c-11e9-8022-000c29ee981b'
}

class PremedicateList extends React.Component {
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
  handleRemove = (i) => {
    Modal.alert('删除', '是否需要删除?', [
      { text: '取消', onPress: () => console.log('cancel') },
      { text: '确认', onPress: () => {
        const { value } = this.props
        value.splice(i,1)
        // console.log([...value],i)
        // console.log(value)
        this.props.onChange(_.cloneDeep(value))
      } },
    ])
  }

  render(){
    const { value } = this.props
    return (
      <div className="PremedicateList list">
        {
          value.map((item,i) => (
            <ListItem key={i} index={i} onRemove={this.handleRemove.bind(this,i)} readOnly={this.props.readOnly} value={item} onChange={this.handleChange.bind(this,i)}/>
          ))
        }
        {!this.props.readOnly && (
        <div className="item add" onClick={this.handleAdd}>
          +增加患者术前合并用药
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
  getFieldProps = (fieldName, opts) => {
    return {
      value: opts.initialValue,
      onChange: (e) => {
        let v = e
        if(e.target){
          v = e.target.value
        }
        this.props.onChange({...this.props.value,[fieldName]: v})
      }
    }
  }
  render(){
    const { readOnly, value } = this.props
    const getFieldProps = this.getFieldProps

    function getFieldValue(name){
      return value[name] || ''
    }

    const drugName = value.drugName

    let chemicalNameItemClassId = ''
    if( drugName === DRUGS['口服抗凝药']  ){
      chemicalNameItemClassId = '6f0dc409-df6a-11e9-8779-2016b96577f1'
    }else if( drugName === DRUGS['血小板糖蛋白IIb/IIIa抑制剂']  ){
      chemicalNameItemClassId = '6f0d28de-df6a-11e9-92e5-2016b96577f1'
    }else if( drugName === DRUGS['静脉溶栓剂']  ){
      chemicalNameItemClassId = '6f0f724a-df6a-11e9-b851-2016b96577f1'
    }else if( drugName === DRUGS['其他非口服抗凝剂']  ){
      chemicalNameItemClassId = '6f10d178-df6a-11e9-8ea2-2016b96577f1'
    }

    return (
      <React.Fragment>
      {(this.props.index > 0) && (<p></p>)}
      <div className="item">
        <div className="inner">
          <div className="label">
            合并用药{(this.props.index + 1)}
            {!this.props.readOnly && (
              <Icon type="cross-circle-o" onClick={this.props.onRemove} />
            )}
          </div>
        </div>
      </div>

      <div className="item">
        <div className="inner">
          <div className="label">药品名</div>
          <div className="control">
            <Select
              {...getFieldProps('drugName',{
                initialValue: value['drugName'] || '',
              })}
              readOnly={readOnly}
              itemClassId="11c7469d-d04c-11e9-8022-000c29ee981b" />
          </div>
        </div>
      </div>
      <div className="item">
        <div className="inner">
          <div className="label">品名</div>
          <div className="control">
            <input
              {...getFieldProps('productName',{
                initialValue: value['productName'] || '',
              })}
              readOnly={readOnly}
            placeholder="请输入" type="text" />
          </div>
        </div>
      </div>
      {( ([DRUGS['阿司匹林'],DRUGS['氯吡格雷'],DRUGS['替格瑞洛']]).indexOf(getFieldValue('drugName')) === -1) && (
      <div className="item">
        <div className="inner">
          <div className="label">备注</div>
          <div className="control">
            <input
              {...getFieldProps('mark',{
                initialValue: value['mark'] || '',
              })}
              readOnly={readOnly}
            placeholder="请输入" type="text" />
          </div>
        </div>
      </div>
      )} 
      {( ([DRUGS['阿司匹林'],DRUGS['氯吡格雷'],DRUGS['替格瑞洛']]).indexOf(getFieldValue('drugName')) === -1) && (
      <div className="item">
        <div className="inner">
          <div className="label">化学名</div>
          <div className="control">
            <Select
              {...getFieldProps('chemicalName',{
                initialValue: value['chemicalName'] || '',
              })}
              readOnly={readOnly}
              itemClassId={chemicalNameItemClassId} />
          </div>
        </div>
      </div>
      )} 
      <div className="item">
        <div className="inner">
          <div className="label">规格</div>
          <div className="control">
            <input
                {...getFieldProps('specification',{
                  initialValue: value['specification'] || '',
                })}
                readOnly={readOnly}
              placeholder="请输入" type="text" />
          </div>
        </div>
      </div>
      <div className="item">
        <div className="inner">
          <div className="label">批号</div>
          <div className="control">
            <input            
              {...getFieldProps('batchNumber',{
                initialValue: value['batchNumber'] || '',
                rules:[{pattern:/^[a-zA-Z0-9]+$/,message:'仅英文字符+数字'}]
              })}
              readOnly={readOnly}
              placeholder="请输入" type="text" />
          </div>
        </div>
      </div>

      { (([DRUGS['阿司匹林'],DRUGS['氯吡格雷'],DRUGS['替格瑞洛'],DRUGS['其他抗血小板药'],DRUGS['口服抗凝药']]).indexOf(getFieldValue('drugName')) !== -1) && (
      <React.Fragment>

      <div className="item">
        <div className="inner">
          <div className="label">负荷剂量</div>
          <div className="control">
            <input            
              {...getFieldProps('loadDosage',{
                initialValue: value['loadDosage'] || '',
              })}
              readOnly={readOnly}
              placeholder="请输入" type="text" />
          </div>
        </div>
      </div>

      <div className="item">
        <div className="inner">
          <div className="label">口服</div>
          <div className="control">
            <RadioGroup 
              {...getFieldProps('oral',{
                initialValue: value['oral'] ,
              })}
              readOnly={readOnly}
              options={[{uniqueCode: true,nameChs:'是'},{uniqueCode: false,nameChs:'否'}]} /> 
          </div>
        </div>
      </div>

      { getFieldValue('oral') === true && (
      <div className="item">
        <div className="inner">
          <div className="label">口服剂量</div>
          <div className="control">
            <input            
              {...getFieldProps('oralDose',{
                initialValue: value['oralDose'] || '',
              })}
              readOnly={readOnly}
              placeholder="请输入" type="text" />
          </div>
        </div>
      </div>
      )}



      <div className="item">
        <div className="inner">
          <div className="label">长期口服</div>
          <div className="control">
            <RadioGroup 
              {...getFieldProps('longTermOral',{
                initialValue: value['longTermOral'] ,
              })}
              readOnly={readOnly}
              options={[{uniqueCode: true,nameChs:'是'},{uniqueCode: false,nameChs:'否'}]} /> 
          </div>
        </div>
      </div>

      { getFieldValue('longTermOral') === true && (
      <div className="item">
        <div className="inner">
          <div className="label">长期口服剂量</div>
          <div className="control">
            <input            
              {...getFieldProps('longTermOralDose',{
                initialValue: value['longTermOralDose'] || '',
              })}
              readOnly={readOnly}
              placeholder="请输入" type="text" />
          </div>
        </div>
      </div>
      )}


      <div className="item">
        <div className="inner">
          <div className="label">使用频次数</div>
          <div className="control">
            <input
              {...getFieldProps('usageCounter',{
                initialValue: value['usageCounter'] || '',
              })}
              readOnly={readOnly}
              placeholder="请输入" type="text" />
          </div>
        </div>
      </div>
      <div className="item">
        <div className="inner">
          <div className="label">使用天数</div>
          <div className="control">
            <input
              {...getFieldProps('usageDays',{
                initialValue: value['usageDays'] || '',
              })}
              readOnly={readOnly}
              placeholder="请输入" type="text" />
          </div>
        </div>
      </div>
      </React.Fragment>
      )}



      { (([DRUGS['血小板糖蛋白IIb/IIIa抑制剂'],DRUGS['静脉溶栓剂'],DRUGS['其他非口服抗凝剂']]).indexOf(getFieldValue('drugName')) !== -1) && (
      <React.Fragment>

       <div className="item">
        <div className="inner">
          <div className="label">静脉推注</div>
          <div className="control">
            <RadioGroup 
              {...getFieldProps('ivBolus',{
                initialValue: value['ivBolus'] ,
              })}
              readOnly={readOnly}
              options={[{uniqueCode: true,nameChs:'是'},{uniqueCode: false,nameChs:'否'}]} /> 
          </div>
        </div>
      </div>

      { getFieldValue('drugName') === DRUGS['其他非口服抗凝剂'] && (
      <div className="item">
        <div className="inner">
          <div className="label">皮下推注</div>
          <div className="control">
            <RadioGroup 
              {...getFieldProps('skinPop',{
                initialValue: value['skinPop'] ,
              })}
              readOnly={readOnly}
              options={[{uniqueCode: true,nameChs:'是'},{uniqueCode: false,nameChs:'否'}]} /> 
          </div>
        </div>
      </div>
      )}

      <div className="item">
        <div className="inner">
          <div className="label">注射剂量</div>
          <div className="control">
            <input            
              {...getFieldProps('ivBolusDose',{
                initialValue: value['ivBolusDose'] || '',
              })}
              readOnly={readOnly}
              placeholder="请输入" type="text" />
          </div>
        </div>
      </div>

      <div className="item">
        <div className="inner">
          <div className="label">剂量单位</div>
          <div className="control">
            <Select
              {...getFieldProps('ivBolusDoseUnit',{
                initialValue: value['ivBolusDoseUnit'] || '',
              })}
              readOnly={readOnly}
              options={ getFieldValue('drugName') === DRUGS['其他非口服抗凝剂'] ? [
                {uniqueCode: '571f2aa8-d84d-11e9-aee8-2016b96577f4', nameChs: '毫克/次'},
                {uniqueCode: '57265708-d84d-11e9-991f-2016b96577f4', nameChs: 'IU/次'}
              ]:[
                {uniqueCode: '571f2aa8-d84d-11e9-aee8-2016b96577f4', nameChs: '毫克'},
                {uniqueCode: '5723705c-d84d-11e9-9943-2016b96577f4', nameChs: '克'}
              ]}
              />
          </div>
        </div>
      </div>
      { getFieldValue('drugName') !== DRUGS['其他非口服抗凝剂'] && (
        <React.Fragment>
      <div className="item">
        <div className="inner">
          <div className="label">静脉滴注速度</div>
          <div className="control">
            <input            
              {...getFieldProps('ivBolusSpeed',{
                initialValue: value['ivBolusSpeed'] || '',
              })}
              readOnly={readOnly}
              placeholder="请输入" type="text" />
          </div>
        </div>
      </div>
 

      <div className="item">
        <div className="inner">
          <div className="label">静脉滴注速度单位</div>
          <div className="control">
            <Select
              {...getFieldProps('ivBolusSpeedUnit',{
                initialValue: value['ivBolusSpeedUnit'] || '',
              })}
              readOnly={readOnly}
              itemClassId="5727945a-d84d-11e9-be78-2016b96577f4" />
          </div>
        </div>
      </div>
      </React.Fragment>
      )}


      { getFieldValue('drugName') !== DRUGS['其他非口服抗凝剂'] && (
      <div className="item">
        <div className="inner">
          <div className="label">使用时长（小时）</div>
          <div className="control">
            <input            
              {...getFieldProps('serviceTime',{
                initialValue: value['serviceTime'] || '',
              })}
              readOnly={readOnly}
              placeholder="请输入" type="text" />
          </div>
        </div>
      </div>
      )}

      </React.Fragment>
      )}


      { ( DRUGS['其他非口服抗凝剂'] === getFieldValue('drugName') ) && (
      <React.Fragment>
      <div className="item">
        <div className="inner">
          <div className="label">使用频次数</div>
          <div className="control">
            <input
              {...getFieldProps('usageCounter',{
                initialValue: value['usageCounter'] || '',
              })}
              readOnly={readOnly}
              placeholder="请输入" type="text" />
          </div>
        </div>
      </div>
      <div className="item">
        <div className="inner">
          <div className="label">使用天数</div>
          <div className="control">
            <input
              {...getFieldProps('usageDays',{
                initialValue: value['usageDays'] || '',
              })}
              readOnly={readOnly}
              placeholder="请输入" type="text" />
          </div>
        </div>
      </div>
      </React.Fragment>
      )}
      



      { (([DRUGS['静脉溶栓剂'],DRUGS['其他非口服抗凝剂']]).indexOf(getFieldValue('drugName')) !== -1) && (
      <React.Fragment>
      <div className="item">
        <div className="inner">
          <div className="label">距离术前使用</div>
          <div className="control">
            <input            
              {...getFieldProps('premedicate',{
                initialValue: value['premedicate'] || '',
              })}
              readOnly={readOnly}
              placeholder="请输入" type="text" />
          </div>
        </div>
      </div>

      <div className="item">
        <div className="inner">
          <div className="label">距离术前时间单位</div>
          <div className="control">
            <Select
              {...getFieldProps('premedicateUnit',{
                initialValue: value['premedicateUnit'] || '',
              })}
              readOnly={readOnly}
              itemClassId="572f3006-d84d-11e9-8211-2016b96577f4" />
          </div>
        </div>
      </div>
      </React.Fragment>
      )}
      
    </React.Fragment>)
  }
}
const ListItem = Item
// createForm({
//   onValuesChange: (props, changed, all) => {
//     props.onChange({...all, whetherUse: true})
//   }
// })(Item)


PremedicateList.DRUGS = DRUGS

export default PremedicateList;