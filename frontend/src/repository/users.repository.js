import request from 'superagent';

import config from '../config';


export async function resetAllStatus() {
  return new Promise((resolve, reject) => {
    request.get(`${config.remote.host}/api/users/resetAllStatus`)
      .then(res => resolve(res.body))
      .catch(err => handleError(err));
  })
}

export async function getTotalStatus() {
  return new Promise((resolve, reject) => {
    request.get(`${config.remote.host}/api/users/status`)
      .then(res => resolve(res.body))
      .catch(err => handleError(err));
  })
}

export async function getUser(userId) {
  return new Promise((resolve, reject) => {
    request.get(`${config.remote.host}/api/users/${userId}`)
      .then(res => resolve(res.body))
      .catch(err => handleError(err));
  })
}

export async function saveUserStatus(userId, status) {
  return new Promise((resolve, reject) => {
    request.put(`${config.remote.host}/api/users/${userId}/changeStatus`)
      .send({ status: status })
      .catch(err => handleError(err));
  })
}

const handleError = (err) => {
  if (err.status === 401) {
    const authUrl = err.response.body.authUrl;
    window.location.replace(
      `${authUrl}?redirect=${encodeURIComponent(document.location.href)}`
    );
  }
  return Promise.reject(err);
};
