import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import {
  func, arrayOf, shape, bool
} from 'prop-types';
import {
  fetchGroceries,
  addGroceryItem,
  setError,
  updateGroceryItem,
  deleteGroceryItem
} from '../../actions/groceryActions';
import {
  removeGroceryFromCart,
  checkout,
  clearGroceryCart
} from '../../actions/cartActions';
import { validateForm } from '../../../../shared/validator';
import { toastError, toastWarning } from '../../helpers/toaster';
import Cart from '../Store/Cart';
// eslint-disable-next-line import/no-named-as-default
import Header from '../common/Header';
import InventoryList from './InventoryList';
import ManageInventoryItem from './ManageInventoryItem';
import DeleteModal from './DeleteModal';

export class InventoryPage extends Component {
  static initialState = () => ({
    displayModal: false,
    displayCart: false,
    displayDeleteModal: false,
    orderProcessed: false,
    groceryItem: {
      id: '',
      name: '',
      price: '',
      quantity: ''
    },
    modalContent: {},
    errors: {}
  })

  state = { ...InventoryPage.initialState() }

  rootRef = React.createRef();

  componentDidMount() {
    this.props.fetchGroceries();
    if (this.rootRef.current) {
      this.rootRef.current.parentNode.parentNode.style.background = '#F6F6F6';
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const { displayCart, displayDeleteModal, displayModal } = nextState;
    if (displayModal || displayCart || displayDeleteModal) {
      this.togglePageScroll('hidden');
    } else {
      this.togglePageScroll('');
    }
  }

  componentWillUnmount() {
    this.rootRef.current.parentNode.parentNode.style.background = '';
  }

  togglePageScroll = (overflow) => {
    if (this.rootRef.current) {
      this.rootRef.current.parentNode.parentNode.style.background = overflow;
    }
  }

  toggleModal = () => {
    this.setState(prevState => ({
      displayModal: !prevState.displayModal
    }));
  }

  openEditModal = (modalContent) => {
    this.toggleModal();
    this.setState({
      groceryItem: { ...modalContent }
    });
  }

  openCartModal = () => {
    this.setState((prevState) => {
      if (prevState.orderProcessed) {
        this.props.clearGroceryCart();
        this.props.fetchGroceries();
        return {
          displayCart: !prevState.displayCart,
          orderProcessed: !prevState.orderProcessed
        };
      }
      return {
        displayCart: !prevState.displayCart
      };
    });
  }

  openDeleteModal = (modalContent) => {
    this.setState(prevState => ({
      displayDeleteModal: !prevState.displayDeleteModal,
      modalContent
    }));
  }

  closeModal = () => {
    this.setState({ ...InventoryPage.initialState() });
  }

  handleInputChange = (event) => {
    const { groceryItem } = this.state;
    groceryItem[event.target.name] = event.target.value;

    this.setState({ groceryItem });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { groceryItem } = this.state;
    const { isValid, errors } = validateForm(groceryItem);

    if (isValid) {
      this.props.setError({});
      const action = groceryItem.id
        ? this.props.updateGroceryItem
        : this.props.addGroceryItem;
      action(groceryItem)
        .then(() => {
          const { error } = this.props;
          if (Object.keys(error).length > 0) {
            toastError(error.message);
          }
          this.setState({ ...InventoryPage.initialState() });
        });
    }

    this.setState({ errors });
  }

  handleDelete = (id) => {
    this.props.deleteGroceryItem(id)
      .then(() => {
        this.props.fetchGroceries();
        this.setState({ ...InventoryPage.initialState() });
      });
  }

  handleCheckout = (cart) => {
    if (cart.length === 0) {
      return toastWarning('Grocery Cart is empty');
    }
    this.props.checkout(cart)
      .then(() => {
        this.setState({ orderProcessed: true });
      });
  }

  handleFocus = (event) => {
    const { errors } = this.state;
    errors[event.target.name] = '';
    this.setState({ errors });
  }

  render() {
    const {
      displayModal,
      displayCart,
      displayDeleteModal,
      groceryItem,
      modalContent,
      errors
    } = this.state;

    const {
      groceries,
      cartItems,
      isLoading,
      makingAjaxRequest,
      checkingOut
    } = this.props;

    return (
      <main ref={this.rootRef} id="inventory" className="container">
        <ToastContainer className="capitalize" />
        <Header>
          <div className="header__right">
            <Link to="/store">
              <div className="start text__medium_bold uppercase">
                Back to store
              </div>
            </Link>
            <div
              role="button"
              tabIndex="0"
              onClick={this.openCartModal}
              className="cart__wrapper"
            >
              <i className="material-icons cart">shopping_cart</i>
              <div className="cart__count">{cartItems.length}</div>
            </div>
          </div>
        </Header>
        <section id="inventory__display">
          <div className="top">
            <h1 className="header">Inventory</h1>
            <button
              className="add__grocery"
              type="button"
              onClick={this.toggleModal}
            >
              Add Grocery
            </button>
          </div>
          <InventoryList
            openModal={this.openEditModal}
            openDeleteModal={this.openDeleteModal}
            groceries={groceries}
            loading={isLoading}
          />
        </section>
        { displayModal && (
          <ManageInventoryItem
            title={groceryItem.id ? 'Update' : 'Add'}
            groceryItem={groceryItem}
            closeModal={this.closeModal}
            handleInputChange={this.handleInputChange}
            handleSubmit={this.handleSubmit}
            handleFocus={this.handleFocus}
            saving={makingAjaxRequest}
            errors={errors}
          />
        )
        }
        { displayCart && (
          <Cart
            closeModal={this.openCartModal}
            cartItems={cartItems}
            removeFromCart={this.props.removeGroceryFromCart}
            checkout={this.handleCheckout}
            checkingOut={checkingOut}
          />
        )
        }
        {
          displayDeleteModal && (
            <DeleteModal
              {...modalContent}
              deleting={makingAjaxRequest}
              closeModal={this.closeModal}
              handleDelete={this.handleDelete}
            />
          )
        }
      </main>
    );
  }
}

export const mapStateToProps = ({ allGroceries, allCartItems }) => ({
  isLoading: allGroceries.isLoading,
  makingAjaxRequest: allGroceries.makingAjaxRequest,
  error: allGroceries.error,
  groceries: allGroceries.groceries,
  cartItems: allCartItems.cartItems,
  checkingOut: allCartItems.checkingOut
});

InventoryPage.propTypes = {
  fetchGroceries: func.isRequired,
  removeGroceryFromCart: func.isRequired,
  addGroceryItem: func.isRequired,
  clearGroceryCart: func.isRequired,
  deleteGroceryItem: func.isRequired,
  groceries: arrayOf(shape({})).isRequired,
  cartItems: arrayOf(shape({})).isRequired,
  isLoading: bool.isRequired,
  makingAjaxRequest: bool.isRequired,
  error: shape({}).isRequired,
  setError: func.isRequired,
  updateGroceryItem: func.isRequired,
  checkout: func.isRequired,
  checkingOut: bool.isRequired
};

export default connect(mapStateToProps, {
  fetchGroceries,
  removeGroceryFromCart,
  addGroceryItem,
  setError,
  updateGroceryItem,
  deleteGroceryItem,
  checkout,
  clearGroceryCart
})(InventoryPage);
