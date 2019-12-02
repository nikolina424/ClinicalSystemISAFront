import axios from '../../axios-objects';
import * as actionTypes from './actionTypes';

export const scheduleStart = () => {
    return {
        type: actionTypes.SCHEDULE_START
    };
};

export const addedSurgery = () => {
    return {
        type: actionTypes.ADD_SURGERY
    };
};

export const addSurgery = (description, date, duration) => {
    return dispatch => {
        dispatch(scheduleStart());
        
        const surgery = {
            desc: description,
            date: date,
            duration: duration
        };
        const url = "/scheduleSurgery";

        axios.post(url, surgery)
            .then(response => {
                console.log(response);
                dispatch(addedSurgery());
            })
            .catch(error => {
                console.log(error);
            });
    };
};