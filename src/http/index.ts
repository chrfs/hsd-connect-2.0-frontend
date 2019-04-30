import axios from 'axios';
import env from '../config/env';
import store from '../store';

export default (() => axios.create({
  baseURL: env.API_HOST,
  headers: {
    common: {
      Authorization: store.getters['user/getAuthToken']
    }
  }
}))();
