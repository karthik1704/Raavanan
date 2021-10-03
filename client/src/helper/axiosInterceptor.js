import axios from 'axios';

import { logoutUser, refreshAccessToken } from '../features/auth/authSlice';

import { API_URL } from '../CONSTANTS';

let headers = {};

const myAxios = axios.create({
  headers,
});

myAxios.interceptors.request.use(
  async (config) => {
    const token = await localStorage.getItem('access');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    console.error('Axios Error -> ', JSON.stringify(error));
    return Promise.reject(error);
  }
);

myAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      axios
        .post(`${API_URL}api/auth/token/refresh/ `, {
          refresh: localStorage.getItem('refresh_token'),
        })
        .then((res) => {
          const access_token = res.data.access;
          refreshAccessToken(res.data);
          axios.defaults.headers.common['Authorization'] =
            'Bearer ' + access_token;
          originalRequest.headers['Authorization'] = 'Bearer ' + access_token;
          return myAxios(originalRequest);
        })
        .catch((error) => {
          logoutUser();
          // return Promise.reject(error);
        });
    }
    return Promise.reject(error);
  }
);

export default myAxios;
