import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: false,
};

export const updateSlice = createSlice({
  name: 'isPageUpdate',
  initialState,
  reducers: {
    updatePage: (state) => {
      state.value = !state.value;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updatePage } = updateSlice.actions;

export default updateSlice.reducer;
