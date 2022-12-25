import { configureStore } from '@reduxjs/toolkit';
import darkmodeReducer from './darkmodeSlice';
import isHomePageReducer from './isHomePageSlice';
import isWritePost from './writePostSlice';
import isMobile from './isMobile';
import isUserMenuOpen from './isUserMenuOpenSlice';
import isUserProfile from './userProfileSlice';
import fullUser from './userSlice';
import allPosts from './postsSlice';
import isPageUpdate from './updateSlice';
import isLoadingServer from './isLoadingSlice';

export const store = configureStore({
  reducer: {
    isDarkMode: darkmodeReducer,
    isHomePage: isHomePageReducer,
    isWritePost: isWritePost,
    isMobile: isMobile,
    isUserMenuOpen: isUserMenuOpen,
    isUserProfile: isUserProfile,
    fullUser: fullUser,
    allPosts: allPosts,
    isPageUpdate: isPageUpdate,
    isLoadingServer: isLoadingServer,
  },
});
