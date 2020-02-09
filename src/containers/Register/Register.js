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
            },
            validation: false,
            validate: {
                firstNameV: false,
                lastNameV: false,
                emailV: false,
                passwordV: false,
                repeatPasswordV: false,
                addressV: false,
                cityV: false,
                countryV: false,
                phoneNumberV: false,
                userIdV: false
            }
        }
    }

    validateHandler = (type) => {
        let updatedObject = updateObject(this.state.validate, {
            [type]: true
        });
        this.setState({validate: updatedObject});
        this.setState({validation: true});
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
        const {firstNameV, lastNameV, emailV, passwordV, repeatPasswordV, addressV, cityV, countryV, phoneNumberV, userIdV} = this.state.validate;
        let val = {
            firstNameV,
            lastNameV,
            emailV,
            passwordV,
            repeatPasswordV,
            addressV,
            cityV,
            countryV,
            phoneNumberV,
            userIdV
        }
        if (reg.firstName === '')
            val.firstNameV = true;
        if (reg.lastName === '')
            val.lastNameV = true;
        if (reg.email === '')
            val.emailV = true;
        if (reg.password === '')
            val.passwordV = true;
        if (reg.repeatPassword === '')
            val.repeatPasswordV = true;
        if (reg.address === '')
            val.addressV = true;
        if (reg.city === '')
            val.cityV = true;
        if (reg.country === '')
            val.countryV = true;
        if (reg.phoneNumber === null)
            val.phoneNumberV = true;
        if (reg.userId === null)
            val.userIdV = true;

        this.setState({validate: val});

        try {
            const response = await axios.post('/register', reg);
            if (response)
                this.props.history.push('/');
        } catch(err) {
            this.setState({validation: true});
            console.log(err);
        }
    };

    inputChangeHandler = (event, type) => {
        let updatedObject = updateObject(this.state.auth, {
            [type]: event.target.value
        });

        this.setState({auth: updatedObject});

        let updatedObject2 = updateObject(this.state.validate, {
            [type] : false
        })
        this.setState({validate: updatedObject2});
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
                        {this.state.validate.firstNameV ? 
                        <input type="text" className="fadeIn first" name="firstName" placeholder="First name"
                            onChange={(event) => this.inputChangeHandler(event, 'firstNameV')} style={{borderColor: 'red'}} /> :
                        <input type="text" className="fadeIn first" name="firstName" placeholder="First name"
                            onChange={(event) => this.inputChangeHandler(event, 'firstName')}/> }

                        {this.state.validate.lastNameV ? 
                        <input type="text" className="fadeIn second" name="lastName" placeholder="Last name"
                            onChange={(event) => this.inputChangeHandler(event, 'lastNameV')} style={{borderColor: 'red'}} /> :
                        <input type="text" className="fadeIn second" name="lastName" placeholder="Last name"
                            onChange={(event) => this.inputChangeHandler(event, 'lastName')}/> }

                        {this.state.validate.emailV ? 
                        <input type="text" className="fadeIn third" name="email" placeholder="Email"
                            onChange={(event) => this.inputChangeHandler(event, 'emailV')} style={{borderColor: 'red'}} /> :
                        <input type="text" className="fadeIn third" name="email" placeholder="Email"
                            onChange={(event) => this.inputChangeHandler(event, 'email')}/> }

                        {this.state.validate.passwordV ? 
                        <input type="password" className="fadeIn fourth" name="password" placeholder="Password"
                            onChange={(event) => this.inputChangeHandler(event, 'passwordV')} style={{borderColor: 'red'}} /> :
                        <input type="password" className="fadeIn fourth" name="password" placeholder="Password"
                            onChange={(event) => this.inputChangeHandler(event, 'password')}/> }

                        {this.state.validate.repeatPasswordV ? 
                        <input type="password" className="fadeIn fifth" name="repeatPassword" placeholder="Repeat password"
                            onChange={(event) => this.inputChangeHandler(event, 'repeatPasswordV')} style={{borderColor: 'red'}} /> :
                        <input type="password" className="fadeIn fifth" name="repeatPassword" placeholder="Repeat password"
                            onChange={(event) => this.inputChangeHandler(event, 'repeatPassword')}/> }

                        {this.state.validate.addressV ? 
                        <input type="text" className="fadeIn sixth" name="address" placeholder="Address"
                            onChange={(event) => this.inputChangeHandler(event, 'addressV')} style={{borderColor: 'red'}} /> :
                        <input type="text" className="fadeIn sixth" name="address" placeholder="Address"
                            onChange={(event) => this.inputChangeHandler(event, 'address')}/> }

                        {this.state.validate.cityV ? 
                        <input type="text" className="fadeIn seventh" name="city" placeholder="City"
                            onChange={(event) => this.inputChangeHandler(event, 'cityV')} style={{borderColor: 'red'}} /> :
                        <input type="text" className="fadeIn seventh" name="city" placeholder="City"
                            onChange={(event) => this.inputChangeHandler(event, 'city')}/> }

                        {this.state.validate.countryV ? 
                        <input type="text" className="fadeIn eighth" name="country" placeholder="Country"
                            onChange={(event) => this.inputChangeHandler(event, 'countryV')} style={{borderColor: 'red'}} /> :
                        <input type="text" className="fadeIn eighth" name="country" placeholder="Country"
                            onChange={(event) => this.inputChangeHandler(event, 'country')}/> }

                            <br></br>
                            <br></br>

                        {this.state.validate.phoneNumberV ? 
                        <input type="number" className="fadeIn nineth inputNumber" name="phoneNumber" placeholder="Phone number"
                            onChange={(event) => this.inputChangeHandler(event, 'phoneNumberV')} style={{borderColor: 'red'}} /> :
                        <input type="number" className="fadeIn nineth inputNumber" name="phoneNumber" placeholder="Phone number"
                            onChange={(event) => this.inputChangeHandler(event, 'phoneNumber')}/> }

                            <br></br>
                            <br></br>

                        {this.state.validate.userIdV ? 
                        <input type="number" className="fadeIn tenth inputNumber" name="userId" placeholder="User ID"
                        onChange={(event) => this.inputChangeHandler(event, 'userIdV')} style={{borderColor: 'red'}} /> :
                        <input type="number" className="fadeIn tenth inputNumber" name="userId" placeholder="User ID"
                            onChange={(event) => this.inputChangeHandler(event, 'userId')}/> }

                            <br></br>
                            <br></br>
                        <select className="fadeIn eleventh" onChange={(event) => this.selectChangeHandler(event)}>
                            <option> Patient </option>
                            <option> Doctor </option>
                            <option> Nurse </option>
                        </select>
                        <br></br>
                        <br></br>
                        <input type="submit" className="fadeIn twelveth" value="Register" style={{cursor: 'pointer'}}
                            onClick={(event) => this.registerHandler(event)} />
                    </form>
                    <div id="formFooter">
                        {this.state.validation ? <p style={{color: 'red'}} >Invalide input fields! Please fill every field!</p> : null}
                        <a>Register and enjoy our <p className="aRegister underlineHover" 
                        onClick={() => this.props.history.push('/')}>Website </p>!</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;