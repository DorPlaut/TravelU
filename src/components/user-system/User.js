import React, { useState, useEffect } from 'react';
// Components
import Login from './Login';
// auth0
import { useAuth0 } from '@auth0/auth0-react';
// Npm packages
import { BsPersonFill } from 'react-icons/bs';
import axios from 'axios';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../redux/userSlice';
import { flipMode } from '../../redux/darkmodeSlice';

const User = () => {
  // redux
  const dispacth = useDispatch();
  // const fullUser = useSelector((state) => state.fullUser.value);
  const isPageUpdate = useSelector((state) => state.isPageUpdate.value);
  const fullUser = useSelector((state) => state.fullUser.value);
  // local states
  const [loadUser, setLoadUser] = useState(true);
  const [profilePic, setProfilePicutre] = useState('');
  const [fullName, setFullName] = useState('');

  // auth0
  const {
    user,
    isAuthenticated,
    isLoading,
    handleRedirectCallback,
    getAccessTokenSilently,
  } = useAuth0();

  // Post user to the server
  const url = process.env.REACT_APP_SERVER_URL;
  const postUser = async () => {
    try {
      const token = await getAccessTokenSilently();
      axios.post(
        `${url}/api/v1/user`,
        {
          userId: user.sub,
          username: user.nickname,
          fullName: user.name,
          email: user.email,
          profilePic: user.picture,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  // get user
  const getUser = async () => {
    const url = process.env.REACT_APP_SERVER_URL;
    try {
      await axios.get(`${url}/api/v1/user?id=${user.sub}`).then((response) => {
        dispacth(setUser(response.data));
        setProfilePicutre(response.data.profilePic);
        setFullName(response.data.fullName);

        if (response.data.isDarkMode) {
          dispacth(flipMode(true));
          console.log('darkmode');
        }
        if (!response.data.isDarkMode) {
          dispacth(flipMode(false));
          console.log('lightmode');
        }
      });
      setLoadUser(false);
    } catch (err) {
      console.log(err);
    }
  };

  // authenticate

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      handleRedirectCallback()
        .then((res) => {
          console.log('logd in successfully');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
  useEffect(() => {
    if (isAuthenticated && user) {
      postUser()
        .then((res) => {
          getUser();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  useEffect(() => {
    getUser();
  }, [isPageUpdate]);

  return (
    <div className="user-profile">
      {fullUser ? (
        <>
          {user ? (
            <div className="loged-user">
              <img src={profilePic} alt="img" referrerPolicy="no-referrer" />
              {fullName}
            </div>
          ) : (
            <div>
              <span>
                <BsPersonFill />
              </span>
              <Login />
            </div>
          )}{' '}
        </>
      ) : (
        'loading...'
      )}
    </div>
  );
};

export default User;
