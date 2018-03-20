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

// Get user from backend, dispatch in Redux and render App
initApp();

registerServiceWorker();

function initApp() {
  return getUserRep()
    .then(user => {
      store.dispatch(saveUser(user));
      render();
    })
    .catch(err => console.error(err.message));
}

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>
    , document.getElementById('root')
  );
}
