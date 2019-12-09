import React from "react";
import { CreateForumPostForm, DisplayForumPostPage } from "./Post";
import { withAuthorization, AuthUserContext } from "../Session";

function ForumPage() {
  return (
    <AuthUserContext.Consumer>
      {authUser => (
        <div>
          <h1>
            Account:&nbsp;
            {authUser.email}
          </h1>
          <CreateForumPostForm uid={authUser.uid} />
          <DisplayForumPostPage />
        </div>
      )}
    </AuthUserContext.Consumer>
  );
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(ForumPage);
