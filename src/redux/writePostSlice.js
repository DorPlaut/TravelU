import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: false,
};

export const writePostSlice = createSlice({
  name: 'isWritePost',
  initialState,
  reducers: {
    setIswritePost: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setIswritePost } = writePostSlice.actions;

export default writePostSlice.reducer;
