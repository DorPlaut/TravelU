import { createSlice } from '@reduxjs/toolkit';

// get user info

const initialState = {
  value: '',
};

export const userSlice = createSlice({
  name: 'fullUser',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions;

export default userSlice.reducer;
