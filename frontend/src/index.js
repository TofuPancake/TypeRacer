import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { AppContextProvider } from './AppContextProvider';
import {createMuiTheme, ThemeProvider} from '@material-ui/core';
import {unstable_createMuiStrictModeTheme} from '@material-ui/core';

const createTheme = process.env.NODE_ENV === 'production' ? createMuiTheme : unstable_createMuiStrictModeTheme;
const theme = createTheme({
  // this theme is created to get rid of the error caused by material ui using a deprecated DOM
  // library that is disallowed by strict mode.
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
