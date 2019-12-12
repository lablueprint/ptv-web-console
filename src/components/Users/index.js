import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Firebase, { withFirebase } from '../Firebase';
import UsersList from './UsersList';

const INITIAL_STATE = {
  users: [],
  error: null,
};

class UsersPage extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  componentDidMount() {
    const { firebase } = this.props;
    firebase
      .users()
      .get()
      .then((snapshot) => {
        this.setState({
          users: snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
        });
      })
      .catch((error) => {
        this.setState({ error });
      });
  }

  render() {
    const { users, error } = this.state;
    return (
      <div>
        <h1>Users</h1>
        {error && <p>error.message</p>}
        <UsersList users={users} />
      </div>
    );
  }
}

UsersPage.propTypes = {
  firebase: PropTypes.instanceOf(Firebase).isRequired,
};

export default withFirebase(UsersPage);

export { UsersList };
