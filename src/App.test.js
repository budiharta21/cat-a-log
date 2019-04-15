import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App';
import OtherListContainer from './containers/OtherListContainer';

describe("Test for <App/>", () => {
  it("Should render correctly", () => {
    shallow(<App/>);
  });

  it("Should contain <OtherListContainer/> ", () => {
    const wrapper = shallow(<App/>);
    expect(wrapper.contains(<OtherListContainer/>)).toEqual(true);
  });
});