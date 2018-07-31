import httpRequest from 'axios';
import mock from './mock';

mock(httpRequest);

export const get = ({ url, headers }) =>
  httpRequest
    .get(url, headers)
    .then(res => res.data)
    .catch(err => {
      console.log(err);
    });

export const post = ({ url, data, headers }) =>
  httpRequest
    .post(url, data, headers)
    .then(res => res.data)
    .catch(err => {
      console.log(err);
    });
