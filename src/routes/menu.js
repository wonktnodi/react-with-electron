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
        component: 'FirstPage',
      },
      {
        name: '监控页',
        path: 'second',
        component: 'SecondPage',
      },
      {
        name: '工作台',
        path: 'other',
        component: 'OtherPage',
        // hideInBreadcrumb: true,
        // hideInMenu: true,
      },
    ],
  },
  {
    name: '表单页',
    icon: 'form',
    path: 'form',
    children: [
      {
        name: '基础表单',
        path: 'basic-form',
        component: 'SecondPage',
      },
      {
        name: '分步表单',
        path: 'step-form',
        component: 'SecondPage',
      },
      {
        name: '高级表单',
        path: 'advanced-form',
        component: 'SecondPage',
        authority: 'admin',
      },
    ],
  },
  {
    name: '列表页',
    icon: 'table',
    path: 'list',
    children: [
      {
        name: '查询表格',
        path: 'table-list',
        component: 'TableList',
      },
      {
        name: '标准列表',
        path: 'basic-list',
        component: 'BasicList',
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
export default getMenuData;
