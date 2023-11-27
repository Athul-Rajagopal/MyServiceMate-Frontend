// actions/workers.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchWorkers = createAsyncThunk(
    'workers/fetchWorkers',
    async (payload, thunkAPI) => {
      try {
        // You can use the payload directly for the POST request
        const response = await axios.post('https://myservicemate.online/api/worker-list/', payload);
        console.log(response.data);
        return response.data;
      } catch (error) {
        // Use rejectWithValue to include the error message in the action payload
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );
