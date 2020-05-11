import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import firebase from 'firebase/app';
import 'firebase/auth';
import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import * as ROUTES from '../../constants/routes';

const RoundedTextField = withStyles((theme) => ({
  root: {
    '& fieldset': {
      borderRadius: 30,
    },
    '& input': {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  },
}))(TextField);

const RoundedButton = withStyles((theme) => ({
  root: {
    borderRadius: 30,
    height: theme.typography.fontSize * 3,
    margin: theme.spacing(3, 0, 2),
    textTransform: 'none',
    width: '50%',
  },
}))(Button);

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -8,
    marginLeft: -8,
  },
  linksWrapper: {
    marginTop: 15,
  },
  welcome: {
    marginBottom: 30,
  },
});

export default function SignInForm({ setError }) {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(() => {
    setLoading(true);
    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [email, password, setError]);

  const isInvalid = useMemo(() => password === '' || email === '',
    [email, password]);

  return (
    <Container className={classes.container}>
      <Typography variant="h4" className={classes.welcome}>Welcome back</Typography>
      <FormControl>
        <RoundedTextField
          autoFocus
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={({ target: { value } }) => setEmail(value)}
          disabled={loading}
        />
        <RoundedTextField
          className={classes.textField}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={({ target: { value } }) => setPassword(value)}
          disabled={loading}
        />
        <div className={classes.buttonWrapper}>
          <RoundedButton
            variant="contained"
            color="primary"
            disabled={isInvalid || loading}
            onClick={handleSubmit}
          >
            Sign In
          </RoundedButton>
          {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>
        <Grid container justify="space-between" className={classes.linksWrapper}>
          <Link href={ROUTES.SIGN_UP}>
            <em>Sign up (devo)</em>
          </Link>
          <Link href={ROUTES.PASSWORD_FORGET}>
            <em>Forgot password?</em>
          </Link>
        </Grid>

      </FormControl>
    </Container>
  );
}

SignInForm.propTypes = {
  setError: PropTypes.func.isRequired,
};
