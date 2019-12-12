import React, {Component} from 'react';
import {connect} from 'react-redux';
import classes from './Layout.css';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';

class Layout extends Component {

    pageHandler = (page) => {
        this.props.history.push(page);
    }

    render() {
        let scheduleButton = null;
        let regButton = null;
        let logButton = null;
        let patientListButton = null;

        if (sessionStorage.getItem('token') != null || this.props.logged)
        scheduleButton = (<button className={classes.Button} onClick={() => this.pageHandler("/schedule")}>Schedule</button>);

        if (sessionStorage.getItem('token') == null && !this.props.logged) {
            regButton = (<button className={classes.Button} onClick={() => this.pageHandler("/register")}>Register</button>);
            logButton = (<button className={classes.Button} onClick={() => this.pageHandler("/login")}>Login</button>);
        }

        if (sessionStorage.getItem('token') != null && sessionStorage.getItem('role') === 'DOCTOR') {
            patientListButton = (<button className={classes.Button} onClick={() => this.pageHandler("/patientList")}>Patients</button>);
        }

        return (
            <Auxiliary>
                {scheduleButton}
                {patientListButton}
                {logButton}
                {regButton}
                {sessionStorage.getItem('token') !== null ? <button className={classes.Button} onClick={() => this.pageHandler("/profile")}>Profile</button> : null};
            </Auxiliary>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        logged: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);