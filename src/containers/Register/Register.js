import React, {Component} from 'react';
import {connect} from 'react-redux';
import classes from './Register.css';
import * as actions from '../../store/actions/index';
import {updateObject} from '../../shared/utility';

class Register extends Component {

    state = {
        auth: {
            email: '',
            password: '',
            repeatPassword: '',
            firstName: '',
            lastName: '',
            address: '',
            city: '',
            country: '',
            phoneNumber: null,
            userId: null,
            role: ''
        }
    }

    registerHandler = (event) => {
        event.preventDefault();
        this.props.onRegister(this.state.auth.email, this.state.auth.password, this.state.auth.repeatPassword, 
            this.state.auth.firstName, this.state.auth.lastName, this.state.auth.address, this.state.auth.city, 
            this.state.auth.country, this.state.auth.phoneNumber, this.state.auth.userId, this.state.auth.role);
    };

    inputChangeHandler = (event, type) => {
        let updatedObject = updateObject(this.state.auth, {
            [type]: event.target.value
        });

        this.setState({auth: updatedObject});
    }

    selectChangeHandler = (event) => {
        let updatedObject = updateObject(this.state.auth, {
            role: event.target.value
        });

        this.setState({auth: updatedObject});
    }

    render() {
        return (
            <div>
                <input type="email" className={classes.Input} placeholder="Email"
                    onChange={(event) => this.inputChangeHandler(event, 'email')} />
                <input type="password" className={classes.Input} placeholder="Password"
                    onChange={(event) => this.inputChangeHandler(event, 'password')} />
                <input type="password" className={classes.Input} placeholder="Repeat Password"
                    onChange={(event) => this.inputChangeHandler(event, 'repeatPassword')} />
                <input type="text" className={classes.Input} placeholder="First Name"
                    onChange={(event) => this.inputChangeHandler(event, 'firstName')} />
                <input type="text" className={classes.Input} placeholder="Last Name"
                    onChange={(event) => this.inputChangeHandler(event, 'lastName')} />
                <input type="text" className={classes.Input} placeholder="Address"
                    onChange={(event) => this.inputChangeHandler(event, 'address')} />
                <input type="text" className={classes.Input} placeholder="City"
                    onChange={(event) => this.inputChangeHandler(event, 'city')} />
                <input type="text" className={classes.Input} placeholder="Country"
                    onChange={(event) => this.inputChangeHandler(event, 'country')} />
                <input type="number" className={classes.Input} placeholder="Phone Number"
                    onChange={(event) => this.inputChangeHandler(event, 'phoneNumber')} />
                <input type="number" className={classes.Input} placeholder="ID"
                    onChange={(event) => this.inputChangeHandler(event, 'id')} />
                <select className={classes.Input} onChange={(event) => this.selectChangeHandler(event)}>
                    <option> Doctor </option>
                    <option> Patient </option>
                    <option> Nurse </option>
                </select>
                <button className={classes.Button} 
                    onClick={(event) => this.registerHandler(event)}>Register</button>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRegister: (email, password, repeatPassword, firstName, lastName, address, city, country, phoneNumber, userId, role) => 
            dispatch(actions.register(email, password, repeatPassword, firstName, lastName, address, city, country, phoneNumber, userId, role))
    }
};

export default connect(null, mapDispatchToProps)(Register);