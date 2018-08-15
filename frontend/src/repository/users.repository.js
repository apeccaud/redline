import request from 'superagent';

import config from '../config';
import { handleError } from './handleError';


export function resetAllStatus() {
  return new Promise((resolve, reject) => {
    request.get(`${config.remote.host}/api/users/resetAllStatus`)
      .set('Authorization', localStorage.getItem('token') || null)
      .then(res => resolve(res.body))
      .catch(err => handleError(reject, err));
  })
}

export function getTotalStatus() {
  return new Promise((resolve, reject) => {
    request.get(`${config.remote.host}/api/users/status`)
      .set('Authorization', localStorage.getItem('token') || null)
      .then(res => resolve(res.body))
      .catch(err => handleError(reject, err));
  })
}

export function getUser() {
  return new Promise((resolve, reject) => {
    request.get(`${config.remote.host}/api/users/get`)
      .set('Authorization', localStorage.getItem('token') || null)
      .then(res => resolve(res.body))
      .catch(err => handleError(reject, err));
  })
}

export function saveUserStatus(userId, status) {
  return new Promise((resolve, reject) => {
    request.put(`${config.remote.host}/api/users/${userId}/changeStatus`)
      .set('Authorization', localStorage.getItem('token') || null)
      .send({ status: status })
      .catch(err => handleError(reject, err));
  })
}
