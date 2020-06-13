import moment from 'moment'
export const formatDate=(v)=>{
    if(!v)return ''
    return moment(v).format('YYYY/MM/DD')
}