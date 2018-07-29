// import { message } from 'antd';
// import * as type from './type';
// import * as http from '../axios/index';

// const requestData = category => ({
//   type: type.REQUEST_DATA,
//   category
// });

// export const receiveData = (data, category) => ({
//   type: type.RECEIVE_DATA,
//   data,
//   category
// });

// /**
//  * 请求数据调用方法
//  * @param funcName      请求接口的函数名
//  * @param params        请求接口的参数
//  */
// export const fetchData = ({ funcName, params, stateName }) => (dispatch) => {
//   !stateName && (stateName = funcName);
//   dispatch(requestData(stateName));
//   const result = http[funcName](params);
//   if (!result) {
//     dispatch(receiveData(null, stateName));
//   } else {
//     result.then(res => dispatch(receiveData(res, stateName)));
//   }
// };

// export const unAuthorized = () => (dispatch) => {
//   const stateName = 'auth';
//   dispatch(receiveData(null, stateName));
// };

// export const userLogin = (username, password) => (dispatch) => {
//   try {
//     const stateName = 'auth';
//     dispatch(requestData(stateName));
//     http
//       .login(username, password)
//       .then((res) => {
//         if (res && res.data && res.data.code) {
//           message.warn('用户名密码错误');
//         } else {
//           dispatch(receiveData(res.data, stateName));
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//         message.error('请求失败');
//         dispatch(receiveData(null, stateName));
//       });
//   } catch (error) {
//     console.log(error);
//   }
// };
