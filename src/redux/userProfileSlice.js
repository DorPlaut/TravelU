import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: false,
};

export const userProfileSlice = createSlice({
  name: 'isUserProfile',
  initialState,
  reducers: {
    openProfile: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { openProfile } = userProfileSlice.actions;

export default userProfileSlice.reducer;
