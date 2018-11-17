import React from 'react';
import { number } from 'prop-types';
import PreloaderIcon from 'react-preloader-icon';
import Puff from 'react-preloader-icon/loaders/Puff';

/**
 *
 * @function Loader
 *
 * @param {object} props
 *
 * @return {JSX} JSX
 */
const Loader = ({ size }) => (
  <div className="loader">
    <PreloaderIcon
      loader={Puff}
      size={size}
      strokeWidth={12}
      strokeColor="#4d75a1"
      duration={1200}
    />
  </div>
);

Loader.propTypes = {
  size: number.isRequired
};

export default Loader;
