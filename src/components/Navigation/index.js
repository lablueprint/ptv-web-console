import React from "react";
import NavigationAuth from "./NavigationAuth";
import NavigationNonAuth from "./NavigationNonAuth";
import { AuthUserContext } from "../Session";

export default function Navigation() {
  return (
    <AuthUserContext.Consumer>
      {authUser => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
    </AuthUserContext.Consumer>
  );
}
