import axios from 'axios';
import { store } from "../redux/Store"; // Import your Redux store and action
import {login,logout} from '../redux/AuthSlice'



let isRefreshing = false;
let refreshQueue = [];


const AxiosInstance = () => {
  const accessToken = store.getState().auth.accessToken;
  const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api', // Replace with your base URL
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  });

  

  axiosInstance.interceptors.response.use(
    async (response) => {
      console.log("interceptor no error::",response)
      return response;
    },
    async (error) => {
      if (error.response && error.response.status === 401) {
        const originalConfig = error.config;

        console.log("intercepter error 401 inside")
        console.log("Access token expired")
        console.log(originalConfig)

        if (!isRefreshing) {
          isRefreshing = true;
          const refresh_token = store.getState().auth.refreshToken;

          try {
            const response = await axios.post(
              'http://127.0.0.1:8000/api/token/refresh/',
              {
                refresh: refresh_token,
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                },
                withCredentials: true,
              }
            );

            if (response.status === 200) {
              const newAccessToken = response.data['access'];
              const newRefreshToken = response.data['refresh'];
              const is_super = store.getState().auth.is_super;
              const is_worker = store.getState().auth.is_worker;
              const is_active = store.getState().auth.is_active;
              const email = store.getState().auth.email;
              const username = store.getState().auth.username;
              const userId = store.getState().auth.userId;
              const name = store.getState().auth.name;
              const is_user = store.getState().auth.is_user;
              const is_approved = store.getState().auth.is_approved;
              const is_profile_created = store.getState().auth.is_profile_created;

          console.log("New access token",newAccessToken);
          console.log("new refresh token",newRefreshToken);


            store.dispatch(
              login({
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
                is_super:is_super,
                is_worker: is_worker,
                is_active : is_active,
                email : email,
                username : username,
                userId  : userId ,
                name : name,
                isAuthenticated : true,
                is_user : is_user,
                is_approved : is_approved,
                is_profile_created : is_profile_created
              })
            );

              axios.defaults.headers.common[
                'Authorization'
              ] = `Bearer ${newAccessToken}`;
              originalConfig.headers[
                'Authorization'
              ] = `Bearer ${newAccessToken}`;


              if (refreshQueue.length > 0) {
                // Resend all the queued requests
                console.log("resendig the qued requests")
                console.log(refreshQueue)
                refreshQueue.forEach((requestCallback) => {
                  requestCallback();
                });
                // Clear the queue
                refreshQueue = [];
              }


              return axios(originalConfig);
            }
          } catch (refreshError) {
            console.log('Refresh Token expired:');
            console.log('Failed to refresh token:', refreshError);

            alert.error(refreshError)

            store.dispatch(
              logout({
                isAuthenticated : false,
                userId : null,
                email : '',
                username : '',
                is_super : false,
                is_worker : false,
                is_active : false,
                accessToken : null,
                refreshToken : null,
                is_user : false,
                is_approved : false,
                is_profile_created : false,
              }
            ));
          } finally {
            isRefreshing = false;
          }
        } else {
          // If a refresh token request is already in progress, enqueue the original request
          return new Promise((resolve) => {
            refreshQueue.push(() => {
              originalConfig.headers['Authorization'] = `Bearer ${store.getState().auth.accessToken}`;
              console.log("queing up coming API requests")
              resolve(axios(originalConfig));
            });
          });
        }
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default AxiosInstance;
