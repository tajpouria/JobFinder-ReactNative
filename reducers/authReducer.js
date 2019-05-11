import { FACEBOOK_LOGIN_SUCCESSFUL } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FACEBOOK_LOGIN_SUCCESSFUL:
      return { token: action.payload };
    default:
      return state;
  }
};
