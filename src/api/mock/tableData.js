import Mock from 'mockjs'; // eslint-disable-line

// const titles = ['Alipay', 'Angular', 'Ant Design', 'Ant Design Pro', 'Bootstrap', 'React', 'Vue', 'Webpack'];
const avatars = [
  'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png', // Alipay
  'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png', // Angular
  'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png', // Ant Design
  'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png', // Ant Design Pro
  'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png', // Bootstrap
  'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png', // React
  'https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png', // Vue
  'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png', // Webpack
];

// const avatars2 = [
//   'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
//   'https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png',
//   'https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png',
//   'https://gw.alipayobjects.com/zos/rmsportal/ubnKSIfAJTxIgXOKlciN.png',
//   'https://gw.alipayobjects.com/zos/rmsportal/WhxKECPNujWoWEFNdnJE.png',
//   'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png',
//   'https://gw.alipayobjects.com/zos/rmsportal/psOgztMplJMGpVEqfcgF.png',
//   'https://gw.alipayobjects.com/zos/rmsportal/ZpBqSxLxVEXfcUNoPKrz.png',
//   'https://gw.alipayobjects.com/zos/rmsportal/laiEnJdGHVOhJrUShBaJ.png',
//   'https://gw.alipayobjects.com/zos/rmsportal/UrQsqscbKEpNuJcvBZBu.png',
// ];

const covers = [
  'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
  'https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png',
  'https://gw.alipayobjects.com/zos/rmsportal/uVZonEtjWwmUZPBQfycs.png',
  'https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png',
];

const desc = [
  '那是一种内在的东西， 他们到达不了，也无法触及的',
  '希望是一个好东西，也许是最好的，好东西是不会消亡的',
  '生命就像一盒巧克力，结果往往出人意料',
  '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
  '那时候我只会想自己想要什么，从不想自己拥有什么',
];

// const user = ['付小小', '曲丽丽', '林东东', '周星星', '吴加好', '朱偏右', '鱼酱', '乐哥', '谭小仪', '仲尼'];
const curDateTime = new Date().getTime();

const fakeList = Mock.mock({
  'list|50-70': [
    {
      'id|+1': 1,
      owner: '@cname()',
      title: '@csentence(10,30)',
      avatar: avatars[Mock.Random.natural(0, avatars.length - 1)],
      cover: covers[Mock.Random.natural(0, covers.length - 1)],
      status: ['active', 'exception', 'normal'][Mock.Random.natural(0, 2)],
      percent: Mock.Random.natural(0, 50) + 50,
      logo: avatars[Mock.Random.natural(0, avatars.length - 1)],
      href: 'https://ant.design',
      createdAt: new Date(curDateTime + Mock.Random.natural(-7200, 7200) * 1000),
      updatedAt: new Date(curDateTime + Mock.Random.natural(27200, 47200) * 1000),
      subDescription: desc[Mock.Random.natural(0, desc.length - 1)],
      description: Mock.Random.cparagraph(),
      activeUser: 100000 + Mock.Random.natural(0, 100000),
      newUser: 1000 + Mock.Random.natural(0, 1000),
      star: 100 + Mock.Random.natural(0, 100),
      like: 100 + Mock.Random.natural(0, 100),
      message: 10 + Mock.Random.natural(0, 10),
      content: Mock.Random.cparagraph(),
      members: [
        {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png',
          name: '曲丽丽',
        },
        {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png',
          name: '王昭君',
        },
        {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png',
          name: '董娜娜',
        },
      ],
    },
  ],
});

// console.log('facke list: ', fakeList);

// mock tableListDataSource
const tableListDataSource = [];
for (let i = 0; i < 46; i += 1) {
  tableListDataSource.push({
    key: i,
    disabled: i % 6 === 0,
    href: 'https://ant.design',
    avatar: [
      'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
      'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
    ][i % 2],
    no: `TradeCode ${i}`,
    title: `一个任务名称 ${i}`,
    owner: '曲丽丽',
    description: '这是一段描述',
    callNo: Math.floor(Math.random() * 1000),
    status: Math.floor(Math.random() * 10) % 4,
    updatedAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    createdAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    progress: Math.ceil(Math.random() * 100),
  });
}

function getRule(params, res) {
  let dataSource = [...tableListDataSource];
  params = params || {};
  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }

  if (params.status) {
    const status = params.status.split(',');
    let filterDataSource = [];
    status.forEach(s => {
      filterDataSource = filterDataSource.concat(
        [...dataSource].filter(data => parseInt(data.status, 10) === parseInt(s[0], 10))
      );
    });
    dataSource = filterDataSource;
  }

  if (params.no) {
    dataSource = dataSource.filter(data => data.no.indexOf(params.no) > -1);
  }

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
    list: dataSource,
    pagination: {
      total: dataSource.length,
      pageSize,
      current: parseInt(params.currentPage, 10) || 1,
    },
  };

  if (res && res.json) {
    res.json(result);
    return result;
  }
  return result;
}

// function postRule(req, res, u, b) {
//   // eslint-disable-line
//   let url = u;
//   if (!url || Object.prototype.toString.call(url) !== '[object String]') {
//     url = req.url; // eslint-disable-line
//   }

//   const body = (b && b.body) || req.body;
//   const { method, no, description } = body;

//   switch (method) {
//   /* eslint no-case-declarations:0 */
//   case 'delete':
//     tableListDataSource = tableListDataSource.filter(item => no.indexOf(item.no) === -1);
//     break;
//   case 'post':
//     const i = Math.ceil(Math.random() * 10000);
//     tableListDataSource.unshift({
//       key: i,
//       href: 'https://ant.design',
//       avatar: [
//         'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
//         'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
//       ][i % 2],
//       no: `TradeCode ${i}`,
//       title: `一个任务名称 ${i}`,
//       owner: '曲丽丽',
//       description,
//       callNo: Math.floor(Math.random() * 1000),
//       status: Math.floor(Math.random() * 10) % 2,
//       updatedAt: new Date(),
//       createdAt: new Date(),
//       progress: Math.ceil(Math.random() * 100),
//     });
//     break;
//   default:
//     break;
//   }

//   const result = {
//     list: tableListDataSource,
//     pagination: {
//       total: tableListDataSource.length,
//     },
//   };

//   if (res && res.json) {
//     res.json(result);
//   } else {
//     return result;
//   }
// }

function getFakeList() {
  return fakeList;
}

export default mock => {
  if (!mock) return;

  mock.onGet('/lists').reply(config =>
    // eslint-disable-line
    // console.log(config);
    [200, getRule(config.params)]
  );

  mock.onGet('/lists/basics').reply((/* config */) => [200, getFakeList()]);
};
