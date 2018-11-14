import React from 'react';
import { node } from 'prop-types';

import logo from '../../assets/images/shoping_cart.png';

const Header = ({ children }) => (
  <header>
    <div className="header__left">
      <img id="logo" src={logo} alt="Brand" />
      <div id="brand" className="text__bold">
        Grocerrific<sup>&trade;</sup>
      </div>
    </div>
    { children }
  </header>
);

Header.propTypes = {
  children: node.isRequired
};

export default Header;
