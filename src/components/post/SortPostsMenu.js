import React, { useState } from 'react';
// Npm packages
import axios from 'axios';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { setPosts } from '../../redux/postsSlice';

function SortPostsMenu() {
  // redux
  const dispacth = useDispatch();
  const allPosts = useSelector((state) => state.allPosts.value);
  const fullUser = useSelector((state) => state.fullUser.value);
  const { userId } = fullUser;
  //   local states
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedSort, setSelectedSort] = useState('new');
  //   handle clicks
  const handelSelectFilter = (filter) => {
    setSelectedFilter(filter);
  };
  const handelSelectSort = (Sort) => {
    setSelectedSort(Sort);
  };
  //   GET ALL POST FFROM SERVER
  const url = process.env.REACT_APP_SERVER_URL;
  const getPosts = async (funk) => {
    try {
      await axios.get(`${url}/api/v1/post`).then((response) => {
        funk(response.data);
      });
    } catch (err) {
      console.log(err);
    }
  };
  //   FILTER POSTS
  // all
  const filterAll = (res) => {
    dispacth(setPosts(res));
  };
  // my posts
  const filterMyPosts = (res) => {
    dispacth(setPosts(res.filter((i) => i.userId == userId)));
  };
  // liked posts
  const filterLikedPosts = (res) => {
    const fillterdArr = [];
    res.map((i) => {
      i.likes.filter((f) => {
        if (f.userId == userId) {
          fillterdArr.push(i);
        }
      });
    });
    dispacth(setPosts(fillterdArr));
  };
  //   SORT POSTS
  // new
  const sortNewest = () => {
    let sortedPosts = [];
    allPosts.map((i) => {
      sortedPosts.push(i);
    });
    sortedPosts.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB - dateA;
    });
    dispacth(setPosts(sortedPosts));
  };
  // old
  const sortOldest = () => {
    let sortedPosts = [];
    allPosts.map((i) => {
      sortedPosts.push(i);
    });
    sortedPosts.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateA - dateB;
    });
    dispacth(setPosts(sortedPosts));
  };
  // liked
  const sortMoseLiked = () => {
    let sortedPosts = [];
    allPosts.map((i) => {
      sortedPosts.push(i);
    });
    sortedPosts.sort((a, b) => {
      const aLength = a.likes.length;
      const bLength = b.likes.length;
      return bLength - aLength;
    });
    dispacth(setPosts(sortedPosts));
  };

  return (
    <div className="sort-posts-menu-container">
      <span>Filter By:</span>
      <ul className="filter-posts-menu">
        <li>
          <button
            onClick={() => {
              handelSelectFilter('all');
              getPosts(filterAll);
            }}
            className={selectedFilter == 'all' ? 'btn selected' : 'btn'}
          >
            All Posts
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              handelSelectFilter('liked');
              getPosts(filterLikedPosts);
            }}
            className={selectedFilter == 'liked' ? 'btn selected' : 'btn'}
          >
            Liked Posts
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              handelSelectFilter('my');
              getPosts(filterMyPosts);
            }}
            className={selectedFilter == 'my' ? 'btn selected' : 'btn'}
          >
            My Posts
          </button>
        </li>
      </ul>
      <ul className="sort-posts-menu">
        <span>sort by:</span>
        <li>
          <button
            onClick={() => {
              handelSelectSort('new');
              sortNewest();
            }}
            className={selectedSort == 'new' ? 'link link-selected' : 'link'}
          >
            Newest
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              handelSelectSort('old');
              sortOldest();
            }}
            className={selectedSort == 'old' ? 'link link-selected' : 'link'}
          >
            Oldest
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              handelSelectSort('liked');
              sortMoseLiked();
            }}
            className={selectedSort == 'liked' ? 'link link-selected' : 'link'}
          >
            Most Liked
          </button>
        </li>
      </ul>
    </div>
  );
}

export default SortPostsMenu;
