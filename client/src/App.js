import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/layout/Home/Home';
import Navbar from './components/layout/Navbar/Navbar';
import Signup from './components/admin/Signup/Signup';
import Signin from './components/admin/Signin/Signin';

import { Provider } from 'react-redux';
import store from './store';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className='App-container'>
        <Router>
          <Navbar />
          <Route exact path='/' component={Home} />
          <Switch>
            <Route exact path='/register' component={Signup} />
            <Route exact path='/login' component={Signin} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
