import axios from 'axios';
import env from '../config/env';
import store from '../store';

export default (() => axios.create({
  baseURL: `${env.API.URL}:${env.API.PORT}${env.API.PATH}`,
  headers: {
    common: {
      Authorization  : store.getters.authToken
    }
  }
}))();