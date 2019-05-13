import _ from 'lodash';

import { LIKED_JOB, CLEAR_LIKED_JOBS } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case LIKED_JOB:
      return _.uniqBy([...state, action.payload], 'jobkey');
    case CLEAR_LIKED_JOBS:
      return [];
    default:
      return state;
  }
};
