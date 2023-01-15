import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: false,
};

export const isLoadingSlice = createSlice({
  name: 'isLoadinServer',
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setIsLoading } = isLoadingSlice.actions;

export default isLoadingSlice.reducer;
