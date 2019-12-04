import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
    patients: []
};

const getPatients = (state, action) => {
    return updateObject(state, {
        patients: action.patients
    });
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.GET_PATIENTS:
            return getPatients(state, action);
        default:
            return state;
    }
};

export default reducer;