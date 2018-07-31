export default mock => {
  if (!mock) return;
  // mock.onPost('/login').reply(200, {
  //   headImg: 'https://randomuser.me/api/portraits/women/50.jpg',
  //   nickName: 'Marie Hunter',
  //   userId: 3,
  // });

  mock.onPost('/login').reply(
    config =>
      new Promise(resolve => {
        console.log(config);
        setTimeout(() => {
          resolve([
            401,
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
