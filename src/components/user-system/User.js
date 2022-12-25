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
import { setIsLoading } from '../../redux/isLoadingSlice';

const User = () => {
  // redux
  const dispacth = useDispatch();
  const isLoadingServer = useSelector((state) => state.isLoadingServer.value);
  // const fullUser = useSelector((state) => state.fullUser.value);
  const isPageUpdate = useSelector((state) => state.isPageUpdate.value);
  const fullUser = useSelector((state) => state.fullUser.value);
  // local states
  const [loadUser, setLoadUser] = useState(true);
  const [profilePic, setProfilePicutre] = useState('');
  const [fullName, setFullName] = useState('');

  // auth0
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

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

    dispacth(setIsLoading(true));

    if (user) {
      try {
        await axios
          .get(`${url}/api/v1/user?id=${user.sub}`)
          .then((response) => {
            dispacth(setUser(response.data));
            setProfilePicutre(response.data.profilePic);
            setFullName(response.data.fullName);

            if (response.data.isDarkMode) {
              dispacth(flipMode(true));
            }
            if (!response.data.isDarkMode) {
              dispacth(flipMode(false));
            }
          });
        dispacth(setIsLoading(false));
      } catch (err) {
        console.log(err);
      }
    }
  };

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
    <>
      <div className="user-profile">
        {fullUser ? (
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
      </div>
    </>
  );
};

export default User;
