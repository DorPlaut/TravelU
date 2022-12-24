import React, { useState } from 'react';
// Npm packages
import { GiHamburgerMenu } from 'react-icons/gi';
// Components
import Logo from '../Logo';
import NavLinks from './NavLinks';
import UserMenu from './UserMenu';
// auth0
import { useAuth0 } from '@auth0/auth0-react';
// redux
import { useSelector, useDispatch } from 'react-redux';

function Navbar() {
  // auth0
  const { user } = useAuth0();
  // redux
  const dispacth = useDispatch();
  const isMobile = useSelector((state) => state.isMobile.value);
  const isUserMenuOpen = useSelector((state) => state.isUserMenuOpen.value);
  // local states
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <nav>
      <div className="navbar-container">
        <div className="navbar-links-container">
          {isMobile ? (
            <div className="mobile-navlinks-container">
              <button
                className="icon-btn menu-btn"
                onClick={() => {
                  setIsMenuOpen(!isMenuOpen);
                }}
              >
                <GiHamburgerMenu />
              </button>
              {isMenuOpen ? (
                <div className="container mobile-nav ">
                  <NavLinks setIsMenuOpen={setIsMenuOpen} />
                </div>
              ) : (
                ''
              )}
            </div>
          ) : (
            <div>
              {isUserMenuOpen && user ? (
                <div className="user-menu-container">
                  <UserMenu />
                </div>
              ) : (
                ''
              )}

              <div className="navbar-navlinks">
                <NavLinks setIsMenuOpen={setIsMenuOpen} />
              </div>
            </div>
          )}
        </div>
        <div className="nav-logo-background"></div>
        <div className="navbar-logo">
          <Logo />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
