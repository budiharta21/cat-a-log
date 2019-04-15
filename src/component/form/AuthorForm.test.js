import React from 'react';
import { shallow } from 'enzyme';
import AuthorForm from './AuthorForm';

it("Render <AuthorForm/>", () => {
  shallow(<AuthorForm />);
});