import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import history from './history';
import Auth from './pages/Auth';
import Home from './pages/home/Home';
import ObjectCreate from './pages/ObjectCreate';
import ObjectEdit from './pages/ObjectEdit';
import ObjectShow from './pages/ObjectShow';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';

import './App.scss';

const App = () => {
    return (
        <div className="app">
            <Router history={history}>
                <div>
                    <Header/>
                    <Switch>
                        <Route path="/auth" exact component={Auth}/>
                        <Route path="/" exact component={Home}/>
                        <PrivateRoute path="/objects/new" exact component={ObjectCreate}/>
                        <PrivateRoute path="/objects/edit/:id" exact component={ObjectEdit}/>
                        <Route path="/objects/:id" exact component={ObjectShow}/>
                    </Switch>
                </div>
            </Router>
        </div>
    );
};

export default App;
