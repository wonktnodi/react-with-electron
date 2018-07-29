import React from 'react';
import { Route, Switch } from 'react-router-dom';
import unionBy from 'lodash/unionBy';

import { getMenuData } from './menu';
import AllComponents from './component';

let routerDataCache = null;

// const routes = [
//   {
//     title: 'first page',
//     path: '/app/first',
//     component: 'FirstPage',
//   },
//   {
//     title: 'second page',
//     path: '/app/second',
//     component: 'SecondPage',
//   },
//   {
//     title: 'other page',
//     path: '/app/other',
//     component: 'OtherPage',
//   },
// ];

const othersRoutes = [
  {
    name: 'other route page',
    path: '/app/item/detail',
    component: 'OtherPage',
  },
  {
    name: 'other page',
    path: '/app/other',
    component: 'OtherPage',
  },
];

function getFlatMenuData(menus) {
  let keys = {};
  menus.forEach(item => {
    if (item.children) {
      keys[item.path] = { ...item };
      keys = { ...keys, ...getFlatMenuData(item.children) };
    } else {
      keys[item.path] = { ...item };
    }
  });
  return keys;
}

const menusData = getFlatMenuData(getMenuData());

function generateRouterData() {
  const routerData = { ...menusData };
  othersRoutes.forEach(item => {
    if (!routerData[item.path]) {
      routerData[item.path] = item;
    }
  });
  return routerData;
}

export function getRouterData() {
  if (!routerDataCache) {
    routerDataCache = generateRouterData();
  }
  return routerDataCache;
}

function routesFromMenuData(path) {
  if (!routerDataCache) {
    routerDataCache = generateRouterData();
  }

  const menuRoutes = [];
  Object.keys(menusData).forEach(key => {
    if (!menusData[key].children && menusData[key].component) {
      menuRoutes.push(menusData[key]);
    }
  });
  // return menuRoutes;
  const newData = unionBy(menuRoutes.concat(othersRoutes), 'path');
  return (
    <Switch>
      {newData.map((item, i) => {
        let Component = null;
        if (item.component) Component = AllComponents[item.component];
        return Component ? (
          <Route
            key={i}
            path={item.path}
            render={props => <Component {...props} routerData={routerDataCache} />}
          />
        ) : (
          undefined
        );
      })}
    </Switch>
  );
}

export const generateRoutes = path => {
  return routesFromMenuData();
};
