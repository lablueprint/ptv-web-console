import 'typeface-roboto';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import App from './components/App';
import * as serviceWorker from './serviceWorker';


const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Poppins',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  roundness: 20,
  palette: {
    primary: {
      main: '#1F7FC0',
    },
    secondary: {
      main: '#E6EFF5',
    },
    text: {
      main: '#194261',
    },
    accent: {
      main: '#8EAEC3',
    },
  },
  fonts: {
    primary: 'Poppins',
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>, document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
