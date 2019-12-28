import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './pages/Home';
import List from './pages/List';
import ObjectShow from './pages/ObjectShow';
import Header from './components/Header';

import './App.css';

const App = () => {
    return (
        <div className="app">
            <BrowserRouter>
                <div>
                    <Header/>
                    <Route path="/" exact component={Home}/>
                    <Route path="/objects" exact component={List}/>
                    <Route path="/objects/:id" exact component={ObjectShow}/>
                </div>
            </BrowserRouter>
        </div>
    );
};

export default App;
