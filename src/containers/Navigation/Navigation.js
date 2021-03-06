import React from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import '../../bootstrap/bootstrap.css';

class Navigation extends React.PureComponent {

    logoutHandler() {
        sessionStorage.clear();
        window.location.reload();
    }

    render() {
        const token = sessionStorage.getItem('token');
        const role = sessionStorage.getItem('role');

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top navigation">
                        <div className="container">
                            <a className="navbar-brand" 
                            href="/">Home page</a>
                          {token === null ? 
                                <Auxiliary>
                                    <a className="navbar-brand" 
                                    href="/login">Sign in</a>
                                    <a className="navbar-brand" 
                                    href="/register">Sign up</a>
                                </Auxiliary>
                            : null }
                            {(token !== null && role === 'DOCTOR') ?
                                <Auxiliary>
                                    <a className="navbar-brand" 
                                    href="/schedule">Schedule</a>
                                    <a className="navbar-brand"
                                    href="/holiday">Holiday</a>
                                    <a className="navbar-brand"
                                    href="/patientList">Patients</a>
                                    <a className="navbar-brand"
                                    href="/rooms">Rooms</a>
                                </Auxiliary> 
                            : null }
                            {(token !== null && role === 'ADMINCC') ?
                                <Auxiliary>
                                    <a className="navbar-brand"
                                    href="/adminPage">Requests</a>
                                </Auxiliary>
                            : null }
                            {(token !== null && role === 'ADMINC') ?
                                <Auxiliary>
                                    <a className="navbar-brand"
                                    href="/clinic">Clinic</a>
                                    <a className="navbar-brand"
                                    href="/doctors">Doctors</a>
                                    <a className="navbar-brand" 
                                    href="/schedule">Schedule</a>
                                </Auxiliary>
                            : null }
                            {(token !== null && (role === 'ADMINC' || role === 'ADMINCC')) ?
                                <Auxiliary>
                                    <a className="navbar-brand"
                                    href="/rooms">Rooms</a>
                                    <a className="navbar-brand"
                                    href="/appointments">Appointments</a>
                                </Auxiliary>
                            : null }
                            {token !== null ? 
                                <Auxiliary>
                                    <a className="navbar-brand" 
                                    href="/profile">Profile</a>
                                </Auxiliary>
                            : null }
                            {token !== null ?
                                <Auxiliary>
                                    <a className="navbar-brand" style={{cursor: 'pointer'}}
                                    onClick={this.logoutHandler}>Logout</a>
                                </Auxiliary> 
                            : null}
                        </div>
                    </nav>
        );
    }
}

export default Navigation;