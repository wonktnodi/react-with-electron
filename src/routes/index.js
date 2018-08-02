import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import unionBy from 'lodash/unionBy';

import Authorized from '../utils/Authorized';
import { Page404 } from '../components/Exception/pages';
import { getMenuData } from './menu';
import AllComponents from './component';

const { AuthorizedRoute, check } = Authorized;

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

const getBaseRedirect = (routerData) => {
  // According to the url parameter to redirect
  // 这里是重定向的,重定向到 url 的 redirect 参数所示地址
  const urlParams = new URL(window.location.href);

  const redirect = urlParams.searchParams.get('redirect');
  // Remove the parameters in the url
  if (redirect) {
    urlParams.searchParams.delete('redirect');
    window.history.replaceState(null, 'redirect', urlParams.href);
  } else {
    // get the first authorized route path in routerData
    const authorizedPath = Object.keys(routerData).find(
      item => check(routerData[item].authority, item) && item !== '/'
    );
    return routerData[authorizedPath].path;
  }
  return redirect;
};

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
  console.log(newData);
  const bashRedirect = getBaseRedirect(newData);
  return (
    <Switch>
      {redirectData.map(item => <Redirect key={item.from} exact from={item.from} to={item.to} />)}
      {newData.map(item => {
        let Component = null;
        if (item.component) Component = AllComponents[item.component];
        return Component ? (
          <AuthorizedRoute
            key={item.path}
            path={item.path}
            exact={item.exact}
            authority={item.authority}
            render={props => <Component {...props} routerData={routerDataCache} />}
            redirectPath="/403"
          />
        ) : (
          undefined
        );
      })}
      <Redirect exact from="/" to={bashRedirect} />
      <Route render={Page404} />
    </Switch>
  );
}

export const generateRoutes = () => routesFromMenuData();
