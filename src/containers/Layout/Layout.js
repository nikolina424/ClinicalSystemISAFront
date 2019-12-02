import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import classes from './Layout.css';
import axios from '../../axios-objects';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import {updateObject} from '../../shared/utility';
import * as actions from '../../store/actions/index';

class Layout extends Component {

    state = {
        object: {
            name: '',
            title: ''
        }
    }

    objectHandler = (event) => {
        event.preventDefault();

        const data = {
            ...this.state.object
        }
        
        this.props.onAddObject(data);
    }

    inputChangehandler = (event, type) => {
        let updatedObject = updateObject(this.state.object, {
            [type]: event.target.value});

        this.setState({object: updatedObject});
    }

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
        added: state.object.added,
        logged: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddObject: (data) => dispatch(actions.addObject(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout, axios);