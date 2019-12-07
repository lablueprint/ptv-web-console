import React from "react";
import { PasswordForgetForm } from "../PasswordForget";
import { PasswordChangeForm } from "../PasswordChange";

export default function AccountPage() {
  return (
    <div>
      <h1>Account</h1>
      <PasswordForgetForm />
      <PasswordChangeForm />
    </div>
  );
}
