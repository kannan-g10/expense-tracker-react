import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'authUser',
  initialState: {
    name: '',
    imageUrl: '',
  },
  reducers: {
    addUser: (state, action) => {
      state.name = action.payload.name;
      state.imageUrl = action.payload.imageUrl || '';
    },
  },
});

export const { addUser } = authSlice.actions;
export default authSlice.reducer;
