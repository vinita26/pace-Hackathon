import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk'
import Router from './router';
import Immutable from 'immutable'
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducer'
import 'materialize-css/dist/css/materialize.min.css';
//import M from 'materialize-css/dist/js/materialize.min.js'

const composeEnhancers =
    typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            serialize: { // prettier-ignore
                immutable: Immutable
            }
        }) : compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))

ReactDOM.render(<Router store={store} />, document.getElementById('root'));

