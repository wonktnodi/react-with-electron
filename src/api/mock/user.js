import md5 from 'md5';

const adminUser = {
  headImg: 'https://randomuser.me/api/portraits/women/60.jpg',
  nickName: 'Marie Hunter',
  userId: 3,
  role: 11,
};

const normalUser = {
  headImg: 'https://randomuser.me/api/portraits/women/50.jpg',
  nickName: 'Teresa Ramos',
  userId: 3,
  role: 1,
};

export default mock => {
  if (!mock) return;

  mock.onPost('/login').reply(config => {
    const data = JSON.parse(config.data);

    if (data.username === 'admin' && data.password === md5('888888')) {
      return [200, adminUser];
    }
    if (data.password === md5('123456') && data.username === 'user') {
      return [200, normalUser];
    }

    return [401];
  });

  mock.onGet('/users/status').reply(config => {
    const data = JSON.parse(config.data);
    return [200, data];
  });
};
