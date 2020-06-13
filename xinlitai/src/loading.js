const el =  document.querySelector('#loading')
let _num = 0

const show = () => {
  _num++;
  el.style.display = 'block'
}

const hide = () => {
  _num--;
  if(_num < 0) _num = 0
  if(_num === 0) {
    el.style.display = 'none'  
  }
}

export default {
  show,
  hide,
}