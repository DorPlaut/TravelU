import React from 'react';
// Components
import Logout from '../user-system/Logout';

// redux
import { useDispatch } from 'react-redux';
import { openProfile } from '../../redux/userProfileSlice';
import { openMenu } from '../../redux/isUserMenuOpenSlice';

function UserMenu() {
  // redux
  const dispacth = useDispatch();
  return (
    <div className="user-menu">
      <ul>
        <>
          <li
            className="btn"
            onClick={() => {
              dispacth(openProfile(true));
              dispacth(openMenu(false));
            }}
          >
            Profile
          </li>
          <li className="btn">My locations</li>
          <li className="btn">
            <Logout />
          </li>
        </>
      </ul>
    </div>
  );
}

export default UserMenu;
