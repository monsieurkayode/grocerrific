/* eslint-disable no-underscore-dangle */
import React from 'react';
import { shallow } from 'enzyme';
import {
  InventoryPage,
  mapStateToProps
} from '../../../components/Inventory/InventoryPage';
import mockGroceries from '../../__mocks__/mockGroceries';

const setup = () => {
  const props = {
    groceries: mockGroceries,
    cartItems: [],
    isLoading: false,
    makingAjaxRequest: false,
    checkingOut: false,
    fetchGroceries: jest.fn(),
    removeGroceryFromCart: jest.fn(),
    addGroceryItem: jest.fn(() => Promise.resolve()),
    setError: jest.fn(),
    updateGroceryItem: jest.fn(() => Promise.resolve()),
    deleteGroceryItem: jest.fn(() => Promise.resolve()),
    checkout: jest.fn(() => Promise.resolve()),
    clearGroceryCart: jest.fn(),
    error: {}
  };

  const wrapper = shallow(<InventoryPage {...props} />);

  return { wrapper, props };
};

describe('InventoryPage Component', () => {
  const { wrapper, props } = setup();

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a ToastContainer', () => {
    expect(wrapper.find('ToastContainer').length).toBe(1);
  });

  it('should render ManageInventoryItem if displayModal is true', () => {
    wrapper.setState({ displayModal: true });
    wrapper.setState({
      displayModal: true,
      groceryItem: { id: mockGroceries[0]._id }
    });
    expect(wrapper.find('ManageInventoryItem').length).toBe(1);
  });

  it('should render Cart if displayCart is true', () => {
    wrapper.setState({ displayModal: false, displayCart: true });
    expect(wrapper.find('Cart').length).toBe(1);
  });

  it('should render DeleteModal if displayDeleteModal is true', () => {
    wrapper.setState({ displayCart: false, displayDeleteModal: true });
    expect(wrapper.find('DeleteModal').length).toBe(1);
  });

  it('should call toggleModal when the Add Grocery button is clicked', () => {
    const toggleModalSpy = jest.spyOn(wrapper.instance(), 'toggleModal');
    wrapper.instance().toggleModal();
    expect(toggleModalSpy).toHaveBeenCalled();
  });

  it('should call openEditModal with item details', () => {
    const openEditModalSpy = jest.spyOn(wrapper.instance(), 'openEditModal');
    wrapper.instance().openEditModal({});
    expect(openEditModalSpy).toHaveBeenCalledWith({});
  });

  it('should call openDeleteModal with item details', () => {
    const openDeleteModalSpy = jest.spyOn(
      wrapper.instance(), 'openDeleteModal'
    );
    wrapper.instance().openDeleteModal({});
    expect(openDeleteModalSpy).toHaveBeenCalledWith({});
  });

  it('should call closeModal', () => {
    const closeModalSpy = jest.spyOn(wrapper.instance(), 'closeModal');
    wrapper.instance().closeModal();
    expect(closeModalSpy).toHaveBeenCalled();
  });

  it('should call openCartModal', () => {
    const openCartModalSpy = jest.spyOn(wrapper.instance(), 'openCartModal');
    wrapper.instance().openCartModal({});
    wrapper.setState({ orderProcessed: true });
    wrapper.instance().openCartModal({});
    expect(openCartModalSpy).toHaveBeenCalledWith({});
  });

  it('should call handleInputChange with event', () => {
    const handleInputChangeSpy = jest.spyOn(
      wrapper.instance(), 'handleInputChange'
    );
    wrapper.instance().handleInputChange({ target: { name: '', value: '' } });
    expect(handleInputChangeSpy).toHaveBeenCalled();
  });

  it('should call handleSubmit', () => {
    const handleSubmitSpy = jest.spyOn(wrapper.instance(), 'handleSubmit');
    wrapper.instance().handleSubmit({ preventDefault: jest.fn() });
    expect(handleSubmitSpy).toHaveBeenCalled();
  });

  it('should set errors if submitted form is invalid', () => {
    wrapper.instance().handleSubmit({ preventDefault: jest.fn() });
    expect(wrapper.state().errors).toEqual({
      name: 'Name is required',
      price: 'Price is required',
      quantity: 'Quantity is required'
    });
  });

  it('should submit sucessfully for valid form', () => {
    wrapper.setState({
      groceryItem: { ...mockGroceries[0], id: mockGroceries[0]._id }
    });
    wrapper.instance().handleSubmit({ preventDefault: jest.fn() });
    wrapper.setState({
      groceryItem: { ...mockGroceries[0] }
    });
    wrapper.instance().handleSubmit({ preventDefault: jest.fn() });
    expect(wrapper.state().errors).toEqual({});
    wrapper.instance().handleSubmit({ preventDefault: jest.fn() });
    wrapper.setProps({ error: { message: 'Invalid' } });
  });

  it('should call handleDelete', () => {
    const handleDeleteSpy = jest.spyOn(wrapper.instance(), 'handleDelete');
    wrapper.instance().handleDelete(wrapper.state().groceryItem.id);
    expect(handleDeleteSpy).toHaveBeenCalled();
  });

  it('should call handleCheckout', () => {
    const handleCheckoutSpy = jest.spyOn(wrapper.instance(), 'handleCheckout');
    wrapper.instance().handleCheckout(props.cartItems);
    wrapper.instance().handleCheckout([{ id: 1 }]);
    expect(handleCheckoutSpy).toHaveBeenCalled();
  });

  it('should call handleFocus', () => {
    const handleFocusSpy = jest.spyOn(wrapper.instance(), 'handleFocus');
    wrapper.instance().handleFocus({ target: { name: 'name' } });
    expect(handleFocusSpy).toHaveBeenCalled();
  });

  describe('mapStateToProps', () => {
    it('returns an object from store', () => {
      const connectedProps = mapStateToProps({
        allGroceries: {
          isLoading: false,
          makingAjaxRequest: false,
          error: {},
          groceries: mockGroceries
        },
        allCartItems: { cartItems: [], checkingOut: false }
      });
      expect(connectedProps).toEqual({
        isLoading: false,
        makingAjaxRequest: false,
        error: {},
        groceries: mockGroceries,
        checkingOut: false,
        cartItems: []
      });
    });
  });
});
