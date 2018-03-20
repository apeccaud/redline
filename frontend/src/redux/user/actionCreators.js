import { SAVE_USER, SAVE_STATUS } from './actions';

export const saveUser = content => ({
  type: SAVE_USER,
  payload: content
});

export const saveStatus = status => ({
  type: SAVE_STATUS,
  payload: status
});
