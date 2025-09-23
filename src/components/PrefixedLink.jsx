import React from "react";
import { Link } from "react-router-dom";
import { BASE_PATH } from "../config/routes";

export default function PrefixedLink({ to, ...props }) {
  let finalTo = to;
  if (typeof to === "string" && to.startsWith("/")) {
    finalTo = `${BASE_PATH}${to}`;
  }
  return <Link to={finalTo} {...props} />;
}
