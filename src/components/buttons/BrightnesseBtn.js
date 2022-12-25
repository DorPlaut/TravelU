import React, { useEffect } from 'react';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { updatePage } from '../../redux/updateSlice';
import { flipMode } from '../../redux/darkmodeSlice';
// Npm papackages
import { BsFillSunFill, BsFillMoonStarsFill } from 'react-icons/bs';
import axios from 'axios';
// auth0
import { useAuth0 } from '@auth0/auth0-react';

function BrightnesseBtn() {
  // auth0
  const { user, getAccessTokenSilently } = useAuth0();
  // redux
  const darkMode = useSelector((state) => state.isDarkMode.value);
  const fullUser = useSelector((state) => state.fullUser.value);
  const dispacth = useDispatch();
  // set user prefernece
  const url = process.env.REACT_APP_SERVER_URL;

  const changeViewMode = async () => {
    if (user) {
      try {
        const token = await getAccessTokenSilently();
        await axios
          .put(
            `${url}/api/v1/user/darkMode`,
            {
              userId: user.sub,
              isDarkMode: !darkMode,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          .then((response) => {
            dispacth(updatePage());
          });
      } catch (err) {
        console.log(err);
      }
    }
    if (!user) {
      dispacth(flipMode(!darkMode));
      dispacth(updatePage());
    }
  };
  const setColorScheme = () => {
    if (darkMode) {
      document.documentElement.style.setProperty('--primaryColor', '#d6f8ff');
      document.documentElement.style.setProperty('--seconderyColor', '#d6f8ff');
      document.documentElement.style.setProperty(
        '--primaryColorBright',
        '#3f4e52'
      );
      document.documentElement.style.setProperty(
        '--backGroundColor',
        '#111c1f'
      );
      document.documentElement.style.setProperty(
        '--shadowColor',
        'rgba(0, 0, 0, 0.7)'
      );
      document.documentElement.style.setProperty(
        '--shadowColorNegative',
        'rgba(255, 255, 255, 0.2)'
      );
      document.documentElement.style.setProperty(
        '--containerBackground',
        '#333f42'
      );
    }
    if (!darkMode) {
      document.documentElement.style.setProperty('--primaryColor', '#124d06');
      document.documentElement.style.setProperty('--seconderyColor', '#e5f5e6');
      document.documentElement.style.setProperty(
        '--primaryColorBright',
        '#f1fff1'
      );
      document.documentElement.style.setProperty(
        '--backGroundColor',
        '#d8e2d7'
      );
      document.documentElement.style.setProperty(
        '--shadowColor',
        'rgba(255, 255, 255, 0.7)'
      );
      document.documentElement.style.setProperty(
        '--shadowColorNegative',
        'rgba(0, 0, 0, 0.2)'
      );
      document.documentElement.style.setProperty(
        '--containerBackground',
        '#e5f5e6'
      );
    }
  };

  //

  useEffect(() => {
    setColorScheme();
  }, [darkMode]);
  return (
    <div className="light-dark-mode-btn-container">
      <button
        className="icon-btn"
        onClick={() => {
          changeViewMode();
        }}
      >
        {darkMode ? <BsFillMoonStarsFill /> : <BsFillSunFill />}
      </button>
    </div>
  );
}

export default BrightnesseBtn;
