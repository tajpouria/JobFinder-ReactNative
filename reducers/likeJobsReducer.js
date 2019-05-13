import _ from 'lodash';
import { REHYDRATE } from 'redux-persist/es/constants';

import { LIKED_JOB, CLEAR_LIKED_JOBS } from '../actions/types';

export default (state = [], action) => {
  console.log(action.payload);
  switch (action.type) {
    case LIKED_JOB:
      return _.uniqBy([...state, action.payload], 'jobkey');
    case CLEAR_LIKED_JOBS:
      return [];
    default:
      return state;
  }
};
