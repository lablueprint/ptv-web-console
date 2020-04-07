import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import firebase from 'firebase/app';
import 'firebase/auth';
import React, { useCallback, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>
      {' '}
      {new Date().getFullYear()}
      .
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  wrapper: {
    position: 'relative',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -8,
    marginLeft: -8,
  },
}));

const INITIAL_FORM_STATE = {
  email: '',
  password: '',
};

export default function LandingPage() {
  const classes = useStyles();

  const [formState, setFormState] = useState(INITIAL_FORM_STATE);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const history = useHistory();

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    setLoading(true);
    const { email, password } = formState;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        history.push(ROUTES.HOME);
        setLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setLoading(false);
      });
  }, [formState, history]);

  const handleChange = useCallback((event) => {
    event.preventDefault();
    setFormState(
      {
        ...formState,
        [event.target.name]: event.target.value,
      },
    );
  }, [formState]);

  const isInvalid = useMemo(() => formState.password === '' || formState.email === '',
    [formState.email, formState.password]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formState.email}
            onChange={handleChange}
            disabled={loading}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formState.password}
            onChange={handleChange}
            disabled={loading}
          />
          <div className={classes.wrapper}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={isInvalid || loading}
              onClick={handleSubmit}
            >
              Sign In
            </Button>
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </div>
          {errorMessage && <Typography>{errorMessage}</Typography>}
          <Grid container>
            <Grid item xs>
              <Link href={ROUTES.PASSWORD_FORGET}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href={ROUTES.SIGN_UP}>
                Don&apos;t have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
