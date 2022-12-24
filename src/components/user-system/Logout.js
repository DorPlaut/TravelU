import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Logout = () => {
  const { logout } = useAuth0();

  return (
    <a
      className="logout-link nav-link "
      onClick={() => logout({ returnTo: window.location.origin })}
    >
      Logout
    </a>
  );
};

export default Logout;
