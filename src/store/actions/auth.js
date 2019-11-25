import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios-objects';

export const registerSuccess = (token, userId) => {
    return {
        type: actionTypes.SIGN_UP,
        userToken: token,
        userId: userId
    }
}

export const loginSuccess = (token, userId) => {
    return {
        type: actionTypes.LOG_IN,
        userToken: token,
        userId: userId
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
                dispatch(registerSuccess(response.data.idToken, response.data.localId));
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
                console.log("Login response");
                console.log(response);
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                sessionStorage.setItem('token', response.data.accessToken);
                sessionStorage.setItem('expirationDate', expirationDate);
                //sessionStorage.setItem('userId', response.data.localId);
                dispatch(loginSuccess(response.data.idToken, response.data.localId));
            })
            .catch(err => {
                console.log(err);
            });
    };
};