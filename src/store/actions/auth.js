import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios-objects';
import jwt_decode from 'jwt-decode';

export const registerSuccess = () => {
    return {
        type: actionTypes.SIGN_UP
    }
}

export const loginSuccess = (token, role) => {
    return {
        type: actionTypes.LOG_IN,
        userToken: token,
        userRole: role
    }
}

export const changePassSuccess = () => {
    return {
        type: actionTypes.CHANGE_PASSWORD
    }
}

export const register = (email, password, repeatPassword, firstName, lastName, address, city, country, phoneNumber, id, role) => {
    return dispatch => {
        const authData = {
            email: email,
            password: password,
            repeatPassword: repeatPassword,
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            country: country,
            phoneNumber: phoneNumber, 
            userId: id,
            role: role.toUpperCase(),
            returnSecureToken: true
        };
        //const url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyC93NeXpBVN_En7EAvqghEZU63moggPykU';
        const url = '/register';        
        
        if (password === repeatPassword) {
            axios.post(url, authData)
            .then(response => {
                console.log("Register response: " + response);
                //const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                // sessionStorage.setItem('token', response.data.idToken);
                // sessionStorage.setItem('expirationDate', expirationDate);
                // sessionStorage.setItem('userId', response.data.localId);
                dispatch(registerSuccess());
            })
            .catch(err => {
                console.log(err);
            });
        }
    };
};

export const login = (email, password) => {
    return dispatch => {
        const user = {
            email: email,
            password: password
        };
        //const url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyC93NeXpBVN_En7EAvqghEZU63moggPykU';
        const url = '/login';

        axios.post(url, user)
            .then(response => {
                // console.log("Login response");
                // console.log(response);
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                sessionStorage.setItem('token', response.data.accessToken);
                const jwtToken = jwt_decode(response.data.accessToken);
                sessionStorage.setItem('role', jwtToken.role);
                sessionStorage.setItem('expirationDate', expirationDate);
                dispatch(loginSuccess(response.data.accessToken, jwtToken.role));
            })
            .catch(err => {
                console.log(err);
            });
    };
};

export const changePassword = (oldPassword, newPassword, repeatPassword) => {
    return dispatch => {
        const pass = {
            old: oldPassword,
            new: newPassword
        }

        const url = '/changePassword';
        if (newPassword === repeatPassword) {
            axios.put(url, pass) 
                .then(response => {
                    dispatch(changePassSuccess());
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
}