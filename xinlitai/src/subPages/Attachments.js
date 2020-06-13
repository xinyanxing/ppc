import React from 'react';
import _ from 'lodash';
import { ImagePicker } from 'antd-mobile';
import fetch from "../fetch";
import CryptoJS from 'crypto-js';

const CRYPTOJSKEY = '4028eea46a5e4cf6016a5e4cf6f70000';
const encrypt = (plaintText) => {
  const options = {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  };
  const key = CryptoJS.enc.Utf8.parse(CRYPTOJSKEY);
  const encryptedData = CryptoJS.AES.encrypt(plaintText, key, options);
  const encryptedBase64Str = encryptedData.toString();
  return CryptoJS.SHA256(encryptedBase64Str).toString(CryptoJS.enc.Hex);
}

const getSign = (appId, contentType, fileName) => {
  const str = `appId=${appId}&contentType=${contentType}&fileName=${fileName}`
  return encrypt(str)
}

class Attachments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentDidMount() {
  }
  handleChange = async (files, operationType) => {
    const _files = await Promise.all(_.map(files, async (item) => {      
      if(!item.file){
        return item
      }

      const data = new FormData()
      data.append('file', item.file)
      data.append('fileName', item.file.name)
      data.append('contentType', item.file.type)
      data.append('appId', 'pv2')
      data.append('sign', getSign('pv2',item.file.type, item.file.name))
      const rev = await fetch({
        method:'post',
        url: '/file/resource/upload',
        baseURL : '/',
        data
      })
      if(!rev.success){
        return null
      }
      return rev.data
    }))

    this.props.onChange(_.compact(_files))
  }
  render(){
    const { value, readOnly, title = '附件' } = this.props
    return (
      <div className="item">
        <div className="inner">
          <div className="label" style={{width: '100%'}}>{title}</div>
        </div>
        
        <ImagePicker
          style={{borderBottom: '1px solid #E8E8E8'}}
          disableDelete={readOnly}
          selectable={!readOnly}
          multiple={true}
          files={_.map(value,v => ({url:v.previewUrl,...v}))}
          onChange={this.handleChange}
        />
      </div>);
  }
}
 

export default Attachments;