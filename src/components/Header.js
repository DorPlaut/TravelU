import React, { useState, useEffect } from 'react';
// Npm packages
import { Parallax } from 'react-scroll-parallax';
import { BsChevronDoubleDown } from 'react-icons/bs';
// redux
import { useSelector } from 'react-redux';
// auth0
import { useAuth0 } from '@auth0/auth0-react';
// Components
import User from './user-system/User';
import Logo from './Logo';

function Header() {
  // auth0
  const { user, isAuthenticated, isLoading, handleRedirectCallback } =
    useAuth0();
  // redux
  const isDarkMode = useSelector((state) => state.isDarkMode.value);
  const isHomePage = useSelector((state) => state.isHomePage.value);
  const fullUser = useSelector((state) => state.fullUser.value);

  return (
    <>
      <header className="header" id="top">
        <div>
          {isHomePage ? (
            <div className="logo-container">
              {/* <Parallax opacity={[15, 0]}> */}
              <Logo />
              {/* </Parallax> */}
            </div>
          ) : (
            ''
          )}
          {/* <Parallax speed={-40}> */}
          <div className="">
            <img
              src={isDarkMode ? './sky-night.jpg' : './sky-day.jpg'}
              alt=""
              className="image sky"
            />
          </div>
          {/* </Parallax> */}
          <div className="trees">
            {/* <Parallax speed={-5}> */}
            <img
              src="./trees2.png"
              alt=""
              className={isDarkMode ? 'threes-dark image' : 'image'}
            />
            {/* </Parallax> */}
          </div>
          <div className="header-userbox">
            <div className={fullUser ? 'user-box' : 'user-box invisible'}>
              <span>Welcome</span> <User />
            </div>
            <a href="#page-start">
              <button className="start-btn btn ">
                Lets Start <BsChevronDoubleDown />
              </button>
            </a>
          </div>
          <div className=" header-underline"></div>
        </div>
      </header>

      <div id="page-start"></div>
    </>
  );
}

export default Header;
