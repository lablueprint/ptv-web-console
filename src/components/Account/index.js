import React from 'react';
import { PasswordChangeForm } from '../PasswordChange';
import { AuthUserContext } from '../Session';

export default function AccountPage() {
  return (
    <AuthUserContext.Consumer>
      {({ authUser, authLoading }) => (
        !authLoading && (
          <div>
            <h1>
              Account:&nbsp;
              {authUser.email}
            </h1>
            <PasswordChangeForm />
          </div>
        )
      )}
    </AuthUserContext.Consumer>
  );
}
