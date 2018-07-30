import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import unionBy from 'lodash/unionBy';

import { getMenuData } from './menu';
import AllComponents from './component';

let routerDataCache = null;

/**
 * 根据菜单取得重定向地址.
 */
const redirectData = [];
const getRedirect = item => {
  if (item && item.children) {
    if (item.children[0] && item.children[0].path) {
      redirectData.push({
        from: `${item.path}`,
        to: `${item.children[0].path}`,
      });
      item.children.forEach(children => {
        getRedirect(children);
      });
    }
  }
};
getMenuData().forEach(getRedirect);

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

function routesFromMenuData() {
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
      {newData.map(item => {
        let Component = null;
        if (item.component) Component = AllComponents[item.component];
        return Component ? (
          <Route
            key={item.path}
            path={item.path}
            render={props => <Component {...props} routerData={routerDataCache} />}
          />
        ) : (
          undefined
        );
      })}
      {redirectData.map(item => <Redirect key={item.from} exact from={item.from} to={item.to} />)}
    </Switch>
  );
}

export const generateRoutes = () => routesFromMenuData();
