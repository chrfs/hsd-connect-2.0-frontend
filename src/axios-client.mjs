import axios from 'axios';
import env from './config/env';

export default axios.create({
  baseURL: `${env.API.URL}:${env.API.PORT}${env.API.PATH}`,
  headers: {
    access_token  : null
  }
});