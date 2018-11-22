import React from 'react';
import { Link } from 'react-router-dom';

// eslint-disable-next-line import/no-named-as-default
import Header from '../common/Header';

import cart from '../../assets/images/cart.png';
import brush from '../../assets/images/brush.png';

const LandingPage = () => (
  <main id="landing" className="container">
    <Header>
      <div className="header__right">
        <Link to="/store">
          <div className="start text__medium_bold uppercase">
            Enter Store
          </div>
        </Link>
      </div>
    </Header>
    <section>
      <div className="section__left">
        <div className="info__wrapper_top">
          <div className="info__wrapper_text text__bold">Grocerrific</div>
          <div className="info__wrapper_text text__bold">Marketplace</div>
        </div>
        <div className="info__wrapper_bottom">
          <p className="info__wrapper_text">
            We deliver on our promise of giving our users the best grocery
            shopping experience. Because we care a lot about our planet, all our
            products are organic and did we forget to mention terrific too?
          </p>
        </div>
        <div className="buttons__wrapper">
          <div className="designed__by">
            <img src={brush} alt="Brush" />
            <div className="info uppercase">
              <p className="info__top">Designed By</p>
              <p className="info__bottom">Emperor<span>&trade;</span></p>
            </div>
          </div>
          <div className="join">
            <img src={cart} alt="Cart" />
            <div className="info uppercase">
              <p className="info__top">Join the</p>
              <p className="info__bottom">Marketplace</p>
            </div>
          </div>
        </div>
      </div>
      <div className="section__right">
        <div id="card" />
      </div>
    </section>
  </main>
);

export default LandingPage;
