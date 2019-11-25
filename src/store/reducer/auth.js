import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
    token: null,
    role: null
}

const userRegister = (state, action) => {
    return updateObject(state);
};

const userLogin = (state, action) => {
    return updateObject(state, {
        token: action.userToken,
        role: action.userRole
    });
}

const userChangedPassword = (state, action) => {
    return updateObject(state);
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SIGN_UP:
            return userRegister(state, action);
        case actionTypes.LOG_IN:
            return userLogin(state, action);
        case actionTypes.CHANGE_PASSWORD:
            return userChangedPassword(state, action);
        default:
            return state;
    }
};

export default reducer;