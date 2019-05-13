import { combineReducers } from 'redux';

import auth from './authReducer';
import jobs from './jobReducer';
import likeJobs from './likeJobsReducer';

export default combineReducers({
  auth,
  jobs,
  likeJobs
});
