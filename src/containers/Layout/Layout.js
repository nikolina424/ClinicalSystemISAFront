import React from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import '../../bootstrap/bootstrap.css';
import './Layout.css'

class Layout extends React.PureComponent {

    logoutHandler() {
        sessionStorage.clear();
        window.location.reload();
    }

   
    render() {
        const token = sessionStorage.getItem('token');
        const role = sessionStorage.getItem('role');

        return (
           <Auxiliary>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
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
                
                <img alt="doctors" className={`doctor`} src="../images/doctors.jpg"  />

                <p className={`p`} >
                    Welcome!
                   <br></br>
                    We are here to promote and improve the quality of life by providing integrated healthcare services to the entire community. Feel free to join us!
                </p>

            </Auxiliary>
);
    }
}

export default Layout;