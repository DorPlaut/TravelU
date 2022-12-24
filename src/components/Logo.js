import React from 'react';
import { useSelector } from 'react-redux';

function Logo() {
  const isDarkMode = useSelector((state) => state.isDarkMode.value);

  return (
    <div className="logo">
      <a href="#top">
        <img
          src="./logo.svg"
          className={isDarkMode ? 'logo-dark' : 'logo-light'}
          alt=""
        />
        <h1>TravelU</h1>
        <h3>Travel, Share, Discover</h3>
      </a>
    </div>
  );
}

export default Logo;
