import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  func, arrayOf, shape, bool
} from 'prop-types';
import { ToastContainer } from 'react-toastify';
import { fetchGroceries } from '../../actions/groceryActions';
import {
  addGroceryToCart,
  removeGroceryFromCart,
  checkout,
  clearGroceryCart
} from '../../actions/cartActions';
import { toastWarning } from '../../helpers/toaster';

import Header from '../common/Header';
import GroceryItemList from './GroceryItemList';
import Cart from './Cart';

class StorePage extends Component {
  static propTypes = {
    fetchGroceries: func.isRequired,
    groceries: arrayOf(shape({})).isRequired,
    cartItems: arrayOf(shape({})).isRequired,
    isLoading: bool.isRequired,
    addGroceryToCart: func.isRequired,
    removeGroceryFromCart: func.isRequired,
    checkout: func.isRequired,
    checkingOut: bool.isRequired,
    clearGroceryCart: func.isRequired
  }

  state = {
    displayModal: false,
    orderProcessed: false
  }

  rootRef = React.createRef();

  componentDidMount() {
    this.props.fetchGroceries();
    this.rootRef.current.parentNode.parentNode.style.background = '#F6F6F6';
  }

  componentWillUpdate(nextProps, nextState) {
    const { displayModal } = nextState;
    if (displayModal) {
      this.togglePageScroll('hidden');
    } else {
      this.togglePageScroll('');
    }
  }

  componentWillUnmount() {
    this.rootRef.current.parentNode.parentNode.style.background = '';
  }

  togglePageScroll = (overflow) => {
    this.rootRef.current.parentNode.style.overflow = overflow;
  }

  toggleModal = () => {
    this.setState((prevState) => {
      if (prevState.orderProcessed) {
        this.props.clearGroceryCart();
        this.props.fetchGroceries();
        return {
          displayModal: !prevState.displayModal,
          orderProcessed: !prevState.orderProcessed
        };
      }
      return {
        displayModal: !prevState.displayModal
      };
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

  render() {
    const { displayModal } = this.state;
    const {
      groceries,
      isLoading,
      cartItems,
      checkingOut
    } = this.props;

    return (
      <main ref={this.rootRef} id="store" className="container">
        <ToastContainer />
        <Header>
          <div className="header__right">
            <Link to="/inventory">
              <div className="start text__medium_bold uppercase">
                Inventory
              </div>
            </Link>
            <div
              role="button"
              tabIndex="0"
              onKeyPress={() => {}}
              onClick={this.toggleModal}
              className="cart__wrapper"
            >
              <i className="material-icons cart">shopping_cart</i>
              <div className="cart__count">{cartItems.length}</div>
            </div>
          </div>
        </Header>
        <GroceryItemList
          groceries={groceries}
          loading={isLoading}
          addToCart={this.props.addGroceryToCart}
          removeFromCart={this.props.removeGroceryFromCart}
          cartItems={cartItems}
        />
        { displayModal && (
          <Cart
            closeModal={this.toggleModal}
            cartItems={cartItems}
            removeFromCart={this.props.removeGroceryFromCart}
            checkout={this.handleCheckout}
            checkingOut={checkingOut}
          />
        )}
      </main>
    );
  }
}

const mapStateToProps = ({ allGroceries, allCartItems }) => ({
  isLoading: allGroceries.isLoading,
  groceries: allGroceries.groceries,
  cartItems: allCartItems.cartItems,
  checkingOut: allCartItems.checkingOut
});

export default connect(
  mapStateToProps, {
    fetchGroceries,
    addGroceryToCart,
    removeGroceryFromCart,
    checkout,
    clearGroceryCart
  }
)(StorePage);
