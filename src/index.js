import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import ruRu from 'antd/es/locale/ru_RU';

import App from './App';
import './index.css';

ReactDOM.render(
    <ConfigProvider locale={ruRu}>
        <App />
    </ConfigProvider>,
    document.getElementById('root')
);
