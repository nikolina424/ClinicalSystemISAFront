import React, {Component} from 'react';
import {connect} from 'react-redux';
import classes from './Login.css';
import * as actions from '../../store/actions/index';
import {updateObject} from '../../shared/utility';

class Login extends Component {

    state = {
        auth: {
            email: '',
            password: ''
        }
    }

    loginHandler = (event) => {
        event.preventDefault();
        this.props.onLogin(this.state.auth.email, this.state.auth.password);
        this.props.history.push("/");
    }

    inputChangeHandler = (event, type) => {
        let updatedObject = updateObject(this.state.auth, {
            [type]: event.target.value
        });

        this.setState({auth: updatedObject});
    }

    render() {
        return (
            <div>
                <input type="email" className={classes.Input} 
                    onChange={(event) => this.inputChangeHandler(event, 'email')} />
                <input type="password" className={classes.Input} 
                    onChange={(event) => this.inputChangeHandler(event, 'password')} />
                <button className={classes.Button} 
                    onClick={(event) => {this.loginHandler(event)}}
                >Log in</button>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (email, password) => dispatch(actions.login(email, password))
    }
};

export default connect(null, mapDispatchToProps)(Login);