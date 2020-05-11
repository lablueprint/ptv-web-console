import { Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import 'firebase/auth';
import React, { useState } from 'react';
import Logo from '../../assets/PTV Logo.png';
import SignInForm from './SignInForm';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100vw',
    height: '100vh',
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    alignItems: 'center',
  },
  paperMid: {
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    height: '100%',
    width: '60%',
    backgroundColor: theme.palette.secondary.main,
    display: 'flex',
  },
  paperTop: {
    padding: theme.spacing(8),
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    height: '100%',
    width: '97%',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1,
  },
  logoSubtitle: {
    color: 'white',
    marginTop: 35,
  },
}));

export default function SignInPage() {
  const classes = useStyles();

  const [error, setError] = useState(null);

  return (
    <div className={classes.container}>
      <Paper elevation={9} className={classes.paperMid}>
        <Paper elevation={9} className={classes.paperTop}>
          <SignInForm setError={setError} />
          {error && <Typography color="error">{error.message}</Typography>}
        </Paper>
      </Paper>
      <div className={classes.logoContainer}>
        <img src={Logo} alt="PTV Web Console" />
        <Typography variant="h6" className={classes.logoSubtitle}>Web Console</Typography>
      </div>
    </div>
  );
}
