// actions/workers.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchWorkers = createAsyncThunk(
    'workers/fetchWorkers',
    async (payload, thunkAPI) => {
      try {
        // You can use the payload directly for the POST request
        const response = await axios.post('http://127.0.0.1:8000/api/worker-list/', payload);
        return response.data;
      } catch (error) {
        // Use rejectWithValue to include the error message in the action payload
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );
