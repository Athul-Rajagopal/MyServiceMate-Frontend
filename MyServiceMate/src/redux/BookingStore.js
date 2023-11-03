// In your store configuration file (e.g., store.js):
import { configureStore } from '@reduxjs/toolkit';
import bookingReducer from './BookingReducer';


const store = configureStore({
  reducer: {
    booking: bookingReducer,
  },
  
});

export default store;