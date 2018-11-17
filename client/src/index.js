import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import store from './store';

import LandingPage from './components/Landing/LandingPage';
import StorePage from './components/Store/StorePage';
import InventoryPage from './components/Inventory/InventoryPage';

import './assets/styles/index.scss';

render(
  <Provider store={store}>
    <BrowserRouter>
      <Fragment>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/store" component={StorePage} />
        <Route exact path="/inventory" component={InventoryPage} />
      </Fragment>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
