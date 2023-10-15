
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  userId: null,
  email: '',
  username: '',
  is_super: false,
  is_worker: false,
  is_active: false,
  is_user: false,
  is_approved:false,
  accessToken: null, 
  refreshToken: null,
  is_profile_created:false,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      // Update the state with all fields, including tokens
      state.isAuthenticated = true;
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.is_super = action.payload.is_super;
      state.is_worker = action.payload.is_worker;
      state.is_active = action.payload.is_active;
      state.accessToken = action.payload.accessToken; // Set the accessToken
      state.refreshToken = action.payload.refreshToken; // Set the refreshToken
      state.is_user = action.payload.is_user;
      state.is_approved = action.payload.is_approved;
      state.is_profile_created = action.payload.is_profile_created;
    },
    logout: (state) => {
      // Reset all fields including tokens when logging out
      state.isAuthenticated = false;
      state.userId = null;
      state.email = '';
      state.username = '';
      state.is_super = false;
      state.is_worker = false;
      state.is_active = false;
      state.accessToken = null;
      state.refreshToken = null;
      state.is_user = false;
      state.is_approved = false;
      state.is_profile_created = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export const selectUserData = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    userId: state.auth.userId,
    name: state.auth.name,
    email: state.auth.email,
    username: state.auth.username,
    is_super: state.auth.is_super,
    is_worker: state.auth.is_worker,
    is_active: state.auth.is_active,
    accessToken: state.auth.accessToken,
    refreshToken: state.auth.refreshToken,
    is_user: state.auth.is_user,
    is_approved: state.auth.is_approved,
    is_profile_created:state.auth.is_profile_created
  };
};
export default authSlice.reducer;
