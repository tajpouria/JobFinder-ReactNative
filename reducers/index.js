import { combineReducers } from 'redux';

import auth from './authReducer';
import jobs from './jobReducer';

export default combineReducers({
  auth,
  jobs
});
