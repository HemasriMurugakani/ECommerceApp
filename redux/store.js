import { configureStore } from '@reduxjs/toolkit';
import catalogReducer from './catalogSlice';

const store = configureStore({
  reducer: {
    catalog: catalogReducer,
  },
});

export default store;
