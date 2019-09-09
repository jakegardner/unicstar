import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';
import PostList from './components/PostList';

function App() {
  return (
    <div className="App">
      <Header />
      <div>
        <Switch>
          <Route exact path="/" component={PostList} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
