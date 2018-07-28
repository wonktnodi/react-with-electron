import React from "react";
import { Route, Switch } from "react-router-dom";

import AllComponents from "./component";

const routes = [
  {
    title: "first page",
    path: "/app/first",
    component: "FirstPage"
  },
  {
    title: "second page",
    path: "/app/second",
    component: "SecondPage"
  },
  {
    title: "other page",
    path: "/app/other",
    component: "OtherPage"
  }
];

export const generateRoutes = () => {
  return (
    <Switch>
      {routes.map((item, i) => {
        let comp = null;
        if (item.component) comp = AllComponents[item.component];
        return comp ? (
          <Route key={i} path={item.path} component={comp} />
        ) : null;
      })}
    </Switch>
  );
};

export default routes;
