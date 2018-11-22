import React from 'react';
import { shallow } from 'enzyme';
import Modal from '../../../components/common/Modal';

const setup = () => {
  const props = {
    title: 'grocery cart',
    closeModal: jest.fn(),
    children: <p>Hello</p>
  };

  const wrapper = shallow(<Modal {...props} />);

  return { wrapper, props };
};

describe('Modal Component', () => {
  const { wrapper, props } = setup();

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have a wrapping div with modal class', () => {
    expect(wrapper.find('.modal').length).toBe(1);
  });

  it('should have a h2 element with text grocery cart', () => {
    const modalHeader = wrapper.find('.heading h2');
    expect(modalHeader.length).toBe(1);
    expect(modalHeader.text()).toContain('grocery cart');
  });

  it('should have a close icon for closing modal', () => {
    const closeIcon = wrapper.find('.heading h2 span');
    expect(closeIcon.length).toBe(1);
  });

  it('should call closeModal function when the x icon is clicked', () => {
    const closeIcon = wrapper.find('.heading h2 span');
    closeIcon.simulate('click');
    expect(props.closeModal).toHaveBeenCalled();
  });
});
