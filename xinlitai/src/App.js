import React from 'react';
import './App.less';
import './loading.less';
import { Router, Route, Redirect } from "react-router-dom";
import { Switch } from "react-router";
import history from './history'
import NoFound from './NoFound'
import List from './List'
import Detail from './Detail'

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/list" exact component={List} />
        <Route path="/detail/:id?" component={Detail} />
        <Redirect exact from="/" to="/list" />
        <Route component={NoFound}/>
      </Switch>
    </Router>
  );
}

export default App;
