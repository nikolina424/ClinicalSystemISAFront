import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import {Switch, Route} from 'react-router-dom';
import Register from './containers/Register/Register';
import Login from './containers/Login/Login';
import ChangePassword from './containers/ChangePassword/ChangePassword';
import Schedule from './components/Doctor/Schedule/Schedule';
import PatientList from './components/Doctor/PatientList/PatientList';
import Profile from './components/Profile/Profile';
import ListOfClinics from './containers/ListOfClinics/ListOfClinics';
import MedicalRecord from './containers/MedicalRecord/MedicalRecord';
import PrivateRouteLogged from './components/PrivateRoute/PrivateRouteLogged';
import PrivateRouteDoctor from './components/PrivateRoute/PrivateRouteDoctor';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/" exact component={Layout} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <PrivateRouteLogged path="/changePassword" component={ChangePassword} />
          <PrivateRouteDoctor path="/schedule" component={Schedule} />
          <PrivateRouteDoctor path="/patientList" component={PatientList} />
          <PrivateRouteLogged path="/profile" component={Profile} />
          <Route path="/listOfClinics" component={ListOfClinics}/>
          <Route path="/medicalRecord" component={MedicalRecord}/>
        </Switch>
      </div>
    );
  }
}

export default App;
