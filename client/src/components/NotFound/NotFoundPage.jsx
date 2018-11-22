import React from 'react';
import { Link } from 'react-router-dom';

// eslint-disable-next-line import/no-named-as-default
import Header from '../common/Header';
import NoContent from '../common/NoContent';

const NotFoundPage = () => (
  <main id="inventory" className="container">
    <Header>
      <div className="header__right">
        <Link to="/store">
          <div className="start text__medium_bold uppercase">
            Back to store
          </div>
        </Link>
      </div>
    </Header>
    <section id="inventory__display">
      <NoContent
        content="404! You have reached the end of the rainbow :-)"
      />
    </section>
  </main>
);

export default NotFoundPage;
