import request from 'superagent';

import config from '../config';


export async function resetAllStatus() {
  return new Promise((resolve, reject) => {
    request.get(`${config.remote.host}/api/users/resetAllStatus`)
      .then(res => resolve(res.body))
      .catch(err => reject(err));
  })
}

export async function getTotalStatus() {
  return new Promise((resolve, reject) => {
    request.get(`${config.remote.host}/api/users/status`)
      .then(res => resolve(res.body))
      .catch(err => reject(err));
  })
}

export async function getUser(userId) {
  return new Promise((resolve, reject) => {
    request.get(`${config.remote.host}/api/users/${userId}`)
      .then(res => resolve(res.body))
      .catch(err => reject(err));
  })
}

export async function saveUserStatus(userId, status) {
  return new Promise((resolve, reject) => {
    request.put(`${config.remote.host}/api/users/${userId}/changeStatus`)
      .send({ status: status })
      .catch(err => reject(err));
  })
}
