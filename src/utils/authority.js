// use localStorage to store the authority info, which might be sent from server in actual project.
const userRole = {
  1: 'user',
  11: 'admin',
};

export function roleToAuthority(role) {
  const auth = userRole[role];
  return auth || 'user';
}

export function getAuthority() {
  // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  return localStorage.getItem('antd-pro-authority') || 'admin';
}

export function setAuthority(authority) {
  return localStorage.setItem('antd-pro-authority', authority);
}
