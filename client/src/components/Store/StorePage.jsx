import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  func, arrayOf, shape, bool
} from 'prop-types';
import {
  fetchGroceries,
  addGroceryToCart,
  removeGroceryFromCart
} from '../../actions/groceryActions';

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
    removeGroceryFromCart: func.isRequired
  }

  state = {
    displayModal: false
  }

  componentDidMount() {
    this.props.fetchGroceries();
  }

  toggleModal = () => {
    this.setState(prevState => ({
      displayModal: !prevState.displayModal
    }));
  }

  render() {
    const { displayModal } = this.state;
    const { groceries, isLoading, cartItems } = this.props;
    return (
      <main id="store" className="container">
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
          />
        )}
      </main>
    );
  }
}

const mapStateToProps = ({ allGroceries, allCartItems }) => ({
  isLoading: allGroceries.isLoading,
  groceries: allGroceries.groceries,
  cartItems: allCartItems.cartItems
});

export default connect(
  mapStateToProps, {
    fetchGroceries,
    addGroceryToCart,
    removeGroceryFromCart
  }
)(StorePage);
