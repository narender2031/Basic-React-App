import React from 'react';
import {render} from 'react-dom';
import {Provider} from  'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './redux/reducers'
import notificationMiddleware from './redux/middleware/notification'
import App from './containers/App';
import './index.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(notificationMiddleware()))
)

render(
    <Provider store={store}>
        <App /> 
    </Provider>,
    document.getElementById('root')
);
