const Reg={
  cnen:{pattern:/^[\u4e00-\u9fa5_a-zA-Z]+$/,message:'仅中英文字符'},
  phone:{pattern:/^((0[0-9]{2,3}-?)([2-9][0-9]{6,7})+(-?[0-9]{1,4})?)|1\d{10}$/,message:'请填写正确手机号或固定电话'},
  number:{pattern:/^(0|[1-9][0-9]*)(\.[0-9]*)?$/,message:'请输入正确数字'},
  cnenNumber:{pattern:/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/,message:'仅中英文字符+数字'},
  enNumber:{pattern:/^[a-zA-Z0-9]+$/,message:'仅英文字符+数字'},
  int:{pattern:/^[0-9]+$/,message:'仅大于0数字'},
}

export default Reg