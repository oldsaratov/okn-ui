import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import history from './history';
import Auth from './pages/Auth';
import Home from './pages/Home';
import List from './pages/List';
import ObjectShow from './pages/ObjectShow';
import Header from './components/Header';

import './App.css';

const App = () => {
    return (
        <div className="app">
            <Router history={history}>
                <div>
                    <Header/>
                    <Switch>
                        <Route path="/auth" exact component={Auth}/>
                        <Route path="/" exact component={Home}/>
                        <Route path="/objects" exact component={List}/>
                        <Route path="/objects/:id" exact component={ObjectShow}/>
                    </Switch>
                </div>
            </Router>
        </div>
    );
};

export default App;
