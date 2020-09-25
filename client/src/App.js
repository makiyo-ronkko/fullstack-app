import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/layout/Home/Home';
import Navbar from './components/layout/Navbar/Navbar';
import Signup from './components/admin/Signup/Signup';
import Signin from './components/admin/Signin/Signin';
import Gallery from './components/gallery/Gallery';
import Alert from './components/layout/Alert/Alert';

import { Provider } from 'react-redux';
import tokenAuth from './utils/tokenAuth';
import { authUser } from './actions/index';
import store from './store';
import './App.css';

// authUser - action to be activated in main App
// When reload the browser, "AUTH_USER" and token is stored in localStorage
// authenticated to be true
if (localStorage.token) {
  tokenAuth(localStorage.token);
}

function App() {
  // to dispatch {authUser} action, take "store" directly, use method .dispatch()
  // when state updated, useEffect keeps running (constant loop) and stop
  // with second bracket ... }, []); (when loaded, when mounted)
  useEffect(() => {
    store.dispatch(authUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Route exact path='/' component={Home} />
        <section className='App-container'>
          <Alert />
          <Switch>
            <Route exact path='/gallery' component={Gallery} />
            <Route exact path='/register' component={Signup} />
            <Route exact path='/login' component={Signin} />
          </Switch>
        </section>
      </Router>
    </Provider>
  );
}

export default App;
