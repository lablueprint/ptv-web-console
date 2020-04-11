import 'typeface-roboto';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import App from './components/App';
import * as serviceWorker from './serviceWorker';


const theme = createMuiTheme({
  roundness: 20,
  colors: {
    primary: '#1F7FC0',
    accent: '#8EAEC3',
    secondary: '#E6EFF5',
    text: '#194261',
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
