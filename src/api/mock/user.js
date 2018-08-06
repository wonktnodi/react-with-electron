import md5 from 'md5';
import cookie from 'cookie'; // eslint-disable-line

const adminUser = {
  headImg: 'https://randomuser.me/api/portraits/women/60.jpg',
  nickName: 'Marie Hunter',
  userId: 3,
  role: 11,
};

const normalUser = {
  headImg: 'https://randomuser.me/api/portraits/women/50.jpg',
  nickName: 'Teresa Ramos',
  userId: 4,
  role: 1,
};

let userId = 0;
export default mock => {
  if (!mock) return;

  mock.onPost('/login').reply(config => {
    const data = JSON.parse(config.data);
    // const headers = {};
    // headers['Set-Cookie'] = cookie.serialize('utoken', 'aaaaaaaa', {
    //   httpOnly: true,
    //   maxAge: 60 * 60 * 24 * 7,
    // });
    if (data.username === 'admin' && data.password === md5('888888')) {
      userId = 3;
      return [200, adminUser];
    }
    if (data.password === md5('123456') && data.username === 'user') {
      userId = 4;
      return [200, normalUser];
    }

    return [401];
  });

  mock.onGet('/users/status').reply(() => {
    // const data = JSON.parse(config.data);
    if (userId === 3) return [200, adminUser];
    return [200, normalUser];
  });
};
