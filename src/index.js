import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { ConfigProvider } from 'antd';
import ruRu from 'antd/es/locale/ru_RU';

import App from './App';
import reducers from './reducers';

import './index.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
    <Provider store={store}>
        <ConfigProvider locale={ruRu}>
            <App/>
        </ConfigProvider>
    </Provider>,
    document.getElementById('root')
);
