import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './pages/Home';
import List from './pages/List';
import Header from './components/Header';

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <div>
          <Header />
          <Route path="/" exact component={Home} />
          <Route path="/list" exact component={List} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
