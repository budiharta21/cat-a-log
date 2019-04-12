import React, { Component } from 'react';
import { Pane, Heading } from 'evergreen-ui';
import OtherListContainer from './containers/OtherListContainer/index';
class App extends Component {
  render() {
    return (<div>
      <Pane display="flex" padding={16} borderRadius={3} elevation={2}>
        <Pane flex={1} alignItems="center" display="flex">
          <Heading size={600}>CTLG</Heading>
        </Pane>
      </Pane>

      <OtherListContainer/>

    </div>);
  }
}

export default App;
