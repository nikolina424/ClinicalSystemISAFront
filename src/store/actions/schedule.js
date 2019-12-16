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

export const addedExamination = () => {
    return {
        type: actionTypes.ADD_EXAMINATION
    };
};

export const addSurgery = (description, date, duration) => {
    return dispatch => {
        dispatch(scheduleStart());

        const token = sessionStorage.getItem('token');
        const surgery = {
            description: description,
            dateTime: date,
            duration: duration
        };
        const url = "/scheduleSurgery";

        axios.post(url, surgery, { 
            headers : {
                'Authorization' : 'Bearer ' + token
            } 
        })
            .then(response => {
                console.log(response);
                dispatch(addedSurgery());
            })
            .catch(error => {
                console.log(error);
            });
    };
};

export const addExamination = (description, date, duration) => {
    return dispatch => {
        dispatch(scheduleStart());

        const token = sessionStorage.getItem('token');
        const examination = {
            description: description,
            dateTime: date,
            duration: duration
        };
        const url = "/scheduleExamination";

        axios.post(url, examination, {
            headers: {
                'Authorization' : 'Bearer ' + token
            }
        })
            .then(response => {
                dispatch(addedExamination());
                window.location.reload();
            })
            .catch(error => {
                console.log(error);
            });
    };
};