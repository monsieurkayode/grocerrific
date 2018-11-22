import React from 'react';
import { shallow } from 'enzyme';
import NotFoundPage from '../../../components/NotFound/NotFoundPage';

describe('NotFoundPage Component', () => {
  const wrapper = shallow(<NotFoundPage />);

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
