import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import {Switch, Route} from 'react-router-dom';
import Register from './containers/Register/Register';
import Login from './containers/Login/Login';
import ChangePassword from './containers/ChangePassword/ChangePassword';
import Profile from './components/Profile/Profile';
import PatientList from './components/Doctor/PatientList/PatientList';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/" exact component={Layout} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/changePassword" component={ChangePassword} />
          <Route path="/profile" component={Profile} />
          <Route path="/patientList" component={PatientList} />
        </Switch>
      </div>
    );
  }
}

export default App;
