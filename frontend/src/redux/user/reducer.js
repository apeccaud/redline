import { SAVE_USER, SAVE_STATUS } from './actions';

const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SAVE_USER:
      return payload;

    case SAVE_STATUS:
      return {...state, status: payload };

    default:
      return state;
  }
}
