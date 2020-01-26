import React from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import '../../bootstrap/bootstrap.css';
import './Layout.css';
import Navigation from '../Navigation/Navigation';

class Layout extends React.PureComponent {
    render() {
        return (
           <Auxiliary>
               <Navigation />
               {sessionStorage.getItem('token') === null ? <img alt="doctors" className={`doctor`} src="../images/doctors.jpg" /> :
               <div className="containerC">
                   <img alt="Clinic Center" src="../images/clinic.png" className="clinic" />
                   <div className="contentC">
                       <h1 className="welcome">Welcome!</h1>
                       <p className="text">We are here for you :)</p>
                   </div>
               </div> }

                {sessionStorage.getItem('token') === null ? 
                <p className={`p`} >
                    Welcome!
                   <br></br>
                    We are here to promote and improve the quality of life by providing integrated healthcare services to the entire community. Feel free to join us!
                </p> : null }

            </Auxiliary>
        );
    }
}

export default Layout;