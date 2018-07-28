import React from 'react';
import { Route, Switch } from 'react-router-dom';
import unionBy from 'lodash/unionBy';

// import { getRoutes } from '../utils/utils';
import { getMenuData } from './menu';
import AllComponents from './component';

const routes = [
  {
    title: 'first page',
    path: '/app/first',
    component: 'FirstPage',
  },
  {
    title: 'second page',
    path: '/app/second',
    component: 'SecondPage',
  },
  {
    title: 'other page',
    path: '/app/other',
    component: 'OtherPage',
  },
];

const othersRoutes = [
  {
    title: 'other route page',
    path: '/app/item/detail',
    component: 'OtherPage',
  },
  {
    title: 'other page',
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

function routesFromMenuData(path) {
  const menuRoutes = [];
  Object.keys(menusData).forEach(key => {
    if (!menusData[key].children && menusData[key].component) {
      menuRoutes.push(menusData[key]);
    }
  });
  // return menuRoutes;
  const newData = unionBy(menuRoutes.concat(othersRoutes),'path'); 
  return (
    <Switch>
      {newData.map((item, i) => {
        let comp = null;
        if (item.component) comp = AllComponents[item.component];
        return comp ? <Route key={i} path={item.path} component={comp} /> : null;
      })}
    </Switch>
  );
}

// function fixedRoutes(path) {
//   const newRoutes = routes.concat(othersRoutes);
//   return (
//     <Switch>
//       {newRoutes.map((item, i) => {
//         let comp = null;
//         if (item.component) comp = AllComponents[item.component];
//         return comp ? <Route key={i} path={item.path} component={comp} /> : null;
//       })}
//     </Switch>
//   );
// }

export const generateRoutes = path => {
  return routesFromMenuData();
};

export default routes;
