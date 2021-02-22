import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './util/styles/css/index.css';
import App from './App';

import * as serviceWorker from './serviceWorker';



import {createStore,applyMiddleware } from 'redux'
import reducer from './redux/reducers'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import dotenv from 'dotenv'
dotenv.config()

const store = createStore(reducer,applyMiddleware(thunk))

ReactDOM.render(
  <React.StrictMode>
	<Provider store={store}>
    <App />
	</Provider>
  </React.StrictMode>
  ,
  document.getElementById('root')
);

serviceWorker.unregister();
