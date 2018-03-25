import request from 'superagent';

import config from '../config';
import { handleError } from './handleError';


export async function findLastActive() {
  return new Promise((resolve, reject) => {
    request.get(`${config.remote.host}/api/questions/findLastActive`)
      .set('Authorization', localStorage.getItem('token') || null)
      .then(res => resolve(res.body))
      .catch(err => handleError(reject, err));
  })
}

export async function create(question, goodAnswer, badAnswer1, badAnswer2, badAnswer3) {
  return new Promise((resolve, reject) => {
    request.post(`${config.remote.host}/api/questions`)
      .set('Authorization', localStorage.getItem('token') || null)
      .send({
        question: question,
        goodAnswer: goodAnswer,
        badAnswer1: badAnswer1,
        badAnswer2: badAnswer2,
        badAnswer3: badAnswer3,
      })
      .then(res => resolve(res.body))
      .catch(err => handleError(reject, err));
  })
}

export async function deactivate(questionId) {
  return new Promise((resolve, reject) => {
    request.put(`${config.remote.host}/api/questions/${questionId}/deactivate`)
      .set('Authorization', localStorage.getItem('token') || null)
      .then(res => resolve(res.body))
      .catch(err => handleError(reject, err));
  })
}

export async function getResponses(questionId) {
  return new Promise((resolve, reject) => {
    request.get(`${config.remote.host}/api/questions/${questionId}/getResponses`)
      .set('Authorization', localStorage.getItem('token') || null)
      .then(res => resolve(res.body))
      .catch(err => handleError(reject, err));
  })
}

export async function submitResponse(questionId, answer) {
  return new Promise((resolve, reject) => {
    request.post(`${config.remote.host}/api/questions/${questionId}/responses/create`)
      .set('Authorization', localStorage.getItem('token') || null)
      .send({ answer: answer })
      .then(res => resolve(res.body))
      .catch(err => handleError(reject, err));
  })
}
