import axios from 'axios';
import router from '../router';

const Http = axios.create({
    baseURL: 'http://aokaevents.tcrp.uz/',
  },
);
Http.interceptors.response.use(undefined, (error) => {
  if (error.response && error.response.status === 401) {
    router.replace({
      path: '/auth',
      // query: { redirect: router.currentRoute.fullPath },
    });
  }
  return Promise.reject(error.response.data);
});

export default Http;