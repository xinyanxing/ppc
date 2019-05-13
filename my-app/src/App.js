import React from 'react';
import './App.css';
import { Hello } from './compents/test';

function App() {
  return (
    <div className="App">
      <Hello
        compiler={['ddd', 'mmmfffmd']}
        framework="ssss"
        curColor="dddfffffff"
      />
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      项目入口文件
    </div>
  );
}

export default App;
