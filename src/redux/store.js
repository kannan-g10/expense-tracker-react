import { configureStore } from '@reduxjs/toolkit';
import authSlice from './features/authSlice';
import expenseSlice from './features/expenseSlice';

export default configureStore({
  reducer: {
    authSlice,
    expenseSlice,
  },
});
