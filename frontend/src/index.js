import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';

import 'typeface-roboto';
import './index.css';

import App from './components/App';
import store from './store';
import { saveUser } from './redux/user/actionCreators';
import { getUser as getUserRep } from "./repository/users.repository";
import socket from './services/sockets';

// Get user from backend, dispatch in Redux and render App
initApp();

registerServiceWorker();

function initApp() {
  getJWTFromUrl();

  return getUser()
    .then(() => {
      render();
      socket.on('STATUS_CHANGED', () => {
        getUser();
      });
    })
    .catch(err => console.error(err.message));
}

function getUser() {
  return new Promise ((resolve, reject) => {
    return getUserRep()
      .then(user => store.dispatch(saveUser(user)))
      .then(resolve(true))
      .catch(err => reject(err.message));
  })
}

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>
    , document.getElementById('root')
  );
}

function getJWTFromUrl() {
  const url = new URL(document.location.href);
  const jwt = url.searchParams.get("token");
  if (jwt) {
    // Process JWT
    localStorage.setItem('token', jwt);
  }
}
