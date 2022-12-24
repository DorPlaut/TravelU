import React from 'react';
// auth0
import { useAuth0 } from '@auth0/auth0-react';
// Compononets
import User from '../user-system/User';
import Logout from '../user-system/Logout';
import Login from '../user-system/Login';
// Npm packages
import { BsBellFill, BsImageAlt, BsPersonFill } from 'react-icons/bs';
import { RiLogoutBoxFill } from 'react-icons/ri';
import { FaMapMarkedAlt } from 'react-icons/fa';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { setIswritePost } from '../../redux/writePostSlice';
import { openMenu } from '../../redux/isUserMenuOpenSlice';
import { openProfile } from '../../redux/userProfileSlice';

function NavLinks({ setIsMenuOpen }) {
  // auth0
  const { user } = useAuth0();

  const isUserMenuOpen = useSelector((state) => state.isUserMenuOpen.value);
  const isWritePost = useSelector((state) => state.isWritePost.value);
  const isMobile = useSelector((state) => state.isMobile.value);
  const dispacth = useDispatch();
  const closeMenu = () => {
    dispacth(openMenu(false));

    setIsMenuOpen(false);
  };

  return (
    <div className="nav-links">
      {user ? (
        <ul>
          <li>
            <button
              className="btn"
              onClick={() => {
                dispacth(setIswritePost(true));
                closeMenu();
              }}
            >
              <span>
                <BsImageAlt />
              </span>
              Post new location
            </button>
          </li>

          <li>
            <button
              className="btn"
              onClick={() => {
                dispacth(openProfile(false));
                closeMenu();
              }}
            >
              <span>
                <BsBellFill />
              </span>
              News Feed
            </button>
          </li>
          {isMobile && user ? (
            <>
              <li>
                <button
                  className="btn"
                  onClick={() => {
                    dispacth(openProfile(true));
                    closeMenu();
                  }}
                >
                  <span>
                    <BsPersonFill />
                  </span>
                  Profile
                </button>
              </li>
              <li>
                <button
                  className="btn"
                  onClick={() => {
                    closeMenu();
                  }}
                >
                  <span>
                    <FaMapMarkedAlt />
                  </span>
                  My locations
                </button>
              </li>
              <li>
                <button className="btn">
                  <span>
                    <RiLogoutBoxFill />
                  </span>
                  <Logout />
                </button>
              </li>
            </>
          ) : (
            <li>
              <button
                className="btn user-btn"
                onClick={() => {
                  dispacth(openMenu(!isUserMenuOpen));
                }}
              >
                <User />
              </button>
            </li>
          )}
        </ul>
      ) : (
        <ul>
          <li>
            <button className="btn">
              <Login />
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default NavLinks;
