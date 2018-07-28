import { isUrl } from '../utils/utils';
const menuData = [
  {
    name: 'dashboard',
    icon: 'dashboard',
    path: 'app',
    children: [
      {
        name: '分析页',
        path: 'first',
        component: 'FirstPage'
      },
      {
        name: '监控页',
        path: 'second',
        component: "SecondPage"
      },
      {
        name: '工作台',
        path: 'other',
        component: "OtherPage"
        // hideInBreadcrumb: true,
        // hideInMenu: true,
      },
    ],
  },
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
