import React, { Component } from 'react';
import { Pane, Heading, Button } from 'evergreen-ui';
import { withRouter } from 'react-router-dom';

class Nav extends Component {
  onChangeNav = (item) => () => {
    this.props.history.push(`/${item.key}`);
  }

  render() {
    const availableNav = [
      { key: "product", label: "Product" },
      { key: "other_list", label: "Other List" },
      { key: "account", label: "Account" },
    ];

    return (
      <Pane display='flex' padding={16} borderRadius={3} elevation={2}>
        <Pane flex={1} alignItems='center' display='flex' justifyContent='space-between'>
          <Heading size={600}>CTLG</Heading>
          <Pane>
            {availableNav.map(item => <Button onClick={this.onChangeNav(item)} key={item.key} appearance='minimal'>{item.label}</Button>)}
          </Pane>
        </Pane>
      </Pane>
    )
  }
}

export default withRouter(Nav);