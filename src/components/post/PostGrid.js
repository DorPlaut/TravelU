import React, { useEffect } from 'react';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { setPosts } from '../../redux/postsSlice';
// Npm packages
import axios from 'axios';
// Components
import Post from './Post';
import FullProfile from '../user-system/FullProfile';
import SortPostsMenu from './SortPostsMenu';
import LoadScreen from '../LoadScreen';

function PostGrid() {
  // redux
  const isLoadingServer = useSelector((state) => state.isLoadingServer.value);
  const isUserProfile = useSelector((state) => state.isUserProfile.value);
  const allPosts = useSelector((state) => state.allPosts.value);
  const isPageUpdate = useSelector((state) => state.isPageUpdate.value);
  const dispacth = useDispatch();
  // get posts
  const getPosts = async () => {
    const url = process.env.REACT_APP_SERVER_URL;
    try {
      await axios.get(`${url}/api/v1/post`).then((response) => {
        dispacth(setPosts(response.data));
      });
    } catch (err) {
      console.log(err);
    }
  };
  // update posts list
  useEffect(() => {
    getPosts();
  }, [isPageUpdate]);

  return (
    <>
      {isLoadingServer ? <LoadScreen /> : ''}
      {isUserProfile ? (
        <FullProfile />
      ) : (
        <div className="main-page-grid">
          <div className="posts-container">
            <div className="container">
              <SortPostsMenu />
            </div>
          </div>
          <div className="posts-container">
            {allPosts.map((i, index) => {
              return <Post key={index} post={i} />;
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default PostGrid;
