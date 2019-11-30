import React from 'react';
import SignInForm from './SignInForm';
import { SignUpLink } from '../SignUp';

export default function SignIn() {
  return (
    <div>
      <h1>SignIn</h1>
      <SignInForm />
      <SignUpLink />
    </div>
  );
}

export { SignInForm };
