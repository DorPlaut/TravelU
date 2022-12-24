import React, { useState, useEffect } from 'react';
// Npm packages
import axios from 'axios';

function Comment({ post, comment }) {
  // local states
  const [username, setUsername] = useState(post.username);
  const [profilePic, setProfilePic] = useState(post.profilePic);
  // GET user
  const getUser = async () => {
    const url = process.env.REACT_APP_SERVER_URL;
    try {
      await axios
        .get(`${url}/api/v1/user?id=${post.userId}`)
        .then((response) => {
          setProfilePic(response.data.profilePic);
          setUsername(response.data.username);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="comment">
      <img
        src={profilePic}
        alt="user name"
        className="profile-pic"
        referrerPolicy="no-referrer"
      />
      <div className="comment-content">
        <span>{username}</span>
        <br />
        <p>{comment}</p>
      </div>
    </div>
  );
}

export default Comment;
