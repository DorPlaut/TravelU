import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: false,
};

export const isUserMenuOpenSlice = createSlice({
  name: 'isUserMenuOpen',
  initialState,
  reducers: {
    openMenu: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { openMenu } = isUserMenuOpenSlice.actions;

export default isUserMenuOpenSlice.reducer;
