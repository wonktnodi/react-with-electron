export default {
  'https://www.imagicstone.com/api/users': ({ params }) => {
    const all = [
      {
        name: 'John1',
        age: 15,
      },
      {
        name: 'Lily',
        age: 16,
      },
    ];
    let filtered;
    if (typeof params !== 'undefined') {
      filtered = all.filter(item => {
        let result = true;
        const keys = Object.keys(params);
        keys.forEach(key => {
          const param = params[key];

          if (item[key] && item[key] !== param) {
            result = false;
          }
        });

        return result;
      });
    } else {
      filtered = all;
    }
    return filtered;
  },
};
