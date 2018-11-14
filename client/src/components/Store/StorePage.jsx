import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Header from '../common/Header';
import GroceryItemList from './GroceryItemList';
import Cart from './Cart';

class StorePage extends Component {
  state = {
    displayModal: false
  }

  toggleModal = () => {
    this.setState(prevState => ({
      displayModal: !prevState.displayModal
    }));
  }

  render() {
    const { displayModal } = this.state;
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
              <div className="cart__count">2</div>
            </div>
          </div>
        </Header>
        <GroceryItemList />
        { displayModal && <Cart closeModal={this.toggleModal} /> }
      </main>
    );
  }
}

export default StorePage;
