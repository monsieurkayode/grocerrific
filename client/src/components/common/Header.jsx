import React from 'react';
import { node, shape } from 'prop-types';
import { withRouter } from 'react-router-dom';

import logo from '../../assets/images/shoping_cart.png';

export const Header = ({ children, history }) => (
  <header>
    <div className="header__left">
      <img id="logo" src={logo} alt="Brand" />
      <div
        role="link"
        tabIndex="0"
        id="brand"
        className="text__bold"
        onClick={() => history.push('/')}
      >
        Grocerrific<sup>&trade;</sup>
      </div>
    </div>
    { children }
  </header>
);

Header.propTypes = {
  children: node.isRequired,
  history: shape({}).isRequired
};

export default withRouter(Header);
