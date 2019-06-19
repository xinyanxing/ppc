'use strict';
import React from 'react'
import ReactDom from 'react-dom'
import { helloword } from './helloword'
import './search.less';

class App extends React.Component {
    render() {
        return <div className="layout">{helloword()}</div>
    }
}
ReactDom.render(<App />, document.getElementById('root'))
