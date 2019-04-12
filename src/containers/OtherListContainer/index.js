import React, { Component } from 'react';
import { Pane, Menu } from 'evergreen-ui';

import AuthorContainer from './AuthorContainer';

class OtherListContainer extends Component {
  state = {
    selectedTab: "author",
  };

  onChangeMenu = (selectedTab) => () => {
    this.setState({ selectedTab });
  };

  render() {
    const { selectedTab } = this.state;

    return (<div>
      <Pane display="flex" marginTop={16}>
        <Pane width={"25%"} display="inline-block" padding={16} borderRadius={3} elevation={1}>
          <Menu>
            <Menu.Group>
              <Menu.Item onSelect={this.onChangeMenu("author")}>Author</Menu.Item>
              <Menu.Item onSelect={this.onChangeMenu("category")}>Category</Menu.Item>
              <Menu.Item onSelect={this.onChangeMenu("publisher")}>Publisher</Menu.Item>
              <Menu.Item onSelect={this.onChangeMenu("store")}>Store</Menu.Item>
            </Menu.Group>
          </Menu>
        </Pane>
        <Pane display="inline-block" width={"74%"} marginLeft={"1%"} padding={16} borderRadius={3} elevation={1}>
          {selectedTab === "author" && <AuthorContainer />}
        </Pane>
      </Pane>
    </div>);
  }
}

export default OtherListContainer;
