import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/layout/Home/Home';
import Navbar from './components/layout/Navbar/Navbar';
import Signup from './components/admin/Signup/Signup';
import Signin from './components/admin/Signin/Signin';
import Alert from './components/layout/Alert/Alert';

import { Provider } from 'react-redux';
import store from './store';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Route exact path='/' component={Home} />
        <section className='App-container'>
          <Alert />
          <Switch>
            <Route exact path='/register' component={Signup} />
            <Route exact path='/login' component={Signin} />
          </Switch>
        </section>
      </Router>
    </Provider>
  );
}

export default App;
