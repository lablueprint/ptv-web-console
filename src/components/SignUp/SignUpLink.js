import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

export default function SignUpLink() {
  return (
    <p>
      Don&apos;t have an account?&nbsp;
      <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
  );
}
