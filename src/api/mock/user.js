export default mock => {
  if (!mock) return;
  // mock.onPost('/login').reply(200, {
  //   headImg: 'https://randomuser.me/api/portraits/women/50.jpg',
  //   nickName: 'Marie Hunter',
  //   userId: 3,
  // });

  mock.onPost('/login').reply(
    config =>  // eslint-disable-line
      new Promise(resolve => {
        setTimeout(() => {
          resolve([
            200,
            {
              headImg: 'https://randomuser.me/api/portraits/women/50.jpg',
              nickName: 'Marie Hunter',
              userId: 3,
            },
          ]);
        }, 1000);
      })
  );
};
