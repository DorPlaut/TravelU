import { createSlice } from '@reduxjs/toolkit';

// get user info

const initialState = {
  value: [],
};

export const postsSlice = createSlice({
  name: 'allPosts',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPosts } = postsSlice.actions;

export default postsSlice.reducer;
