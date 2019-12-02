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
        const getDataPromise = () => new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.props.onLogin(this.state.auth.email, this.state.auth.password));
            }, 300);
        });

        const processDataAsycn = async () => {
            let data = await getDataPromise();
            return data;
        };

        processDataAsycn().then((data) => {
            if (sessionStorage.getItem('firstTimeLogged') && (sessionStorage.getItem('role') === 'ADMINC' || sessionStorage.getItem('role') === 'ADMINCC'))
                this.props.history.push("/changePassword");
            else
                this.props.history.push("/");
        }).catch(err => {
            console.log(err);
        });
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
                    onClick={(event) => this.loginHandler(event)}
                >Log in</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        firstTime: state.auth.firstTimeLogged
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (email, password) => dispatch(actions.login(email, password))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);