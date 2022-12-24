import React, { useState, useEffect } from 'react';
// Components
import Login from './Login';
import Post from '../post/Post';
import UploadImg from './UploadImg';
// auth0
import { useAuth0 } from '@auth0/auth0-react';
// Npm packages
import axios from 'axios';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { openProfile } from '../../redux/userProfileSlice';
import { setUser } from '../../redux/userSlice';
import { updatePage } from '../../redux/updateSlice';

const FullProfile = () => {
  // redux
  const dispacth = useDispatch();
  const fullUser = useSelector((state) => state.fullUser.value);
  const { userId, email, posts } = fullUser;
  const allPosts = useSelector((state) => state.allPosts.value);
  const userPosts = allPosts.filter((i) => i.userId == userId);
  // local states
  const [isEdit, setIsEdit] = useState(false);
  const [username, setUsername] = useState(fullUser.username);
  const [fullName, setFullName] = useState(fullUser.fullName);
  const [profilePic, setProfilePic] = useState(fullUser.profilePic);
  const [isAlert, setIsAlert] = useState(false);
  // auth0
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();
  // update profile
  const url = process.env.REACT_APP_SERVER_URL;
  const updateProfile = async () => {
    console.log('Update');
    try {
      const token = await getAccessTokenSilently();
      await axios
        .put(
          `${url}/api/v1/user`,
          {
            userId: userId,
            username: username,
            fullName: fullName,
            profilePic: profilePic,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          dispacth(setUser(response.data));
          dispacth(updatePage());
          showAlert();
        });
    } catch (err) {
      console.log(err);
    }
  };
  // handel alerts
  const showAlert = () => {
    setIsAlert(true);
    setTimeout(() => {
      setIsAlert(false);
    }, 2000);
  };

  return (
    <>
      <div className="user-profile">
        <div className="profile-btn-container">
          <button
            className="btn"
            onClick={() => {
              dispacth(openProfile(false));
            }}
          >
            Back To Main Page
          </button>
        </div>
        <h1>Your Profile</h1>
        <div className="container ">
          <div className="full-profile-container">
            <div className="profile-details">
              <div className="username">
                <h3>
                  {isEdit ? (
                    <input
                      type="text"
                      name="username"
                      placeholder={username}
                      onChange={(event) => {
                        setUsername(event.target.value);
                      }}
                    />
                  ) : (
                    username
                  )}
                </h3>

                <button className="btn" onClick={() => setIsEdit(!isEdit)}>
                  Edit
                </button>
              </div>
              <h4>
                Full name:{' '}
                {isEdit ? (
                  <input
                    type="text"
                    name=""
                    placeholder={fullName}
                    onChange={(event) => {
                      setFullName(event.target.value);
                    }}
                  />
                ) : (
                  fullName
                )}
              </h4>
              <h4>Email: {email}</h4>
              <h5>Total posts: {userPosts.length}</h5>
            </div>
            <div className="profile-pic-container">
              <img
                className="profile-pic"
                src={profilePic}
                alt="Profile-pic"
                referrerPolicy="no-referrer"
              />
              <UploadImg
                photos={profilePic}
                setPhotos={setProfilePic}
                text="change"
              />
            </div>
          </div>

          <button className="btn save-btn" onClick={() => updateProfile()}>
            save changes
          </button>
          {isAlert ? (
            <div className="alert alert-success">
              <span>Profile updated successfully</span>
            </div>
          ) : (
            ''
          )}
        </div>

        <h2>Your Posts:</h2>
        <div className="posts-container">
          {userPosts.map((i) => {
            return <Post key={i._id} post={i} />;
          })}
        </div>
      </div>
    </>
  );
};

export default FullProfile;
