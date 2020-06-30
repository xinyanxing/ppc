'use strict';
import React from 'react'
import ReactDom from 'react-dom'
import { helloword } from './helloword'

class App extends React.Component {
    render() {
        return <div >{helloword()}</div>
    }
}
ReactDom.render(<App />, document.getElementById('root'))
