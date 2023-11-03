// workersSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchWorkers } from '../redux/WorkerActions'; // Define this action as explained earlier

const initialState = {
  workers: [],
  loading: false,
  error: null,
};

const workersSlice = createSlice({
  name: 'workers',
  initialState,
  reducers: {
    // Define any worker-related actions here
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWorkers.fulfilled, (state, action) => {
        state.loading = false;
        state.workers = action.payload;
      })
      .addCase(fetchWorkers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { /* Any additional worker-related actions */ } = workersSlice.actions;
export default workersSlice.reducer;
