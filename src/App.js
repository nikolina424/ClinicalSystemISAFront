import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import Orders from './components/Orders/Orders';
import {Switch, Route} from 'react-router-dom';
import Register from './containers/Register/Register';
import Login from './containers/Login/Login';
import ChangePassword from './containers/ChangePassword/ChangePassword';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/" exact component={Layout} />
          <Route path="/orders" component={Orders} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/changePassword" component={ChangePassword} />
        </Switch>
      </div>
    );
  }
}

export default App;
