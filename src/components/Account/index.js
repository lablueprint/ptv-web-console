import React from "react";
import { PasswordChangeForm } from "../PasswordChange";
import { withAuthorization, AuthUserContext } from "../Session";

function AccountPage() {
  return (
    <AuthUserContext.Consumer>
      {authUser => (
        <div>
          <h1>
            Account:&nbsp;
            {authUser.email}
          </h1>
          <PasswordChangeForm />
        </div>
      )}
    </AuthUserContext.Consumer>
  );
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);
