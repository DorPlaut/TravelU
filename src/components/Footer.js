import React from 'react';
import { Parallax } from 'react-scroll-parallax';
import { useSelector } from 'react-redux';

function Footer() {
  const isDarkMode = useSelector((state) => state.isDarkMode.value);
  return (
    <div className="footer-container">
      <div className="footer">
        <div className="page-underline"></div>
        <span>
          Build by{' '}
          <a href="https://dorplaut.netlify.app/" target="_blank">
            Dor Plaut.
          </a>{' '}
          2022. All rigts reserved &copy;
        </span>{' '}
        <a className="btn" href="https://dorplaut.netlify.app/" target="_blank">
          Click here to see more projects by me
        </a>
      </div>
      <div className="trees trees-footer">
        <Parallax speed={-5}>
          <img
            src="./trees2.png"
            alt=""
            className={isDarkMode ? 'threes-dark image' : 'image'}
          />
        </Parallax>
      </div>
    </div>
  );
}

export default Footer;
