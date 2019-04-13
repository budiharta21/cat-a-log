import React, { Component } from 'react';
import { Pane, Menu } from 'evergreen-ui';

import AuthorContainer from './AuthorContainer';

class OtherListContainer extends Component {
  state = {
    selectedTab: "author",
  };

  onChangeMenu = (selectedTab) => {
    this.setState({ selectedTab });
  };

  render() {
    const { selectedTab } = this.state;

    const availableMenu = [
      { label: "Author", value: "author" },
      { label: "Category", value: "category" },
      { label: "Publisher", value: "publisher" },
      { label: "Store", value: "store" },
    ];
    
    return (<div>
      <Pane display='flex' marginTop={16}>
        <Pane width='25%' height='100%' display='inline-block' padding={16} borderRadius={3} elevation={1}>
          <Menu.OptionsGroup
            title='Other List'
            options={availableMenu}
            selected={selectedTab}
            onChange={item => this.onChangeMenu(item)}/>
        </Pane>
        <Pane display='inline-block' width='74%' marginLeft='1%' padding={16} borderRadius={3} elevation={1}>
          {selectedTab === "author" && <AuthorContainer />}
        </Pane>
      </Pane>
    </div>);
  }
}

export default OtherListContainer;
