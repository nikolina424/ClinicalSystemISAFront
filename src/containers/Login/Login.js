import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import {updateObject} from '../../shared/utility';
import classes from '../../bootstrap/bootstrap.css';
import classNames from 'classnames/bind';

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
            }, 50);
        });

        const processDataAsycn = async () => {
            let data = await getDataPromise();
            data = await getDataPromise(data);
            return data;
        };

        processDataAsycn().then((data) => {
            if (sessionStorage.getItem('firstTimeLogged') === 'true' && (sessionStorage.getItem('role') === 'ADMINC' || sessionStorage.getItem('role') === 'ADMINCC'))
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
        var liClasses = classNames({
            [classes.btn]: true,
            [classes.btnLg]: true,
            [classes.btnPrimary]: true,
            [classes.btnBlock] : true
        });

        return (
            <form className={classes.formSignin}>
                <input type="email" className={classes.formControl}
                    onChange={(event) => this.inputChangeHandler(event, 'email')} />
                <input type="password" className={classes.formControl}
                    onChange={(event) => this.inputChangeHandler(event, 'password')} />
                <button className={liClasses} 
                    onClick={(event) => this.loginHandler(event)}
                >Log in</button>
            </form>
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