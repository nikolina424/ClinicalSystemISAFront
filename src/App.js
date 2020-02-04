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
import AdminPage from './components/Admin/AdminPage/AdminPage';
import ConfirmReg from './components/Admin/ConfirmReg/ConfirmReg';
import Holiday from './components/Doctor/Holiday/Holiday';
import Room from './components/Admin/Room/Room';
import Clinic from './components/Admin/Clinic/Clinic';
import PrivateRouteLogged from './components/PrivateRoute/PrivateRouteLogged';
import PrivateRouteDoctor from './components/PrivateRoute/PrivateRouteDoctor';
import PrivateRouteAdmin from './components/PrivateRoute/PrivateRouteAdmin';
import PrivateRouteAdministrator from './components/PrivateRoute/PrivateRouteAdministrator';
import PrivateRouteClinicAdmin from './components/PrivateRoute/PrivateRouteClinicAdmin';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/" exact component={Layout} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/confirm-account" component={ConfirmReg} />
          <PrivateRouteLogged path="/changePassword" component={ChangePassword} />
          <PrivateRouteDoctor path="/schedule" component={Schedule} />
          <PrivateRouteAdmin path="/adminPage" component={AdminPage} />
          <PrivateRouteLogged path="/profile" component={Profile} />
          <PrivateRouteDoctor path="/patientList" component={PatientList} />
          <PrivateRouteDoctor path="/holiday" component={Holiday} />
          <PrivateRouteAdministrator path="/rooms" component={Room} />
          <PrivateRouteClinicAdmin path="/clinic" component={Clinic} />

          <Route path="/listOfClinics" component={ListOfClinics}/>
          <Route path="/medicalRecord" component={MedicalRecord}/>
        </Switch>
      </div>
    );
  }
}

export default App;