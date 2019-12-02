import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
    scheduledSurgery: false
};

const scheduleStart = (state, action) => {
    return updateObject(state, {
        scheduledSurgery: false
    });  
};

const scheduledSurgery = (state, action) => {
    return updateObject(state, {
        scheduledSurgery: true
    });
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SCHEDULE_START:
            return scheduleStart(state, action);
        case actionTypes.ADD_SURGERY:
            return scheduledSurgery(state, action);
        default:
            return state;
    }
};

export default reducer;