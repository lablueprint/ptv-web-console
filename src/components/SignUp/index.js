import React from "react";
import SignUpForm from "./SignUpForm";
import SignUpLink from "./SignUpLink";

export default function SignUpPage() {
  return (
    <div>
      <h1>SignUp</h1>
      <SignUpForm />
    </div>
  );
}

export { SignUpForm, SignUpLink };
