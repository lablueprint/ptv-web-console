import React from "react";
import PasswordForgetForm from "./PasswordForgetForm";
import PasswordForgetLink from "./PasswordForgetLink";

export default function PasswordForget() {
  return (
    <div>
      <h1>PasswordForget</h1>
      <PasswordForgetForm />
    </div>
  );
}

export { PasswordForgetForm, PasswordForgetLink };
