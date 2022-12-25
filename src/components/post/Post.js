import React, { useEffect, useState } from 'react';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { updatePage } from '../../redux/updateSlice';
// Npm packages
import axios from 'axios';
import {
  FaCloudSun,
  FaHiking,
  FaDollarSign,
  FaCampground,
  FaCarSide,
  FaRegArrowAltCircleRight,
} from 'react-icons/fa';
import { BsImageAlt } from 'react-icons/bs';
import InputEmoji from 'react-input-emoji';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
// Components
import Comment from './Comment';
import Map from './map/Map';
import PhotoGallery from './PhotoGallery';
// auth0
import { useAuth0 } from '@auth0/auth0-react';

function Post({ post }) {
  // redux
  const dispacth = useDispatch();
  const currentUser = useSelector((state) => state.fullUser.value);
  const isPageUpdate = useSelector((state) => state.isPageUpdate.value);
  // local states
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [username, setUsername] = useState(post.username);
  const [profilePic, setProfilePic] = useState(post.profilePic);
  // alerts
  const [isAlert, setIsAlert] = useState(false);
  const [alert, setAlert] = useState('alert alert-success');
  // likes
  const [isliked, setIsliked] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  // comments
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [comment, setComment] = useState('Write comment here...');
  const [comments, setComments] = useState(post.comments);

  // auth0
  const { user, getAccessTokenSilently } = useAuth0();
  // get post details
  const { _id, userId, locationDetails, postContent, photos, createdAt } = post;
  // foramting date
  const rawDate = new Date(createdAt);
  let day = rawDate.getDate();
  let month = rawDate.getMonth();
  let year = rawDate.getFullYear();
  let hours = rawDate.getHours();
  let minuts = rawDate.getMinutes();
  if (hours < 10) {
    hours = '0' + hours;
  }
  if (minuts < 10) {
    minuts = '0' + hours;
  }
  const postedAt = `${day}/${month}/${year} at ${hours}:${minuts}`;

  // GET USER
  const getUser = async () => {
    const url = process.env.REACT_APP_SERVER_URL;
    try {
      await axios.get(`${url}/api/v1/user?id=${userId}`).then((response) => {
        setProfilePic(response.data.profilePic);
        setUsername(response.data.username);
      });
    } catch (err) {
      console.log(err);
    }
  };

  // EDIT POST
  const url = process.env.REACT_APP_SERVER_URL;

  const addLike = async (like) => {
    console.log('Send Like');
    try {
      const token = await getAccessTokenSilently();
      await axios
        .put(
          `${url}/api/v1/post`,
          {
            username: currentUser.username,
            userId: user.sub,
            _id: _id,
            liked: like,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          setLikes(response.data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  // handle submit comment
  const handleSubmitComment = (event) => {
    event.preventDefault();
    if (comment.length < 1) {
      showAlert('alert alert-danger');
    }
    if (comment.length >= 1) {
      showAlert('alert alert-success');

      addComment();
    }
  };
  // POST comment
  const addComment = async () => {
    console.log('Add Comment');
    try {
      const token = await getAccessTokenSilently();
      await axios
        .put(
          `${url}/api/v1/post/comment`,
          {
            username: currentUser.username,
            userId: user.sub,
            _id: _id,
            profilePic: currentUser.profilePic,
            comment: comment,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          setComments(response.data);
          setComment('');
        });
    } catch (err) {
      console.log(err);
    }
  };

  // update like
  useEffect(() => {
    dispacth(updatePage());
  }, [isliked]);

  useEffect(() => {
    likes.map((i) => {
      if (i.userId == user.sub) {
        setIsliked(true);
        getUser();
      }
    });
  }, []);

  useEffect(() => {
    getUser();
  }, [isPageUpdate]);

  // handel alerts
  const showAlert = (alertClass) => {
    setAlert(alertClass);
    setIsAlert(true);
    setTimeout(() => {
      setIsAlert(false);
    }, 2000);
  };

  return (
    <div className="container">
      <article className="post">
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
              <span>{postedAt}</span>
            </div>
          </div>
          {/* unfinishd feature */}
          {/* <PostOptions setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />
          {isMenuOpen ? <PostMenu /> : ''} */}
        </div>
        <div className="post-location">
          <span>
            <BsImageAlt /> : {locationDetails.locationName}
          </span>
          <span>
            <FaCloudSun /> : {locationDetails.locationType}
          </span>
          <span>
            <FaCarSide /> : {locationDetails.carAccess}
          </span>
          <span>
            <FaHiking /> :{locationDetails.hikes}
          </span>
          <span>
            <FaCampground /> : {locationDetails.camping}
          </span>
          <span>
            <FaDollarSign /> :{locationDetails.price}
          </span>
        </div>
        <Map
          mapLocayion={locationDetails.mapLocation}
          locationName={locationDetails.locationName}
        />
        <br />
        <div className="post-content">
          <p>{postContent}</p>
          <PhotoGallery
            photos={photos}
            showThumbnails={photos.length > 1 ? true : false}
          />
        </div>
        <div className="comments-container">
          <div className="comments-header">
            <span
              className="curser-pointer"
              onClick={() => {
                setIsliked(!isliked);
                addLike(!isliked);
              }}
            >
              {likes.length} {isliked ? <AiFillLike /> : <AiOutlineLike />}
            </span>

            <span
              className="curser-pointer"
              onClick={() => {
                setIsCommentsOpen(!isCommentsOpen);
              }}
            >
              {comments.length} comments
            </span>
          </div>
          {isCommentsOpen ? (
            <>
              {comments.map((i) => {
                return (
                  <Comment
                    key={i._id}
                    post={i}
                    profilePic={i.profilePic}
                    comment={i.comment}
                  />
                );
              })}
              <form
                className="comment-form"
                action=""
                onSubmit={(event) => handleSubmitComment(event)}
              >
                <InputEmoji
                  className="write-comment comment"
                  value={comment}
                  onChange={(event) => {
                    console.log(event);
                    setComment(event);
                  }}
                  // cleanOnEnter
                  // onEnter={(event) => handleSubmitComment(event)}
                  placeholder={comment}
                />
                <button className="" type="submit">
                  <FaRegArrowAltCircleRight />
                </button>
              </form>
            </>
          ) : (
            ''
          )}
        </div>
        <div className="post-btn-container">
          <button
            className={isliked ? 'btn selected' : 'btn'}
            onClick={() => {
              setIsliked(!isliked);
              addLike(!isliked);
            }}
          >
            {isliked ? 'Liked' : 'Like'}
          </button>
          <button
            className={isCommentsOpen ? 'btn selected' : 'btn'}
            onClick={() => {
              setIsCommentsOpen(!isCommentsOpen);
            }}
          >
            {isCommentsOpen ? 'Hide comments' : 'Show Comments'}
          </button>
        </div>
        {isAlert ? (
          <>
            <div className={alert}>
              {alert == 'alert alert-danger' ? (
                <span>Comment cannot be empty</span>
              ) : (
                <span>Comment sent successfully</span>
              )}
            </div>
          </>
        ) : (
          ''
        )}
      </article>
    </div>
  );
}

export default Post;
