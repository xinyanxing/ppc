import moment from 'moment';
import _ from 'lodash';
import React from 'react';
import './Detail.less';
import fetch from "./fetch";
import Textarea from "./controls/Textarea";
import DateInput from "./controls/Date";
import Select from "./controls/Select";
import RadioGroup from "./controls/RadioGroup";
import CheckboxGroup from "./controls/CheckboxGroup";
import DiagnosticRecord from "./subPages/DiagnosticRecord";
import PremedicateList from "./subPages/PremedicateList";
import ActInfos from "./subPages/ActInfos";
import CoronaryLesionList from "./subPages/CoronaryLesionList";
import CoronaryApproachList from "./subPages/CoronaryApproachList";
import Attachments from "./subPages/Attachments";
import { NoticeBar, Button, Modal, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import Reg from './rules';

const chemicalNameMap = {
  '6f0d75e2-df6a-11e9-bad9-2016b96577f1':'替罗非班',
  '6f0d9d1c-df6a-11e9-b70c-2016b96577f1':'阿昔单抗',
  '6f0dc408-df6a-11e9-9bba-2016b96577f1':'依替巴肽',
  '6f0e3946-df6a-11e9-a3eb-2016b96577f1':'华法林',
  '6f0e6062-df6a-11e9-b54a-2016b96577f1':'利伐沙班',
  '6f0e8768-df6a-11e9-bd79-2016b96577f1':'达比加群',
  '6f0eaed4-df6a-11e9-86d9-2016b96577f1':'阿哌沙班',
  '6f0efc8c-df6a-11e9-94a8-2016b96577f1':'艾多沙班',
  '6f100e12-df6a-11e9-8b2e-2016b96577f1':'链激酶',
  '6f103510-df6a-11e9-89ff-2016b96577f1':'尿激酶',
  '6f105c80-df6a-11e9-bdfd-2016b96577f1':'瑞替普酶',
  '6f10835e-df6a-11e9-9f75-2016b96577f1':'阿替普酶',
  '6f111f66-df6a-11e9-b918-2016b96577f1':'普通肝素',
  '6f11467a-df6a-11e9-b2ef-2016b96577f1':'依诺肝素',
  '6f116d90-df6a-11e9-86c9-2016b96577f1':'磺达肝癸钠',
}


class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      readOnly: false,
      data: {
        interventionInfo: {},
        age: '不详',
        genericName:'泰加宁-注射用比伐芦定'
      },
    }
    document.title = '泰加宁AE上报'
  }
  componentDidMount() {
    this.load()
  }
  load = async () => {
    const id = this.props.match.params.id
    if(!id) return

    const rev = await fetch.get('xlt/getXltReportDetail/' + id)
    if(!rev.success) return
    rev.data.interventionInfo = rev.data.interventionInfo || {}
    console.log(rev.data)
    this.setState({
      data: rev.data,
      readOnly: rev.data.status !== 1
    })
  }

  getReportValue = async () => {
    console.log(this.props.form.getFieldsValue())
    return new Promise((resolve,reject) => {
      this.props.form.validateFields({ force: true },(error) => {
        if (error) {
          Toast.info('请检查填写的内容是否正确', 2);
          resolve(null)
          console.log(error)
          return 
        }

        const data = {...this.state.data,...this.props.form.getFieldsValue()}

        const DRUGS = PremedicateList.DRUGS
        const premedicateList = data['premedicateList']

        if(_.find(premedicateList, v => !v.drugName)){          
          Toast.info(`患者术前合并用药中请选择药品名`, 2);
          resolve(null)
          return 
        }



        const top3Repeat = _.chain(premedicateList)
        .filter(v => v.drugName === DRUGS['阿司匹林'] || v.drugName === DRUGS['氯吡格雷'] || v.drugName === DRUGS['替格瑞洛'])
        .groupBy(v => v.drugName)
        .find(list => list.length > 1)
        .value()

        function getDrugRealName(uid){
          return _.findKey(DRUGS,(v) => uid === v)
        }

        if(top3Repeat && top3Repeat.length > 1){
          Toast.info(`患者术前合并用药中“${getDrugRealName(top3Repeat[0].drugName)}”重复`, 2);
          resolve(null)
          return 
        }

        const otherRepeat = _.chain(premedicateList)
        .filter(v => v.chemicalName && v.drugName !== DRUGS['阿司匹林'] && v.drugName !== DRUGS['氯吡格雷'] && v.drugName !== DRUGS['替格瑞洛'])
        .groupBy(v => v.chemicalName)
        .find(list => list.length > 1)
        .value()

        if(otherRepeat && otherRepeat.length > 1){
          Toast.info(`患者术前合并用药中的化学名“${chemicalNameMap[otherRepeat[0].chemicalName]}”重复`, 2);
          resolve(null)
          return 
        }
        
        console.log(data)
        resolve(data)
      });
    })
  }
  handleSave = async () => {
    const data = await this.getReportValue()
    if(!data) return 
    const rev = await fetch.post('xlt/saveXltReport',data)
    if(!rev.success) return
    Toast.success('保存成功')

    this.setState({ data: {...data,id: rev.data}})

    this.load()
  }
  handleSubmit = async () => {
    let id = this.state.data.id
    const data = await this.getReportValue()
    if(!data) return 

    const rev = await fetch.post('xlt/saveXltReport',{...data, id })
    if(!rev.success) return
    id = rev.data

    const rev2 = await fetch.put('xlt/submitXltReprt/' + id)
    if(!rev2.success) return
    Toast.success('提交成功')
    this.props.history.push('/list')

  }
  warpListField = (fieldName,opts,el,extra) => {
    const { getFieldProps, getFieldError } = this.props.form;
    const { data } = this.state
    const rules=opts.rules || []
    if(opts.required){
      rules.push({ required: true, message: ' ' })
    }
    if(opts.pattern){
      rules.push(opts.pattern)
    }
    opts.rules=rules
    const props = getFieldProps(fieldName,{
      initialValue: data[fieldName] || '',   
      ...opts   
    })

    const error = getFieldError(fieldName)
   
    const control = React.cloneElement(el, {
      ...props,
      readOnly: this.state.readOnly,
    })
    return (<div className="item">
      <div className="inner">
        <div className="label">{opts.required ? (<span className="red">*</span>) : ' '}{opts.label}</div>
        <div className="control" error={error}>
          {control} {extra}
        </div>
      </div>
      <div className='error'>{error}</div>
    </div>)
  }
  render(){
    const { warpListField } = this
    const { getFieldValue, getFieldProps, getFieldError } = this.props.form;
    const { data, readOnly } = this.state;
    return (
      <div className="detail">
        <NoticeBar marqueeProps={{ loop: true }}>
          非常感谢您能提供所获知的药品不良反应/事件信息，请如实填写。
        </NoticeBar>
        <div className="content">

          <div className="list">
            {warpListField('receiveReportDate',{
              required: true,
              label: '收到报告日期',
            },(
              <DateInput />
           ))}

            {warpListField('preparer',{
              required: true,
              label: '填表人',
              pattern:Reg.cnen
            },(
              <input placeholder="请输入" type="text" />
            ))}
            
          </div>

          <div className="list-title">报告者信息</div>
          <div className="list">
            {warpListField('reporterName',{
              required: true,
              label: '报告者姓名',
              pattern:Reg.cnen
            },(
              <input placeholder="请输入" type="text" />
            ))}

            {warpListField('reporterVocation',{
              label: '报告者职业',
            },(
              <Select itemClassId="b1ea4f71-3f48-4b0f-839f-034a82eb04dd" />
            ))}

            {warpListField('reporterPhone',{
              label: '联系电话',
              pattern:Reg.phone
            },(
              <input placeholder="请输入" type="text" />
            ))}

          </div>


          <div className="list-title">患者信息</div>
          <div className="list">
            {warpListField('patientName',{
              required: true,
              label: '姓名',
              pattern:Reg.cnen
            },(
              <input placeholder="请输入" type="text" />
            ))}


            {warpListField('patientPhone',{
              label: '联系电话',
              pattern:Reg.phone
            },(
              <input placeholder="请输入" type="text" />
            ))}

            {warpListField('sex',{
              label: '性别',
            },(
              <RadioGroup itemClassId="69f360f6-9940-4c61-a195-c7d1d842b17b"/>
            ))}

            {warpListField('nation',{
              label: '民族',
            },(
              <Select itemClassId="bfa5349e-e05c-437a-a3f2-62b341280656"/>
            ))}

            {warpListField('birthday',{
              label: '出生日期',
              required: true
            },(
              <DateInput futureDateDisabled={true}/>
            ))}

            {warpListField('age',{
              label: '年龄（岁）',
              required: true,
            },(
              <input placeholder="请输入" type="text" />
            ))}

            

            {warpListField('height',{
              label: '身高(cm)',
              rules: [
                {pattern:/^[0-9]+$/,message:'仅大于0数字'},
                {max:3,message:'长度不可超过3位'},
              ]
            },(
              <input placeholder="请输入" type="text" />
            ))}

            {warpListField('weight',{
              label: '体重(kg)',
              required: true,
              pattern:Reg.number
            },(
              <input placeholder="请输入" type="text" />
            ))}

            {warpListField('surgery',{
              label: '手术原因',
              required: true
            },(
              <Select itemClassId="57abfaf8-cfb7-11e9-8022-000c29ee981b" />
            ))}

            { getFieldValue('surgery') === '1dae8abb-cfba-11e9-8022-000c29ee981b' && warpListField('otherSurgery',{
              label: '其他手术原因',
            },(
              <input placeholder="请输入" type="text" />
            ))}

            {warpListField('clinicHospital',{
              label: '就诊医院',
            },(
              <input placeholder="请输入" type="text" />
            ))}

          </div>

          <div className="list-title">主要诊断</div>
          <DiagnosticRecord 
            {...getFieldProps('primaryDiagnosticRecord',{
              initialValue: data['primaryDiagnosticRecord'] || [''],
            })}
            readOnly={readOnly}
          />


          <div className="list">
          <Attachments
            {...getFieldProps('primaryDiagnosticRecordFileIdList', {
              initialValue: data['primaryDiagnosticRecordFileIdList'] || [],
            })}
            title="主要诊断-附件"
            readOnly={readOnly}
          />
          </div>

          <div className="list-title">重要既往病史</div>
          <Textarea 
            {...getFieldProps('importantPastMedicalHistory', {
              initialValue: data['importantPastMedicalHistory'] || '',
            })}
            readOnly={readOnly}
            placeholder="请输入重要既往病史" 
          />

          <div className="list">
          <Attachments
            {...getFieldProps('importantPastMedicalHistoryFileIdList', {
              initialValue: data['importantPastMedicalHistoryFileIdList'] || [],
            })}            
            title="重要既往病史-附件"
            readOnly={readOnly}
          />
          </div>

          <br/>

          <div className="list-title">产品信息</div>
          <div className="list">
            {warpListField('genericName',{
              required: true,
              label: '通用名称',
            },(
              <input placeholder="请输入" type="text" />
            ))}

            {warpListField('medicationStartTime',{
              required: true,
              label: '开始使用时间',
            },(
              <DateInput mode='datetime' format='YYYY-MM-DD HH:mm'/>
            ))}

            {warpListField('medicationEndTime',{
              required: true,
              label: '结束使用时间',
            },(
              <DateInput  mode='datetime' format='YYYY-MM-DD HH:mm'/>
            ))}
            
            {warpListField('specification',{
              required: true,
              label: '规格',
            },(
              <Select options={[
                {uniqueCode: '0.25g',nameChs: '0.25g'},
                {uniqueCode: '其他',nameChs: '其他'}
              ]} />
            ))}
            
            {warpListField('batchNumber',{
              required: true,
              label: '批号',
              pattern:Reg.cnenNumber
            },(
              <input placeholder="请输入" type="text" />
            ))}
            
            <div className="item">
              <div className="inner">
                <div className="label">
                  <span className="red">*</span>静脉注射
                  <i className="tmfont tm-icon-pv_medicalreasons" style={{color:'#0AA3B5',marginLeft:'4px'}} onClick={() => Modal.alert('提示','若未进行静脉注射，静脉注射和静脉滴注速度都填写0')}></i>
                </div>
                <div className="control merge" error={getFieldError('intravenousInjection') || getFieldError('intravenousInjectionUnion')}>
                    <input 
                      {...getFieldProps('intravenousInjection',{
                        rules: [{ required: true, message: '请输入' },Reg.number],
                        initialValue: data['intravenousInjection'] || '',   
                      })}
                      readOnly={readOnly}
                      placeholder="请输入" 
                      type="text" />

                    <Select 
                      {...getFieldProps('intravenousInjectionUnion',{
                        rules: [{ required: true, message: '请输入' }],
                        initialValue: data['intravenousInjectionUnion'] || '',                           
                      })}
                      readOnly={readOnly}
                      placeholder="请选择单位"
                      itemClassId="fb739575-d04a-11e9-8022-000c29ee981b" />

                </div>
              </div>
              <div className="error">{getFieldError('intravenousInjection')}</div>
            </div>

            <div className="item">
              <div className="inner">
                <div className="label">
                  <span className="red">*</span>静脉滴注速度
                </div>
                <div className="control merge" error={getFieldError('intravenousSpeed') || getFieldError('intravenousSpeedUnion')}>
                    <input 
                      {...getFieldProps('intravenousSpeed',{
                        rules: [{ required: true, message: '请输入' },Reg.number],
                        initialValue: data['intravenousSpeed'] || '',
                      })}
                      readOnly={readOnly}
                      placeholder="请输入" 
                      type="text" />

                    <Select 
                      {...getFieldProps('intravenousSpeedUnion',{
                        rules: [{ required: true, message: '请输入' }],
                        initialValue: data['intravenousSpeedUnion'] || '',
                      })}
                      readOnly={readOnly}
                      placeholder="请选择单位"
                      itemClassId="590af571-d04b-11e9-8022-000c29ee981b" />

                </div>
              </div>              
              <div className="error">{getFieldError('intravenousSpeed')}</div>
            </div>

            {warpListField('serviceTime',{
              required: true,
              label: '共使用时间',
              pattern:Reg.number
            },(
              <input placeholder="请输入" type="text" />
            ),'小时')}

          </div>

          <div className="list-title">注射用比伐芦定溶剂</div>
          
          <div className="list">
            {warpListField('tradeNameOfBivaludine',{
              label: '品名',
            },(
              <input placeholder="请输入" type="text" />
            ))}

            {warpListField('specificationOfBivaludine',{
              label: '规格',
            },(
              <input placeholder="请输入" type="text" />
            ))}

            {warpListField('batchNumberOfBivaludine',{
              label: '批号',
              pattern:Reg.enNumber
            },(
              <input placeholder="请输入" type="text" />
            ))}
            
            {warpListField('otherOfBivaludine',{
              label: '其他',
            },(
              <input placeholder="请输入" type="text" />
            ))}

          </div>

          <div className="list-title">患者术前合并用药</div>
          <PremedicateList 
            {...getFieldProps('premedicateList',{
              initialValue: data['premedicateList'] || [{}],
            })}
            readOnly={readOnly}
          />
          <div className="list">            
            <div className="item">
              <div className="inner" style={{borderBottom: 0}}>
                <div className="label">其他药物</div>
              </div>
            </div>
            <Textarea
              {...getFieldProps('otherPremedicate', {
                initialValue: data['otherPremedicate'] || '',
              })}
              readOnly={readOnly}
              placeholder="如果使用其他药物，请列举"
            />
          </div>

          <div className="list-title">冠脉造影术前心脏超声</div>
          <div className="list">

            {warpListField('ultrasound',{
              label: '未行心脏超声检查',
              initialValue: data['ultrasound']
            },(
              <RadioGroup options={[{uniqueCode: true,nameChs:'是'},{uniqueCode: false,nameChs:'否'}]} />
            ))}

            { getFieldValue('ultrasound') === true && (
            <React.Fragment>
              <div className="item">
                <div className="inner" style={{borderBottom: 0}}>
                  <div className="label">原因</div>
                </div>
              </div>
              <Textarea
                {...getFieldProps('reasonOfNo', {
                  initialValue: data['reasonOfNo'] || '',
                })}
                readOnly={readOnly}
                placeholder="请输入" 
              />

              <Attachments
                {...getFieldProps('coronaryAngiographyFileIdList', {
                  initialValue: data['coronaryAngiographyFileIdList'] || [],
                })}
                title="未行心脏超声原因-附件"
                readOnly={readOnly}
              />

            </React.Fragment>
            )}
            
            {warpListField('lvef',{
              label: '左室射血分数LVEF',
              pattern: Reg.number,
            },(
              <input placeholder="请输入" type="text" />
            ),'%')}

            {warpListField('diastoleInnerDiameterLeftVentricle',{
              label: '左室舒末内径',
              pattern: Reg.number,
            },(
              <input placeholder="请输入" type="text" />
            ),'mm')}

            {warpListField('shrinkInnerDiameterLeftVentricle',{
              label: '左室收末内径',
              pattern: Reg.number,
            },(
              <input placeholder="请输入" type="text" />
            ),'mm')}


            {warpListField('valveStenosis',{
              label: '是否发生瓣膜狭窄或关闭不全(中度以上)',
              initialValue: data['valveStenosis']
            },(
              <RadioGroup options={[{uniqueCode: true,nameChs:'是'},{uniqueCode: false,nameChs:'否'}]} />
            ))}

            { getFieldValue('valveStenosis') === true && (
            <React.Fragment>
              <div className="item">
                <div className="inner" style={{borderBottom: 0}}>
                  <div className="label">具体情况</div>
                </div>
              </div>
              <Textarea
                {...getFieldProps('valveStenosisCase', {
                  initialValue: data['valveStenosisCase'] || '',
                })}
                readOnly={readOnly}
                placeholder="请针对二尖瓣 三尖瓣 主动脉瓣 肺动脉瓣具体描述" 
              />

              <Attachments
                {...getFieldProps('coronaryAngiographUnCloseFileIdList', {
                  initialValue: data['coronaryAngiographUnCloseFileIdList'] || [],
                })}                
                title="瓣膜狭窄或关闭不全具体情况-附件"
                readOnly={readOnly}
              />

            </React.Fragment>
            )}
            
            {warpListField('regionalWallMotionAbnormality',{
              label: '节段性室壁运动异常',
              initialValue: data['regionalWallMotionAbnormality']
            },(
              <RadioGroup options={[{uniqueCode: true,nameChs:'是'},{uniqueCode: false,nameChs:'否'}]} />
            ))}

            { getFieldValue('regionalWallMotionAbnormality') === true && (
            <React.Fragment>
              <div className="item">
                <div className="inner" style={{borderBottom: 0}}>
                  <div className="label">具体情况</div>
                </div>
              </div>
              <Textarea
                {...getFieldProps('regionalWallMotionAbnormalityCase', {
                  initialValue: data['regionalWallMotionAbnormalityCase'] || '',
                })}
                readOnly={readOnly}
                placeholder="请输入" 
              />
            </React.Fragment>
            )}

          </div>

          <div className="list-title">患者血管入路</div>
          <div className="list">
            <CoronaryApproachList 
              {...getFieldProps('coronaryApproachDtos', {
                initialValue: data['coronaryApproachDtos'] || [],
              })}
              readOnly={readOnly}
            />

            <div className="item">
                <div className="inner" style={{borderBottom: 0}}>
                  <div className="label">其他</div>
                </div>
              </div>
              <Textarea
                {...getFieldProps('otherCoronaryApproach', {
                  initialValue: data['otherCoronaryApproach'] || '',
                })}
                readOnly={readOnly}
                placeholder="请输入" 
              />

          </div>

          <div className="list-title">患者置入鞘管大小</div>
          <div className="list">
            {warpListField('inSheathPipe',{
              label: '患者置入鞘管大小',
              initialValue: data['inSheathPipe']
            },(
              <CheckboxGroup itemClassId="b65e5eb3-d054-11e9-8022-000c29ee981b" />
            ))}
          </div>

          <div className="list-title">ACT监测</div>
          <div className="list">

           {warpListField('monitorAct',{
              label: '是否监测ACT',
              initialValue: data['monitorAct']
            },(
              <RadioGroup options={[{uniqueCode: true,nameChs:'是'},{uniqueCode: false,nameChs:'否'}]} />
            ))}

            { getFieldValue('monitorAct') === false && (
            <React.Fragment>
              <div className="item">
                <div className="inner" style={{borderBottom: 0}}>
                  <div className="label">原因</div>
                </div>
              </div>
              <Textarea
                {...getFieldProps('reasonOfNotMonitorAct', {
                  initialValue: data['reasonOfNotMonitorAct'] || '',
                })}
                readOnly={readOnly}
                placeholder="请输入" 
              />
            </React.Fragment>
            )}

            <ActInfos 
              {...getFieldProps('actInfos',{
                initialValue: data['actInfos'] || [{}],
              })}
              readOnly={readOnly}
            />

            <p style={{padding:'10px',margin: '0'}}>
                <i className="tmfont tm-icon-pv_medicalreasons" style={{color:'#0AA3B5'}}></i>    
                若ACT检测次数>=4次，则视在“最后一次ACT检测”中填写最后一次的信息。例如若进行了5次ACT检测，则在“最后一次ACT检测”中只填写第五次的信息。</p>
            <div className="item">
              <div className="inner" style={{borderBottom: 0}}>
                <div className="label">其他情况</div>
              </div>
            </div>
            <Textarea
              {...getFieldProps('otherActInfo', {
                initialValue: data['otherActInfo'] || '',
              })}
              readOnly={readOnly}
              placeholder="请填写其他情况" 
            />
          </div>

          <div className="list-title">患者冠脉造影情况</div>
          <div className="list">
            {warpListField('coronaryArteryOrigin',{
              label: '冠脉起源',
            },(
              <RadioGroup itemClassId="4dd9193f-d055-11e9-8022-000c29ee981b" />
            ))}

            { getFieldValue('coronaryArteryOrigin') === '9b3e4e3c-d055-11e9-8022-000c29ee981b' && (
            <React.Fragment>
              <div className="item">
                <div className="inner" style={{borderBottom: 0}}>
                  <div className="label">原因</div>
                </div>
              </div>
              <Textarea
                {...getFieldProps('coronaryArteryOriginReason', {
                  initialValue: data['coronaryArteryOriginReason'] || '',
                })}
                readOnly={readOnly}
                placeholder="请具体描述" 
              />
            </React.Fragment>
            )}

            {warpListField('coronaryAdvantage',{
              label: '冠脉优势',
            },(
              <RadioGroup itemClassId="6a39b9ac-d06a-11e9-90ac-2016b96577f4" />
            ))}
          </div>

          <div className="list-title">冠脉病变</div>
          <CoronaryLesionList 
            {...getFieldProps('coronaryLesionList',{
              initialValue: data['coronaryLesionList'] || [{}],
            })}
            readOnly={readOnly}
          />
          <div className="list">
          <Attachments
            {...getFieldProps('coronaryLesionFileIdList', {
              initialValue: data['coronaryLesionFileIdList'] || [],
            })}
            title="冠脉病变-附件"
            readOnly={readOnly}
          />
          </div>


          <div className="list">
            {warpListField('otherCoronaryLesion',{
              label: '特殊情况',
            },(
              <CheckboxGroup itemClassId="6a3c2a18-d06a-11e9-a201-2016b96577f4" />
            ))}

            { getFieldValue('otherCoronaryLesion').indexOf('6a3ee8ee-d06a-11e9-9c83-2016b96577f4') !== -1 && (
              <React.Fragment>
              {warpListField('lesionLevel',{
                label: '级数',
              },(
                <RadioGroup itemClassId="6a3f101e-d06a-11e9-8171-2016b96577f4" />
              ),'级')}
              </React.Fragment>
            )}

            {warpListField('otherCoronary',{
              label: '特殊情况发生冠脉',
            },(
              <CheckboxGroup itemClassId="6a3aa33a-d06a-11e9-bed6-2016b96577f4" />
            ))}

            <div className="item">
              <div className="inner" style={{borderBottom: 0}}>
                <div className="label">描述</div>
              </div>
            </div>
            <Textarea
              {...getFieldProps('otherCoronaryDesc', {
                initialValue: data['otherCoronaryDesc'] || '',
              })}
              readOnly={readOnly}
              placeholder="请针对特殊情况及发生冠脉进行描述"
            />


            <Attachments
              {...getFieldProps('coronaryAngiographSpecialFileIdList', {
                initialValue: data['coronaryAngiographSpecialFileIdList'] || [],
              })}
              title="冠脉病变特殊情况-附件"
              readOnly={readOnly}
            />

          </div>

          <div className="list-title">介入治疗情况</div>
          <div className="list">
            {warpListField('interventionInfo.interventionCoronary',{
              label: '干预血管',
              initialValue: data.interventionInfo['interventionCoronary'] 
            },(
              <CheckboxGroup itemClassId="6a3aa33a-d06a-11e9-bed6-2016b96577f4" />
            ))}

            {warpListField('interventionInfo.bp',{
              label: '球囊预扩张',
              initialValue: data.interventionInfo['bp'] 
            },(
              <RadioGroup options={[{uniqueCode: true,nameChs:'是'},{uniqueCode: false,nameChs:'否'}]} />
            ))}

            { getFieldValue('interventionInfo.bp') === true && (
              <React.Fragment>
              <div className="item">
                <div className="inner" style={{borderBottom: 0}}>
                  <div className="label">描述
                  <i className="tmfont tm-icon-pv_medicalreasons" style={{color:'#0AA3B5',marginLeft:'4px'}} onClick={() => Modal.alert('提示','请具体描述（球囊品种，球囊大小mm×mm，扩张压力atm，持续时间s，扩张次数）')}></i>
                  </div>
                </div>
              </div>
              <Textarea
                {...getFieldProps('interventionInfo.bpDescription', {
                  initialValue: data.interventionInfo['bpDescription'] || '',
                })}
                readOnly={readOnly}
                placeholder="请填写描述"
              />
              </React.Fragment>
            )}

            {warpListField('interventionInfo.si',{
              label: '支架植入术',
              initialValue: data.interventionInfo['si'] 
            },(
              <RadioGroup options={[{uniqueCode: true,nameChs:'是'},{uniqueCode: false,nameChs:'否'}]} />
            ))}

            { getFieldValue('interventionInfo.si') === true && (
              <React.Fragment>
              <div className="item">
                <div className="inner" style={{borderBottom: 0}}>
                  <div className="label">描述
                  <i className="tmfont tm-icon-pv_medicalreasons" style={{color:'#0AA3B5',marginLeft:'4px'}} onClick={() => Modal.alert('提示','请具体描述（支架品种，支架植入部位，支架大小mm×mm，扩张压力atm，持续时间s，注意支架是否串联）')}></i>
                  </div>
                </div>
              </div>
              <Textarea
                {...getFieldProps('interventionInfo.siDescription', {
                  initialValue: data.interventionInfo['siDescription'] || '',
                })}
                readOnly={readOnly}
                placeholder="请填写描述"
              />
              </React.Fragment>
            )}

            {warpListField('interventionInfo.pbd',{
              label: '球囊后扩张',
              initialValue: data.interventionInfo['pbd'] 
            },(
              <RadioGroup options={[{uniqueCode: true,nameChs:'是'},{uniqueCode: false,nameChs:'否'}]} />
            ))}


            { getFieldValue('interventionInfo.pbd') === true && (
              <React.Fragment>
              <div className="item">
                <div className="inner" style={{borderBottom: 0}}>
                  <div className="label">描述
                  <i className="tmfont tm-icon-pv_medicalreasons" style={{color:'#0AA3B5',marginLeft:'4px'}} onClick={() => Modal.alert('提示','请具体描述（球囊品种，球囊大小mm×mm，扩张压力atm，持续时间s，扩张次数）')}></i>
                  </div>
                </div>
              </div>
              <Textarea
                {...getFieldProps('interventionInfo.pbdDescription', {
                  initialValue: data.interventionInfo['pbdDescription'] || '',
                })}
                readOnly={readOnly}
                placeholder="请填写描述"
              />
              </React.Fragment>
            )}

            <Attachments
              {...getFieldProps('interventionInfoFileIdList', {
                initialValue: data['interventionInfoFileIdList'] || [],
              })}
              title="干预血管&相关操作-附件"
              readOnly={readOnly}
            />


            {warpListField('interventionInfo.otherOperation',{
              label: '其他特殊操作',
              initialValue: data.interventionInfo['otherOperation'] || '',
            },(
              <Select itemClassId="6a404888-d06a-11e9-a21c-2016b96577f4" />
            ))}

            <div className="item">
              <div className="inner" style={{borderBottom: 0}}>
                <div className="label">描述</div>
              </div>
            </div>
            <Textarea
              {...getFieldProps('interventionInfo.otherOperationDescription', {
              initialValue: data.interventionInfo['otherOperationDescription'] || '',
              })}
              readOnly={readOnly}
              placeholder="请具体描述" 
            />

            {warpListField('evaluationTypes',{
              label: '冠脉功能学评价',
            },(
              <CheckboxGroup itemClassId="6a421d5a-d06a-11e9-a666-2016b96577f4" />
            ))}


            <div className="item">
              <div className="inner" style={{borderBottom: 0}}>
                <div className="txt">（血流储备分数FFR）描述</div>
              </div>
            </div>
            <Textarea
              {...getFieldProps('ffrDesc', {
                initialValue: data['ffrDesc'] || '',
              })}
              readOnly={readOnly}
              placeholder="请具体描述"
            />


            <div className="item">
              <div className="inner" style={{borderBottom: 0}}>
                <div className="txt">（冠脉内超声IVUS）&（光学相干成像系统OCT）描述</div>
              </div>
            </div>
            <Textarea
              {...getFieldProps('ivusAndOctDesc', {
                initialValue: data['ivusAndOctDesc'] || '',
              })}
              readOnly={readOnly}
              placeholder="请具体描述"
            />


            <Attachments
              {...getFieldProps('evaluationFileIdList', {
                initialValue: data['evaluationFileIdList'] || [],
              })}
              title="冠脉功能学评价-附件"
              readOnly={readOnly}
            />


          </div>

          <div className="list-title">药品不良反应/事件</div>
          <div className="list">
            {warpListField('eventterm',{
              label: '不良事件名称',
            },(
              <input placeholder="请输入" type="text" />
            ))}

            {warpListField('dateofonset',{
              label: '不良事件时间',
            },(
              <DateInput mode='datetime' format='YYYY-MM-DD HH:mm'/>
            ))}

            {warpListField('eventoutcome',{
              label: '不良事件结果',
            },(
              <Select itemClassId="6a441990-d06a-11e9-8298-2016b96577f4" />
            ))}

            <div className="item">
              <div className="inner" style={{borderBottom: 0}}>
                <div className="txt">不良事件描述</div>
              </div>
            </div>
            <Textarea
              {...getFieldProps('eventDescription', {
                initialValue: data['eventDescription'] || '',
              })}
              readOnly={readOnly}
              placeholder="请输入"
            />

            {warpListField('therapeuticMeasures',{
              label: '治疗措施',
            },(
              <RadioGroup itemClassId="6a46b141-d06a-11e9-82a5-2016b96577f4" />
            ))}

            <div className="item">
              <div className="inner" style={{borderBottom: 0}}>
                <div className="txt">其他处理</div>
              </div>
            </div>
            <Textarea
              {...getFieldProps('otherTreatment', {
                initialValue: data['otherTreatment'] || '',
              })}
              readOnly={readOnly}
              placeholder="请输入"
            />

            {warpListField('treatmentOutcome',{
              label: '治疗结果',
            },(
              <Select itemClassId="6a441990-d06a-11e9-8298-2016b96577f4" />
            ))}


           {warpListField('laboratoryInspection',{
              label: '是否进行实验室检查',
              initialValue: data['laboratoryInspection']
            },(
              <RadioGroup options={[{uniqueCode: true,nameChs:'是'},{uniqueCode: false,nameChs:'否'}]} />
            ))}


            <div className="item">
              <div className="inner" style={{borderBottom: 0}}>
                <div className="txt">实验室检查描述</div>
              </div>
            </div>
            <Textarea
              {...getFieldProps('laboratoryInspectionDesc', {
                initialValue: data['laboratoryInspectionDesc'] || '',
              })}
              readOnly={readOnly}
              placeholder="可针对血常规；肝肾功能电解质；&#10;心肌标志物等实验室检查项目进行描述"
            />

            <Attachments
              {...getFieldProps('eventFileIdList', {
                initialValue: data['eventFileIdList'] || [],
              })}
              title="实验室检查-附件"
              readOnly={readOnly}
            />
            
           {warpListField('acceptFollowup',{
              label: '是否接受随访',
              initialValue: data['acceptFollowup']
            },(
              <RadioGroup options={[{uniqueCode: true,nameChs:'是'},{uniqueCode: false,nameChs:'否'}]} />
            ))}


          </div>

      
        </div>
        {!readOnly && (
        <div className="footer">
          <Button  onClick={this.handleSave}>保存</Button>
          <Button type="primary" onClick={this.handleSubmit}>提交</Button>
        </div>
        )}
      </div>
    );
  }
}
export default createForm({
  onValuesChange: (props, changed, all) => {
    if(changed.birthday){
      props.form.setFieldsValue({ age:  moment().diff(changed.birthday, 'years') })
    }
  }
})(Detail);