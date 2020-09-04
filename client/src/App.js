import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';

import Login from './components/Login';
import Signup from './components/Signup';
import PostList from './components/PostList';
import CreatePost from './components/CreatePost';

function App() {
  return (
    <ThemeProvider>
      <CSSReset />
      <Switch>
        <Route exact path="/" component={PostList} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/new" component={CreatePost} />
      </Switch>
    </ThemeProvider>
  );
}

export default App;
