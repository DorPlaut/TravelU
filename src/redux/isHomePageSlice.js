import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: true,
};

export const isHomePageSlice = createSlice({
  name: 'isHomePage',
  initialState,
  reducers: {
    turnHome: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { turnHome } = isHomePageSlice.actions;

export default isHomePageSlice.reducer;
