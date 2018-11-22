import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../../components/common/Header';

const setup = () => {
  const props = {
    children: <p>Header</p>,
    history: {
      push: jest.fn()
    }
  };

  const wrapper = shallow(<Header {...props} />);

  return { wrapper, props };
};

describe('Header Component', () => {
  const { wrapper, props } = setup();

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call navigate to root page when the brand is clicked', () => {
    const brandLink = wrapper.find('.header__left div');
    brandLink.simulate('click');
    expect(props.history.push).toHaveBeenCalledWith('/');
  });
});
