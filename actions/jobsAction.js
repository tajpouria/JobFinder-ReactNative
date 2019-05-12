import reverseGeocode from 'latlng-to-zip';
import qs from 'qs';
import axios from 'axios';

import { FETCH_JOBS } from './types';

const JOB_QUERY_PARAMS = {
  publisher: '1397045879077994',
  format: 'json',
  v: '2',
  latlong: 1,
  radius: 10,
  q: 'javascript'
};

const builJobUrl = postal =>
  `http://api.indeed.com/ads/apisearch?${qs.stringify({
    ...JOB_QUERY_PARAMS,
    l: postal
  })}`;

const getPostal = async (latitude, longitude) => {
  const res = await axios.get(
    `http://geocode.xyz/${latitude},${longitude}?geoit=json`
  );
  return res.data.alt.loc[0].postal;
};

export const fetchJobs = ({ latitude, longitude }) => async dispatch => {
  const postal = await getPostal(latitude, longitude);

  const result = await axios.get(builJobUrl(postal));
  console.log(result.data);
};