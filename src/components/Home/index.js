import React from "react";
import { withAuthorization } from "../Session";

function HomePage() {
  return (
    <div>
      <h1>Home</h1>
      <p>The Home Page is accessible by every signed in user.</p>
    </div>
  );
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
