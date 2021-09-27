import axios from 'axios';

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

export default myAxios;
