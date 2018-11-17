import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  func, arrayOf, shape, bool
} from 'prop-types';
import fetchGroceries from '../../actions/groceryActions';

import Header from '../common/Header';
import GroceryItemList from './GroceryItemList';
import Cart from './Cart';

class StorePage extends Component {
  static propTypes = {
    fetchGroceries: func.isRequired,
    groceries: arrayOf(shape({})).isRequired,
    isLoading: bool.isRequired
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
    const { groceries, isLoading } = this.props;
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
        <GroceryItemList
          groceries={groceries}
          loading={isLoading}
        />
        { displayModal && <Cart closeModal={this.toggleModal} /> }
      </main>
    );
  }
}

const mapStateToProps = ({ allGroceries }) => ({
  isLoading: allGroceries.isLoading,
  groceries: allGroceries.groceries
});

export default connect(mapStateToProps, { fetchGroceries })(StorePage);
