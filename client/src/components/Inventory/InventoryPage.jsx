import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Cart from '../Store/Cart';
import Header from '../common/Header';
import InventoryList from './InventoryList';
import ManageInventoryItem from './ManageInventoryItem';

class InventoryPage extends Component {
  static initialState = () => ({
    displayModal: false,
    displayCart: false,
    groceryItem: {
      id: '',
      name: '',
      price: '',
      quantity: ''
    }
  })

  state = { ...InventoryPage.initialState() }

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

  render() {
    const { displayModal, displayCart, groceryItem } = this.state;

    return (
      <main id="inventory" className="container">
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
              <div className="cart__count">2</div>
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
          <InventoryList openModal={this.openEditModal} />
        </section>
        { displayModal && (
          <ManageInventoryItem
            title={groceryItem.id ? 'Update' : 'Add'}
            groceryItem={groceryItem}
            closeModal={this.closeModal}
            handleInputChange={this.handleInputChange}
          />)
        }
        { displayCart && <Cart closeModal={this.openCartModal} /> }
      </main>
    );
  }
}

export default InventoryPage;
