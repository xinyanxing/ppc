import React from 'react';
import { button } from './button';
interface ButtonPropsTypes {
  size: string;
}

class Button extends React.Component<ButtonPropsTypes> {
  componentDidMount() {
    this.init();
  }

  init = () => {};

  render() {
    return <div>按钮</div>;
  }
}
export { Button };
