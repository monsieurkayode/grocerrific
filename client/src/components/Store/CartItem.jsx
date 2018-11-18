import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  string, number, func, arrayOf, shape
} from 'prop-types';
import { updateCartItemQuantity } from '../../actions/groceryActions';

class CartItem extends Component {
  static propTypes = {
    id: string.isRequired,
    name: string.isRequired,
    price: number.isRequired,
    maxQuantity: number.isRequired,
    removeFromCart: func.isRequired,
    updateCartItemQuantity: func.isRequired,
    cartItems: arrayOf(shape({})).isRequired
  }

  state = { orderQuantity: 1 }

  componentDidMount() {
    const { cartItems, id } = this.props;
    const cartItem = cartItems.find(item => item.id === id);
    this.setState({
      orderQuantity: cartItem.quantity
    });
  }

  handleInputChange = (event) => {
    const { maxQuantity } = this.props;

    if (event.target.value) {
      if (this.isValidQuantity(event.target.value, maxQuantity)) {
        this.setState({
          [event.target.name]: Number(event.target.value)
        }, this.handleQUantityChange);
      }
    }

    if (!event.target.value) {
      this.setState({
        [event.target.name]: event.target.value
      });
    }
  }

  incrementQuantity = () => {
    const { maxQuantity } = this.props;
    this.setState((prevState) => {
      if (Number(prevState.orderQuantity + 1) <= maxQuantity) {
        return {
          orderQuantity: Number(prevState.orderQuantity) + 1
        };
      }
    }, this.handleQUantityChange);
  }

  decrementQuantity = () => {
    this.setState((prevState) => {
      if (Number(prevState.orderQuantity - 1) >= 1) {
        return {
          orderQuantity: Number(prevState.orderQuantity) - 1
        };
      }
    }, this.handleQUantityChange);
  }

  handleQUantityChange = () => {
    const { id, maxQuantity } = this.props;
    const { orderQuantity } = this.state;
    if (this.isValidQuantity(orderQuantity, maxQuantity)) {
      this.props.updateCartItemQuantity({
        id,
        quantity: Number(orderQuantity)
      });
    }
  }

  isValidQuantity = (value, maxQuantity) => (
    Number(value) >= 1 && Number(value) <= maxQuantity
  )

  revertInvalidQuantity = (event) => {
    const { cartItems, id } = this.props;
    if (!event.target.value) {
      const cartItem = cartItems.find(item => item.id === id);
      this.setState({
        orderQuantity: cartItem.quantity
      });
    }
  }

  render() {
    const {
      id,
      name,
      price,
      removeFromCart,
      maxQuantity,
      cartItems
    } = this.props;

    const { orderQuantity } = this.state;
    const { quantity } = cartItems.find(item => item.id === id);

    return (
      <div className="checkout-item-wrapper">
        <p className="item-name">{name}</p>
        <span className="order">
          <button
            className="inc"
            type="button"
            onClick={this.decrementQuantity}
            disabled={Number(orderQuantity) === 1}
          >
            -
          </button>
          <input
            name="orderQuantity"
            className="quantity"
            type="number"
            value={orderQuantity}
            onChange={this.handleInputChange}
            onBlur={this.revertInvalidQuantity}
          />
          <button
            className="dec"
            type="button"
            onClick={this.incrementQuantity}
            disabled={Number(orderQuantity) === maxQuantity}
          >
            +
          </button>
        </span>
        <span className="price">&#8358;{quantity * price}</span>
        <span
          onKeyPress={() => {}}
          role="button"
          tabIndex="0"
          onClick={() => removeFromCart(id)}
          className="remove"
        >
          &times;
        </span>
      </div>
    );
  }
}

export default connect(null, { updateCartItemQuantity })(CartItem);
