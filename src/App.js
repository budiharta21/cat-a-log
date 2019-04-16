import React, { Component } from 'react';
import { Route } from "react-router-dom";
import Nav from './component/Nav';
import OtherListContainer from './containers/OtherListContainer/index';

class App extends Component {
  render() {
    return (<div>
      <Nav/>
      
      <Route exact path='/other_list' component={OtherListContainer}/>
    </div>);
  }
}

export default App;
