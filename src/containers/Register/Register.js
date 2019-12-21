import React from 'react';
import {updateObject} from '../../shared/utility';
import axios from '../../axios-objects';

class Register extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            auth: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                repeatPassword: '',
                address: '',
                city: '',
                country: '',
                phoneNumber: null,
                userId: null,
                role: 'Patient'
            }
        }
    }

    registerHandler = async (event) => {
        event.preventDefault();
        const {firstName, lastName, email, password, repeatPassword, address, city, country, phoneNumber, userId, role} = this.state.auth;
        const reg = {
            firstName,
            lastName,
            email,
            password,
            repeatPassword,
            address,
            city,
            country,
            phoneNumber,
            userId,
            role : role.toUpperCase(),
            returnSecureToken: true
        };

        try {
            const response = await axios.post('/register', reg);
            if (response)
                this.props.history.push('/');
        } catch(err) {
            console.log(err);
        }
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
            <div className="wrapper fadeInDown">
                <div id="formContent">
                    <form>
                        <input type="text" className="fadeIn first" name="firstName" placeholder="First name"
                        onChange={(event) => this.inputChangeHandler(event, 'firstName')}/>
                        <input type="text" className="fadeIn second" name="lastName" placeholder="Last name"
                        onChange={(event) => this.inputChangeHandler(event, 'lastName')}/>
                        <input type="text" className="fadeIn third" name="email" placeholder="Email"
                            onChange={(event) => this.inputChangeHandler(event, 'email')}/>
                        <input type="password" className="fadeIn fourth" name="password" placeholder="Password"
                            onChange={(event) => this.inputChangeHandler(event, 'password')}/>
                        <input type="password" className="fadeIn fifth" name="repeatPassword" placeholder="Repeat password"
                            onChange={(event) => this.inputChangeHandler(event, 'repeatPassword')}/>
                        <input type="text" className="fadeIn sixth" name="address" placeholder="Address"
                            onChange={(event) => this.inputChangeHandler(event, 'address')}/>
                        <input type="text" className="fadeIn seventh" name="city" placeholder="City"
                            onChange={(event) => this.inputChangeHandler(event, 'city')}/>
                        <input type="text" className="fadeIn eighth" name="country" placeholder="Country"
                            onChange={(event) => this.inputChangeHandler(event, 'country')}/>
                        <input type="number" className="fadeIn nineth inputNumber" name="phoneNumber" placeholder="Phone number"
                            onChange={(event) => this.inputChangeHandler(event, 'phoneNumber')}/>
                        <input type="number" className="fadeIn tenth inputNumber" name="userId" placeholder="JMBG"
                            onChange={(event) => this.inputChangeHandler(event, 'userId')}/>
                        <select className="fadeIn eleventh" onChange={(event) => this.selectChangeHandler(event)}>
                            <option> Patient </option>
                            <option> Doctor </option>
                            <option> Nurse </option>
                        </select>
                        <input type="submit" className="fadeIn twelveth" value="Register" style={{cursor: 'pointer'}}
                            onClick={(event) => this.registerHandler(event)} />
                    </form>
                    <div id="formFooter">
                        <a>Register and enjoy our website!</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;