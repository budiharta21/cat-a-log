import React from 'react';
import { shallow } from 'enzyme';

import OtherListContainer from './index';
import AuthorContainer from './AuthorContainer';

describe("Test for <App/>", () => {
  it("Should render correctly", () => {
    shallow(<OtherListContainer/>);
  });

  it("Should render <AuthorContainer/> on tab author selected", () => {
    const wrapper  = shallow(<OtherListContainer/>);
    wrapper.setState({ selectedTab: "author" });
    expect(wrapper.contains(<AuthorContainer/>)).toEqual(true);    
  });
});
