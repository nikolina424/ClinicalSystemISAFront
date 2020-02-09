import React from 'react';
import {updateObject} from '../../shared/utility';
import './Login.css';
import axios from '../../axios-objects';
import jwt_decode from 'jwt-decode';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';

class Login extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            auth: {
                email: '',
                password: ''
            },
            validation: false
        }
    }

    loginHandler = async (event) => {
        event.preventDefault();
        const { email, password } = this.state.auth;
        const user = {
            email,
            password
        };

        try {
            const response = await axios.post('/login', user);
            if (response) {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                sessionStorage.setItem('token', response.data.accessToken);
                const jwtToken = jwt_decode(response.data.accessToken);
                sessionStorage.setItem('firstTimeLogged', response.data.firstTimeLogged);
                sessionStorage.setItem('role', jwtToken.role);
                sessionStorage.setItem('expirationDate', expirationDate);
                if (sessionStorage.getItem('firstTimeLogged') === 'true')
                    this.props.history.push('/changePassword')
                else 
                    this.props.history.push('/');
            }
        } catch(err) {
            this.setState({validation: true});
            console.log(err);
        }
    }

    inputChangeHandler = (event, type) => {
        let auth = updateObject(this.state.auth, {
            [type]: event.target.value
        });

        this.setState({auth});
        this.setState({validation: false});
    }

    render() {
        return (
            <div className="wrapper fadeInDown">
                <div id="formContent">
                    <form>
                        {this.state.validation ?
                        <Auxiliary>
                            <input type="text" id="login" className="fadeIn second" name="login" placeholder="email"
                            onChange={(event) => this.inputChangeHandler(event, 'email')} style={{borderColor: 'red'}} />
                            <input type="password" id="password" className="fadeIn third" name="login" placeholder="password"
                            onChange={(event) => this.inputChangeHandler(event, 'password')} style={{borderColor: 'red'}} />
                        </Auxiliary>    
                        : 
                        <Auxiliary>
                            <input type="text" id="login" className="fadeIn second" name="login" placeholder="email"
                            onChange={(event) => this.inputChangeHandler(event, 'email')} />
                            <input type="password" id="password" className="fadeIn third" name="login" placeholder="password"
                            onChange={(event) => this.inputChangeHandler(event, 'password')} />
                        </Auxiliary>}
                        <input type="submit" className="fadeIn fourth" value="Sign in" style={{cursor: 'pointer'}}
                            onClick={(event) => this.loginHandler(event)} />
                    </form>
                    <div id="formFooter">
                        {this.state.validation ? <p style={{color: 'red'}} >Invalide email or password !</p> : null}
                        <a>Don't have an account? <p className="aRegister underlineHover" 
                        onClick={() => this.props.history.push('/register')}>Register </p> now!</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;