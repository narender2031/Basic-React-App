import React from 'react';
import {render} from 'react-dom';
import {Provider} from  'react-redux'
import { createStore } from 'redux'
import PlayerReducer from './redux/reducers/player.js'
import App from './containers/App';
import './index.css';

const store = createStore(
    PlayerReducer,
    window.devToolsExtension && window.devToolsExtension()
)

render(
    <Provider store={store}>
        <App /> 
    </Provider>,
    document.getElementById('root')
);