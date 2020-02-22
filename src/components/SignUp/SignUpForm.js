import React, { Component } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import Firebase, { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import ROLES from '../../constants/roles';

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  role: '',
  error: null,
};

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    const { email, passwordOne, role } = this.state;
    const { firebase, history } = this.props;

    firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((authUser) => firebase.user(authUser.user.uid).set({
        email,
        role,
      }))
      .then(() => {
        this.setState(INITIAL_STATE);
        history.push(ROUTES.HOME);
      })
      .catch((error) => {
        this.setState({ error });
      });

    event.preventDefault();
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      role,
      error,
    } = this.state;

    const isInvalid = passwordOne !== passwordTwo
      || passwordOne === ''
      || email === ''
      || username === ''
      || role === '';

    const roleRadioButtons = Object.entries(ROLES).map((kv, i) => (
      <label htmlFor={i}>
        <input
          name="role"
          id={i}
          key={kv[0]}
          type="radio"
          onChange={this.onChange}
          value={kv[0]}
        />
        {kv[0]}
      </label>
    ));

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        />
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
        {roleRadioButtons}
        <button disabled={isInvalid} type="submit">
          Sign Up
        </button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

SignUpForm.propTypes = {
  firebase: PropTypes.instanceOf(Firebase).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withFirebase(withRouter(SignUpForm));
