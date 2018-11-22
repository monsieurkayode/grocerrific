import React from 'react';
import { shallow } from 'enzyme';
import Loader from '../../../components/common/Loader';

describe('Loader Component', () => {
  const wrapper = shallow(<Loader size={20} />);

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('has a single root div with "loader" class', () => {
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.find('.loader').length).toBe(1);
  });

  it('contains a PreloaderIcon Component', () => {
    expect(wrapper.find('PreloaderIcon').length).toBe(1);
  });
});
