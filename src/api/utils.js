// import { push } from 'connected-react-router';
import httpRequest from 'axios';
import mock from './mock';

mock(httpRequest);

const request = ({ url, method, params, data, headers, dispatch }) =>
  httpRequest
    .request({ url, method, headers, data, params })
    .then(response => {
      // console.log(response);
      return response;
    })
    .catch(e => {
      if (!e.response) return { error: e };

      return {
        config: e.config,
        status: e.response.status,
        data: e.response.data || {},
        error: e,
      };
    });

export const get = ({ url, headers, params, dispatch }) => request({ url, method: 'GET', headers, params, dispatch });

export const post = ({ url, data, headers, dispatch }) => request({ url, method: 'POST', data, headers, dispatch });
