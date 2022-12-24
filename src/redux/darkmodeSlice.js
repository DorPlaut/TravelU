import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: false,
};

export const darkmodeSlice = createSlice({
  name: 'isDarkMode',
  initialState,
  reducers: {
    flipMode: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { flipMode } = darkmodeSlice.actions;

export default darkmodeSlice.reducer;
