import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from 'react-redux';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';
import store from './store';

const withStore = Comp => (
    <Provider store={store}>
        <Comp/>
    </Provider>
);

const MOUNT = document.getElementById('root');
const renderApp = Comp => ReactDOM.render(Comp, MOUNT);

if (module.hot) {
    module
        .hot
        .accept('./App', () => {
            const App = require('./App').default
            renderApp(withStore(App))
        })
}

renderApp(withStore(App))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
