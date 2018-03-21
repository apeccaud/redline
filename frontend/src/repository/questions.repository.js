import request from 'superagent';

import config from '../config';
import { handleError } from './handleError';


export async function findLastActive() {
  return new Promise((resolve, reject) => {
    request.get(`${config.remote.host}/api/questions/findLastActive`)
      .set('Authorization', localStorage.getItem('token') || null)
      .then(res => resolve(res.body))
      .catch(err => handleError(err));
  })
}
