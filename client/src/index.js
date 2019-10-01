/* eslint-disable import/no-named-as-default */
import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import store from './store';

import LandingPage from './components/Landing/LandingPage';
import StorePage from './components/Store/StorePage';
import InventoryPage from './components/Inventory/InventoryPage';
import NotFoundPage from './components/NotFound/NotFoundPage';

import './assets/styles/index.scss';

render(
  <Provider store={store}>
    <BrowserRouter>
      <Fragment>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/store" component={StorePage} />
          <Route exact path="/inventory" component={InventoryPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Fragment>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
