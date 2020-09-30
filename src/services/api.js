import axios from 'axios';

const api = axios.create({
  baseURL: 'https://countries-274616.ew.r.appspot.com',
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return error.response;
  }
);

export default api;
