import React, { useState } from 'react';
// Components
import UploadImg from './UploadImg';
// Napm packages
import {
  FaMapMarkedAlt,
  FaCloudSun,
  FaHiking,
  FaDollarSign,
  FaCampground,
  FaCarSide,
} from 'react-icons/fa';
import { BsImageAlt } from 'react-icons/bs';
import Autocomplete from 'react-google-autocomplete';
import InputEmoji from 'react-input-emoji';
import axios from 'axios';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { setIswritePost } from '../../redux/writePostSlice';
import { updatePage } from '../../redux/updateSlice';
// auth0
import { useAuth0 } from '@auth0/auth0-react';

function WritePost() {
  // auth0
  const { getAccessTokenSilently } = useAuth0();

  const dispacth = useDispatch();
  // local states
  // form details
  const [locationName, setLocationName] = useState('Location Name..');
  const [environmentType, setEnvironmentType] = useState('Environment Type..');
  const [accessByCar, setAccessByCar] = useState('Access By Car..');
  const [hikingTrails, setHikingTrails] = useState('Hiking Trails..');
  const [sleepingOptions, setSleepingOptions] = useState('Sleeping Options..');
  const [entryFee, setEntryFee] = useState('Entry Fee..');
  const [mapLocation, setMapLocation] = useState('');
  const [postContent, setPostContent] = useState('');
  // Photos
  const [photos, setPhotos] = useState([]);
  // alerts
  const [isAlert, setIsAlert] = useState(false);
  const [alert, setAlert] = useState('alert alert-success');

  // redux
  // user info
  const fullUser = useSelector((state) => state.fullUser.value);
  const { userId, username, profilePic } = fullUser;

  // Post To Server
  const url = process.env.REACT_APP_SERVER_URL;
  const postNewPost = async (publish) => {
    try {
      const token = await getAccessTokenSilently();
      axios.post(
        `${url}/api/v1/post`,
        {
          userId: userId,
          username: username,
          profilePic: profilePic,
          locationName: locationName,
          locationType: environmentType,
          carAccess: accessByCar,
          hikes: hikingTrails,
          camping: sleepingOptions,
          price: entryFee,
          mapLocation: mapLocation,
          postContent: postContent,
          photos: photos,
          publish: publish,
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

  // handle post Post
  const handlePostPost = (event) => {
    if (postContent.length < 1) {
      event.preventDefault();
      showAlert('alert alert-danger');
    }
    if (postContent.length >= 1) {
      showAlert('alert alert-success');

      postNewPost(true);
      dispacth(updatePage());
    }
  };

  // handel alerts
  const showAlert = (alertClass) => {
    setAlert(alertClass);
    setIsAlert(true);
    setTimeout(() => {
      setIsAlert(false);
    }, 2000);
  };

  return (
    <div className="write-post-container post">
      <div className="post-form-container container">
        <form
          action=""
          className="post-form"
          onSubmit={(event) => {
            handlePostPost(event);
          }}
        >
          <div className="post-details-container">
            <div className="post-details">
              <img
                src={profilePic}
                alt="user name"
                className="profile-pic"
                referrerPolicy="no-referrer"
              />
              <div>
                <p>{username}</p>
                <span>Right now</span>
              </div>
            </div>
            <div className="write-post-btn-container">
              <button
                className="btn"
                onClick={() => {
                  dispacth(setIswritePost(false));
                }}
              >
                Discard and Exit
              </button>
            </div>
          </div>
          <div className="post-location">
            <span className="single-input">
              <BsImageAlt /> :{' '}
              <input
                maxLength="30"
                type="text"
                name="location-name"
                placeholder={locationName}
                onChange={(event) => {
                  setLocationName(event.target.value);
                }}
                required
              ></input>
            </span>
            <span className="single-input">
              <FaCloudSun /> :{' '}
              <input
                maxLength="30"
                type="text"
                name="environment-type"
                placeholder={environmentType}
                onChange={(event) => {
                  setEnvironmentType(event.target.value);
                }}
                required
              ></input>
            </span>
            <span className="single-input">
              <FaCarSide /> :{' '}
              <input
                maxLength="30"
                type="text"
                name="access-by-car"
                placeholder={accessByCar}
                onChange={(event) => {
                  setAccessByCar(event.target.value);
                }}
                required
              ></input>
            </span>
            <span className="single-input">
              <FaHiking /> :{' '}
              <input
                maxLength="30"
                type="text"
                name="hiking-trails"
                placeholder={hikingTrails}
                onChange={(event) => {
                  setHikingTrails(event.target.value);
                }}
                required
              ></input>
            </span>
            <span className="single-input">
              <FaCampground /> :{' '}
              <input
                maxLength="30"
                type="text"
                name="sleeping-options"
                placeholder={sleepingOptions}
                onChange={(event) => {
                  setSleepingOptions(event.target.value);
                }}
                required
              ></input>
            </span>
            <span className="single-input">
              <FaDollarSign /> :{' '}
              <input
                maxLength="30"
                type="text"
                name="entry-fee"
                placeholder={entryFee}
                onChange={(event) => {
                  setEntryFee(event.target.value);
                }}
                required
              ></input>
            </span>
            <div></div>
            <span className="single-input">
              <FaMapMarkedAlt /> :{' '}
              <Autocomplete
                apiKey={process.env.REACT_APP_GOOGLE_KEY}
                onPlaceSelected={(place) => {
                  setMapLocation({
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                  });
                }}
                placeholder="Locate on the Map"
              />
            </span>
          </div>

          <div className="post-content">
            <InputEmoji
              value={postContent}
              onChange={(event) => {
                setPostContent(event);
              }}
              name="post-content"
              placeholder="Please tell us about your advanture..."
            />
            <br />

            <UploadImg
              photos={photos}
              setPhotos={setPhotos}
              text="Upload Pic"
            />
            {photos.length > 0
              ? photos.map((i) => {
                  return <img src={i} key={i}></img>;
                })
              : ''}
          </div>

          <div className="post-btn-container">
            {photos.length > 0 ? (
              <button className="btn" type="submit">
                Post
              </button>
            ) : (
              ''
            )}
          </div>
          {isAlert ? (
            <>
              <div className={alert}>
                {alert == 'alert alert-danger' ? (
                  <span>Post cannot be empty</span>
                ) : (
                  <span>Post sent successfully</span>
                )}
              </div>
            </>
          ) : (
            ''
          )}
        </form>
      </div>
    </div>
  );
}

export default WritePost;
