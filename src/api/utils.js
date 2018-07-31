// import { push } from 'connected-react-router';
import httpRequest from 'axios';
import mock from './mock';

mock(httpRequest);

const request = ({ url, method, params, data, headers, dispatch }) =>
  httpRequest
    .request({ url, method, headers, data, params })
    .then(response => {
      console.log(response);
      return response;
    })
    .catch(e => {
      if (!e.response) return { error: e };

      return {
        config: e.config,
        status: e.response.status,
        data: e.response.data,
        error: e,
      };

      //       {status: 200, data: {…}, headers: undefined, config: {…}}
      // config
      // :
      // {transformRequest: {…}, transformResponse: {…}, timeout: 0, xsrfCookieName: "XSRF-TOKEN", xsrfHeaderName: "X-XSRF-TOKEN", …}
      // data
      // :
      // {headImg: "https://randomuser.me/api/portraits/women/50.jpg", nickName: "Marie Hunter", userId: 3}
      // headers
      // :
      // undefined
      // status
      // :
      // 200
      // __proto__
      // :
      // Object

      // Promise.reject(error) ;
      // if (!e.response) return null;
      // const { status } = e.response;
      // if (status === 401) {
      //   dispatch(push('/403'));
      //   return undefined;
      // }
      // if (status === 403) {
      //   return undefined;
      // }
      // if (status <= 504 && status >= 500) {
      //   return undefined;
      // }
      // if (status >= 404 && status < 422) {
      //   return undefined;
      // }
      // console.log(e);
      // return undefined;
    });

export const get = ({ url, headers, dispatch }) =>
  request({ url, method: 'GET', headers, dispatch });

export const post = ({ url, data, headers, dispatch }) =>
  request({ url, method: 'POST', data, headers, dispatch });

// export const get = ({ url, headers }) =>
//   httpRequest
//     .get(url, headers)
//     .then(res => res.data)
//     .catch(err => {
//       console.log(err);
//     });

// export const post = ({ url, data, headers }) =>
//   httpRequest
//     .post(url, data, headers)
//     .then(res => res.data)
//     .catch(err => {
//       console.log(err);
//     });
