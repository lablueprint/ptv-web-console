import React from "react";
import SignInForm from "./SignInForm";
import { SignUpLink } from "../SignUp";
import { PasswordForgetLink } from "../PasswordForget";

export default function SignInPage() {
  return (
    <div>
      <h1>SignIn</h1>
      <SignInForm />
      <PasswordForgetLink />
      <SignUpLink />
    </div>
  );
}

export { SignInForm };
