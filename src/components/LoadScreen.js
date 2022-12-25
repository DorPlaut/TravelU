import React from 'react';
import BarLoader from 'react-spinners/BarLoader';
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';

function LoadScreen() {
  let color = document.documentElement.style.getPropertyValue('--primaryColor');

  return (
    <div className="load-screen">
      <div className="load-container">
        <h1>loading</h1>
        <BarLoader color={color} width="30rem" height="1rem" />
        <div className="load-screen-massage">
          <p>
            This project is currently hosted on a free server. <br /> First time
            Load may take a minute or two.
          </p>
          <div className="thanks">
            <p>Thank you for your patients.</p>
            <ClimbingBoxLoader size={25} color={color} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoadScreen;
