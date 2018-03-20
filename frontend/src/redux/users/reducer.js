import { SAVE_USER } from './actions';

const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SAVE_USER:
      return payload;

    default:
      return state;
  }
}
