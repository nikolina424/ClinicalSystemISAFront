import React, {Component} from 'react';
import {connect} from 'react-redux';
import classes from './Layout.css';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';

class Layout extends Component {

    pageHandler = (page) => {
        this.props.history.push(page);
    }

    render() {
        let profileButton = null;
        let regButton = null;
        let logButton = null;

        if (sessionStorage.getItem('token') != null || this.props.logged)
            profileButton = (<button className={classes.Button} onClick={() => this.pageHandler("/profile")}>Profile</button>);

        if (sessionStorage.getItem('token') == null && !this.props.logged) {
            regButton = (<button className={classes.Button} onClick={() => this.pageHandler("/register")}>Register</button>);
            logButton = (<button className={classes.Button} onClick={() => this.pageHandler("/login")}>Login</button>);
        }

        return (
            <Auxiliary>
                {profileButton}
                {logButton}
                {regButton}
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