import * as actionTypes from './actionTypes';
import axios from '../../axios-objects';

export const patients = (patients) => {
    return {
        type: actionTypes.GET_PATIENTS,
        patients: patients
    };
};

export const getPatients = () => {
    return dispatch => {

        if (sessionStorage.getItem('role') === 'DOCTOR' && sessionStorage.getItem('token') != null) {
            const url = "/getPatients";
            const token = sessionStorage.getItem('token');

            axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
                .then(response => {
                    dispatch(patients(response.data));
                }).catch(error => {
                    console.log(error);
                });
        }
    };
};