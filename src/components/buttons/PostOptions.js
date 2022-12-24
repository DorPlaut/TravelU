import React from 'react';
import { BsThreeDots } from 'react-icons/bs';

function PostOptions({ setIsMenuOpen, isMenuOpen }) {
  return (
    <button
      className="icon-btn post-options-btn"
      onClick={() => {
        setIsMenuOpen(!isMenuOpen);
      }}
    >
      <BsThreeDots />
    </button>
  );
}

export default PostOptions;
