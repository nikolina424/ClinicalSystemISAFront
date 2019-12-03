import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
    scheduledSurgery: false,
    scheduledExamination: false
};

const scheduleStart = (state, action) => {
    return updateObject(state, {
        scheduledSurgery: false,
        scheduledExamination: false
    });  
};

const scheduledSurgery = (state, action) => {
    return updateObject(state, {
        scheduledSurgery: true
    });
};

const scheduledExamination = (state, action) => {
    return updateObject(state, {
        scheduledExamination: true
    });
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SCHEDULE_START:
            return scheduleStart(state, action);
        case actionTypes.ADD_SURGERY:
            return scheduledSurgery(state, action);
        case actionTypes.ADD_EXAMINATION:
            return scheduledExamination(state, action);
        default:
            return state;
    }
};

export default reducer;