import React from 'react';
import { shallow } from 'enzyme';
import NoContent from '../../../components/common/NoContent';

describe('NoContent Component', () => {
  const wrapper = shallow(<NoContent content="404! Not Found" />);

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('has a single root div with class no-content', () => {
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.find('.no-content').length).toBe(1);
  });

  it('has a h3 element with text content 404! Not Found', () => {
    expect(wrapper.find('h3').length).toBe(1);
    expect(wrapper.find('h3').text()).toBe('404! Not Found');
  });
});
