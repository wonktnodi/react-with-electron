import md5 from 'md5';

export default mock => {
  if (!mock) return;
  // mock.onPost('/login').reply(200, {
  //   headImg: 'https://randomuser.me/api/portraits/women/50.jpg',
  //   nickName: 'Marie Hunter',
  //   userId: 3,
  // });

  mock.onPost('/login').reply(config => {
    const data = JSON.parse(config.data);

    if (data.username === 'admin' && data.password === md5('888888')) {
      return [
        200,
        {
          headImg: 'https://randomuser.me/api/portraits/women/60.jpg',
          nickName: 'Marie Hunter',
          userId: 3,
          role: 11,
        },
      ];
    }
    if (data.password === md5('123456') && data.username === 'user') {
      return [
        200,
        {
          headImg: 'https://randomuser.me/api/portraits/women/60.jpg',
          nickName: 'Marie Hunter',
          userId: 3,
          role: 1,
        },
      ];
    }

    return [401];
  });
};

// new Promise(resolve => {
//   debugger;
//   setTimeout(() => {
//     resolve([
//       200,
//       {
//         headImg: 'https://randomuser.me/api/portraits/women/60.jpg',
//         nickName: 'Marie Hunter',
//         userId: 3,
//         role: 1,
//       },
//     ]);
//   }, 1000);
// })
