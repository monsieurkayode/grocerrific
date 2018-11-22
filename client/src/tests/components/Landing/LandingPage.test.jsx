import React from 'react';
import { shallow } from 'enzyme';
import LandingPage from '../../../components/Landing/LandingPage';

describe('LandingPage Component', () => {
  const wrapper = shallow(<LandingPage />);

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
