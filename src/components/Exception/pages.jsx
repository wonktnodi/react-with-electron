import React from "react";
import { Link } from "react-router-dom";
import Exception from "./index";

export const Page403 = () => (
  <Exception
    type="403"
    style={{ minHeight: 500, height: "80%" }}
    linkElement={Link}
  />
);

export const Page404 = () => (
  <Exception
    type="404"
    style={{ minHeight: 500, height: "80%" }}
    linkElement={Link}
  />
);

export const Page500 = () => (
  <Exception
    type="500"
    style={{ minHeight: 500, height: "80%" }}
    linkElement={Link}
  />
);
