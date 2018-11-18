import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import {
  func, arrayOf, shape, bool
} from 'prop-types';
import {
  fetchGroceries,
  removeGroceryFromCart,
  addGroceryItem,
  setError
} from '../../actions/groceryActions';
import { validateForm } from '../../../../shared/validator';
import { toastError } from '../../helpers/toaster';

import Cart from '../Store/Cart';
import Header from '../common/Header';
import InventoryList from './InventoryList';
import ManageInventoryItem from './ManageInventoryItem';

class InventoryPage extends Component {
  static propTypes = {
    fetchGroceries: func.isRequired,
    removeGroceryFromCart: func.isRequired,
    addGroceryItem: func.isRequired,
    groceries: arrayOf(shape({})).isRequired,
    cartItems: arrayOf(shape({})).isRequired,
    isLoading: bool.isRequired,
    isAdding: bool.isRequired,
    error: shape({}).isRequired,
    setError: func.isRequired
  }

  static initialState = () => ({
    displayModal: false,
    displayCart: false,
    groceryItem: {
      id: '',
      name: '',
      price: '',
      quantity: ''
    },
    errors: {}
  })

  state = { ...InventoryPage.initialState() }

  rootRef = React.createRef();

  componentDidMount() {
    this.props.fetchGroceries();
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.displayModal || nextState.displayCart) {
      this.rootRef.current.parentNode.style.overflow = 'hidden';
    } else {
      this.rootRef.current.parentNode.style.overflow = '';
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
    this.setState(prevState => ({
      displayCart: !prevState.displayCart
    }));
  }

  closeModal = () => {
    this.toggleModal();
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
      this.props.addGroceryItem(groceryItem)
        .then(() => {
          const { error } = this.props;
          if (Object.keys(error).length > 0) {
            // Show toast notification for failure here
            toastError(error.message);
          }
          this.setState({ ...InventoryPage.initialState() });
        });
    }

    this.setState({ errors });
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
      groceryItem,
      errors
    } = this.state;

    const {
      groceries,
      cartItems,
      isLoading,
      isAdding
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
              onKeyPress={() => {}}
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
            saving={isAdding}
            errors={errors}
          />)
        }
        { displayCart && (
          <Cart
            closeModal={this.openCartModal}
            cartItems={cartItems}
            removeFromCart={this.props.removeGroceryFromCart}
          />)
        }
      </main>
    );
  }
}

const mapStateToProps = ({ allGroceries, allCartItems }) => ({
  isLoading: allGroceries.isLoading,
  isAdding: allGroceries.isAdding,
  error: allGroceries.error,
  groceries: allGroceries.groceries,
  cartItems: allCartItems.cartItems
});

export default connect(mapStateToProps, {
  fetchGroceries,
  removeGroceryFromCart,
  addGroceryItem,
  setError
})(InventoryPage);
