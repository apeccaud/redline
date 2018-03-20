import { SAVE_USER } from './actions';

export const saveUser = content => ({
  type: SAVE_USER,
  payload: content
});
