// rootReducer.js

import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../redux/AuthSlice'; // Import your authentication slice and other slices here
import WorkerReducer from '../redux/WorkerSlice';
import BookingReducer from './BookingReducer';

const rootReducer = combineReducers({
  auth: authReducer, // Add other slices here
  workers: WorkerReducer,
  booking: BookingReducer,
});

export default rootReducer;
